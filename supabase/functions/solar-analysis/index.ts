import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

interface Payload {
  monthlyBill: number;
  propertyType: string;
  roofOrientation: string;
  roofSize: number;
  hasEV: boolean;
  hasBattery: boolean;
  postalCode?: string;
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

    // Deterministic Calgary baseline math (so AI grounds on real numbers)
    // Calgary irradiance: ~1,292 kWh/kWp/year (one of the best in Canada)
    // Alberta avg residential rate ~ $0.165/kWh (energy + distribution + transmission + admin all-in 2025)
    const annualKwhPerKwp = 1292;
    const albertaAllInRate = 0.165;
    const billKwh = body.monthlyBill / albertaAllInRate;
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
    // Alberta micro-gen credit ~ $0.085/kWh exported (varies by retailer)
    const annualSavings = Math.round(
      annualProduction * selfConsumption * albertaAllInRate +
      annualProduction * exportShare * 0.085,
    );
    const systemCostPerKwp = body.hasBattery ? 3200 : 2400; // CAD installed
    const totalCost = Math.round(recommendedKwp * systemCostPerKwp);
    const payback = Math.round((totalCost / annualSavings) * 10) / 10;
    const co2Tonnes = Math.round(annualProduction * 0.00059 * 10) / 10; // Alberta grid intensity ~590 g/kWh

    const baseline = {
      recommendedKwp,
      annualProduction,
      annualSavings,
      totalCost,
      payback,
      co2Tonnes,
      annualConsumption: Math.round(annualConsumption),
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
- Estimated annual savings: $${annualSavings} CAD
- Turn-key installed cost: $${totalCost} CAD
- Simple payback: ${payback} years
- CO₂ avoided: ${co2Tonnes} tonnes/year

CALGARY CONTEXT TO WEAVE IN (only what's relevant):
- Calgary gets ~333 sunny days/year — one of Canada's best solar resources (1,292 kWh/kWp).
- Alberta deregulated market: variable rates 6–25 ¢/kWh, distribution & transmission add ~10 ¢/kWh.
- Alberta Micro-Generation Regulation lets homeowners export surplus and net-bill monthly.
- Canada Greener Homes Loan: up to $40,000 interest-free for solar + battery.
- Winter snow shedding matters: 30°+ tilt and frameless panels recommended.
- Hail rating: IEC 61215 Class 3+ panels essential (Calgary hailstorms).

TASK: Return ONLY valid JSON (no markdown, no prose outside JSON) matching this exact shape:
{
  "headline": "one-line plain-English summary (max 90 chars)",
  "summary": "2-3 sentence engineering-led recommendation that references the specific numbers above",
  "highlights": ["3 to 4 short bullets — Calgary/Alberta-specific, technical but accessible"],
  "risks": ["1 to 2 honest caveats specific to this property/setup"],
  "incentives": ["2 to 3 Alberta/Canada incentive or program names that apply"],
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
