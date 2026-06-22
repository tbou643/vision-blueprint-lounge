import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

interface Payload {
  monthlyBill: number;
  propertyType: string;
  roofOrientation: string;
  roofSize: number;
  hasEV: boolean;
  hasBattery: boolean;
  postalCode?: string;
  useSolarClub?: boolean;
  useCEIP?: boolean;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const key = Deno.env.get("LOVABLE_API_KEY");
    if (!key) {
      return new Response(JSON.stringify({ error: "AI not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = (await req.json()) as Payload;

    // ───────────────────────── Engineering baseline ─────────────────────────
    // Calgary irradiance: ~1,292 kWh/kWp/year (one of the best in Canada)
    // Alberta avg residential all-in rate ~ $0.165/kWh (energy + wires + admin, 2025)
    const annualKwhPerKwp = 1292;
    const standardAllInRate = 0.165;
    const standardExportRate = 0.085; // typical retailer micro-gen credit
    // Solar Club (UTILITYnet) — verified May 2026: HI 35.0¢/kWh export, LO 8.4¢/kWh consumption
    const solarClubConsumeRate = 0.084;
    const solarClubExportRate = 0.35;

    const billKwh = body.monthlyBill / standardAllInRate;
    const annualConsumption = billKwh * 12;
    const orientationFactor =
      body.roofOrientation === "south" ? 1.0
      : body.roofOrientation === "east-west" ? 0.88
      : body.roofOrientation === "south-east" || body.roofOrientation === "south-west" ? 0.96
      : 0.82;
    const recommendedKwp = Math.min(
      Math.max(Math.round((annualConsumption / (annualKwhPerKwp * orientationFactor)) * 10) / 10, 4),
      body.roofSize > 0 ? Math.floor(body.roofSize / 6) : 25,
    );
    const annualProduction = Math.round(recommendedKwp * annualKwhPerKwp * orientationFactor);
    const selfConsumption = body.hasBattery ? 0.75 : body.hasEV ? 0.55 : 0.35;
    const exportShare = 1 - selfConsumption;
    const selfKwh = annualProduction * selfConsumption;
    const exportKwh = annualProduction * exportShare;

    // Two retailer scenarios
    const standardSavings = Math.round(selfKwh * standardAllInRate + exportKwh * standardExportRate);
    const solarClubSavings = Math.round(selfKwh * solarClubConsumeRate + exportKwh * solarClubExportRate);
    const useSolarClub = body.useSolarClub ?? solarClubSavings > standardSavings;
    const annualSavings = useSolarClub ? solarClubSavings : standardSavings;

    const systemCostPerKwp = body.hasBattery ? 3200 : 2400; // CAD installed
    const totalCost = Math.round(recommendedKwp * systemCostPerKwp);
    const payback = Math.round((totalCost / annualSavings) * 10) / 10;
    const co2Tonnes = Math.round(annualProduction * 0.00059 * 10) / 10;

    // CEIP (PACE) financing scenario — 0% upfront, ~20yr term, ~5.5% blended cost
    // Cash-flow positive when annual savings exceed annual instalment
    const ceipYears = 20;
    const ceipAnnualPayment = Math.round((totalCost / ceipYears) * 1.08); // small admin / rate buffer
    const ceipNetYear1 = annualSavings - ceipAnnualPayment;

    const baseline = {
      recommendedKwp,
      annualProduction,
      annualSavings,
      annualSavingsStandard: standardSavings,
      annualSavingsSolarClub: solarClubSavings,
      useSolarClub,
      totalCost,
      payback,
      co2Tonnes,
      annualConsumption: Math.round(annualConsumption),
      ceip: {
        annualPayment: ceipAnnualPayment,
        netYear1: ceipNetYear1,
        years: ceipYears,
      },
    };

    const prompt = `You are a senior solar engineer at NullPunkt Solar Inc., a Calgary subsidiary of German company SMB Solartechnik GmbH. Generate a concise, expert recommendation for a Calgary, Alberta property owner.

INPUTS:
- Property type: ${body.propertyType}
- Monthly electric bill: $${body.monthlyBill} CAD
- Roof orientation: ${body.roofOrientation}
- Available roof area: ${body.roofSize} m²
- EV in household: ${body.hasEV}
- Wants battery storage: ${body.hasBattery}
- Postal code: ${body.postalCode ?? "n/a"}

ENGINEERING BASELINE (already computed, use these exact numbers):
- Recommended system size: ${recommendedKwp} kWp
- Estimated annual production: ${annualProduction} kWh
- Savings with default retailer: $${standardSavings}/yr
- Savings if enrolled in Solar Club retailer: $${solarClubSavings}/yr
- Recommended retailer: ${useSolarClub ? "Solar Club" : "Standard"}
- Turn-key installed cost: $${totalCost} CAD
- Simple payback (using best retailer): ${payback} years
- CEIP financing: $${ceipAnnualPayment}/yr over ${ceipYears} years, net year-1 cash flow: $${ceipNetYear1}
- CO₂ avoided: ${co2Tonnes} tonnes/year

CALGARY CONTEXT TO WEAVE IN (only what's relevant — verified as of 2026):
- Calgary gets ~333 sunny days/year — one of Canada's best solar resources (1,292 kWh/kWp).
- Alberta Micro-Generation Regulation: <150 kW systems net-billed monthly at retail energy rate; 150 kW–5 MW settled hourly.
- Solar Club™ (UTILITYnet retailer program): HI export rate ~35¢/kWh, LO consumption rate ~8.4¢/kWh. Dramatically improves payback for export-heavy systems; less valuable when self-consumption is very high.
- Clean Energy Improvement Program (CEIP): 0% upfront PACE financing in 26+ Alberta municipalities, repaid via property tax — system is cash-flow positive from year 1 when net annual savings exceed the instalment.
- Clean Technology ITC: 30% refundable federal credit for commercial / agricultural / developer projects (through Dec 31, 2034).
- DO NOT mention the Canada Greener Homes Loan — it closed to new applications on October 2, 2025.
- Winter snow shedding matters: 30°+ tilt and frameless panels recommended.
- Hail: IEC 61215 Class 3+ panels essential for Calgary.
- NullPunkt installs are delivered with a Red Seal Master Electrician partner and German-engineered system design.

TASK: Return ONLY valid JSON (no markdown) matching this exact shape:
{
  "headline": "one-line plain-English summary (max 90 chars)",
  "summary": "2-3 sentence engineering-led recommendation that references the specific numbers above and names which retailer scenario was used",
  "highlights": ["3 to 4 short bullets — Calgary/Alberta-specific, technical but accessible. Include Solar Club guidance if relevant"],
  "risks": ["1 to 2 honest caveats specific to this property/setup"],
  "incentives": ["2 to 3 Alberta/Canada incentive or program names that apply — e.g. Solar Club, CEIP, Clean Tech ITC"],
  "nextStep": "one sentence call to action toward a NullPunkt site visit"
}`;

    const aiRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-pro",
        messages: [
          { role: "system", content: "You are a precise solar engineering assistant. Always return strict JSON." },
          { role: "user", content: prompt },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!aiRes.ok) {
      const text = await aiRes.text();
      console.error("AI gateway error", aiRes.status, text);
      if (aiRes.status === 429) {
        return new Response(JSON.stringify({ error: "AI is busy. Please retry shortly.", baseline }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (aiRes.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted.", baseline }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ error: "AI analysis failed", baseline }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const json = await aiRes.json();
    const content = json.choices?.[0]?.message?.content ?? "{}";
    let analysis: unknown;
    try {
      analysis = JSON.parse(content);
    } catch {
      analysis = { headline: "Recommendation ready", summary: content, highlights: [], risks: [], incentives: [], nextStep: "" };
    }

    return new Response(JSON.stringify({ baseline, analysis }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
