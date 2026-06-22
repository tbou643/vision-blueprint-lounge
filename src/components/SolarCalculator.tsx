import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import WaitlistForm from "./WaitlistForm";

interface Baseline {
  recommendedKwp: number;
  annualProduction: number;
  annualSavings: number;
  totalCost: number;
  payback: number;
  co2Tonnes: number;
  annualConsumption: number;
}

interface Analysis {
  headline: string;
  summary: string;
  highlights: string[];
  risks: string[];
  incentives: string[];
  nextStep: string;
}

const SolarCalculator = () => {
  const [monthlyBill, setMonthlyBill] = useState(280);
  const [propertyType, setPropertyType] = useState("residential");
  const [roofOrientation, setRoofOrientation] = useState("south");
  const [roofSize, setRoofSize] = useState(80);
  const [hasEV, setHasEV] = useState(false);
  const [hasBattery, setHasBattery] = useState(true);
  const [postalCode, setPostalCode] = useState("");

  const [loading, setLoading] = useState(false);
  const [baseline, setBaseline] = useState<Baseline | null>(null);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);

  const run = async () => {
    setLoading(true);
    setAnalysis(null);
    try {
      const { data, error } = await supabase.functions.invoke("solar-analysis", {
        body: { monthlyBill, propertyType, roofOrientation, roofSize, hasEV, hasBattery, postalCode },
      });
      if (error) throw error;
      setBaseline(data.baseline);
      setAnalysis(data.analysis ?? null);
      if (!data.analysis && data.error) {
        toast({ title: "AI unavailable", description: data.error, variant: "destructive" });
      }
    } catch (err) {
      toast({ title: "Calculation failed", description: (err as Error).message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const input =
    "w-full bg-background border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:border-lime transition-colors";
  const label = "text-[11px] tracking-[0.18em] uppercase text-muted-foreground mb-2 block";

  return (
    <div className="grid lg:grid-cols-5 gap-8">
      {/* Inputs */}
      <div className="lg:col-span-2 card-raised p-8 h-fit">
        <p className="text-minimal text-lime mb-3">Calgary solar calculator</p>
        <h3 className="text-2xl font-light mb-6">Sized for your roof, your bill, your grid.</h3>

        <div className="space-y-5">
          <div>
            <label className={label}>Average monthly electric bill (CAD)</label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min={80}
                max={1500}
                step={10}
                value={monthlyBill}
                onChange={(e) => setMonthlyBill(Number(e.target.value))}
                className="flex-1 accent-lime"
              />
              <span className="text-xl font-light w-24 text-right">${monthlyBill}</span>
            </div>
          </div>

          <div>
            <label className={label}>Usable roof area (m²)</label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min={20}
                max={400}
                step={5}
                value={roofSize}
                onChange={(e) => setRoofSize(Number(e.target.value))}
                className="flex-1 accent-lime"
              />
              <span className="text-xl font-light w-24 text-right">{roofSize} m²</span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className={label}>Property type</label>
              <select className={input} value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
                <option value="residential">Residential</option>
                <option value="acreage">Acreage</option>
                <option value="commercial">Commercial</option>
                <option value="agricultural">Agricultural</option>
              </select>
            </div>
            <div>
              <label className={label}>Roof orientation</label>
              <select className={input} value={roofOrientation} onChange={(e) => setRoofOrientation(e.target.value)}>
                <option value="south">South</option>
                <option value="south-east">South-East</option>
                <option value="south-west">South-West</option>
                <option value="east-west">East / West split</option>
                <option value="north">North (shaded)</option>
              </select>
            </div>
          </div>

          <div>
            <label className={label}>Postal code (optional)</label>
            <input
              className={input}
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="T2P 1J9"
              maxLength={10}
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={hasBattery} onChange={(e) => setHasBattery(e.target.checked)} className="accent-lime" />
              Include battery storage
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={hasEV} onChange={(e) => setHasEV(e.target.checked)} className="accent-lime" />
              EV in household
            </label>
          </div>

          <button onClick={run} disabled={loading} className="btn-lime w-full justify-center">
            {loading ? "Analysing with AI…" : "Run AI-powered analysis →"}
          </button>
          <p className="text-[11px] text-muted-foreground/70">
            Engineering baseline computed locally · AI commentary by Gemini 2.5 Pro · Not a binding quote.
          </p>
        </div>
      </div>

      {/* Results */}
      <div className="lg:col-span-3 space-y-6">
        {!baseline && !loading && (
          <div className="card-raised p-10 text-center">
            <div className="text-5xl mb-4 opacity-30">☀</div>
            <h4 className="text-xl font-light mb-2">Your results will appear here</h4>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              We use Calgary's actual irradiance (1,292 kWh/kWp), Alberta's all-in rate, and Micro-Generation export
              credits — then layer AI commentary on top.
            </p>
          </div>
        )}

        {loading && (
          <div className="card-raised p-10">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-muted rounded w-1/3" />
              <div className="h-10 bg-muted rounded w-2/3" />
              <div className="h-3 bg-muted rounded w-full" />
              <div className="h-3 bg-muted rounded w-5/6" />
              <div className="grid grid-cols-3 gap-3 pt-4">
                <div className="h-20 bg-muted rounded" />
                <div className="h-20 bg-muted rounded" />
                <div className="h-20 bg-muted rounded" />
              </div>
            </div>
          </div>
        )}

        {baseline && !loading && (
          <>
            <div className="card-raised p-8">
              <p className="text-minimal text-lime mb-3">Engineering baseline</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <Stat label="System size" value={`${baseline.recommendedKwp} kWp`} />
                <Stat label="Annual production" value={`${baseline.annualProduction.toLocaleString()} kWh`} />
                <Stat label="Annual savings" value={`$${baseline.annualSavings.toLocaleString()}`} accent />
                <Stat label="Turn-key cost" value={`$${baseline.totalCost.toLocaleString()}`} />
                <Stat label="Simple payback" value={`${baseline.payback} yrs`} />
                <Stat label="CO₂ avoided" value={`${baseline.co2Tonnes} t/yr`} />
              </div>
            </div>

            {analysis && (
              <div className="card-raised p-8 border-lime/20">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
                  <p className="text-minimal text-lime">AI engineering review · Gemini 2.5 Pro</p>
                </div>
                <h4 className="text-2xl font-light mb-4">{analysis.headline}</h4>
                <p className="text-muted-foreground leading-relaxed mb-6">{analysis.summary}</p>

                {analysis.highlights?.length > 0 && (
                  <div className="mb-6">
                    <p className="text-minimal text-muted-foreground mb-3">What this means for your site</p>
                    <ul className="space-y-2">
                      {analysis.highlights.map((h, i) => (
                        <li key={i} className="flex gap-3 text-sm">
                          <span className="text-lime mt-1">→</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {analysis.incentives?.length > 0 && (
                  <div className="mb-6">
                    <p className="text-minimal text-muted-foreground mb-3">Alberta / Canada incentives that apply</p>
                    <div className="flex flex-wrap gap-2">
                      {analysis.incentives.map((inc, i) => (
                        <span key={i} className="text-xs px-3 py-1.5 rounded-full bg-lime/10 border border-lime/30 text-lime">
                          {inc}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {analysis.risks?.length > 0 && (
                  <div className="mb-6">
                    <p className="text-minimal text-muted-foreground mb-3">Honest caveats</p>
                    <ul className="space-y-2">
                      {analysis.risks.map((r, i) => (
                        <li key={i} className="text-sm text-muted-foreground">• {r}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {analysis.nextStep && (
                  <p className="text-sm border-t border-border pt-5 mt-5 italic">{analysis.nextStep}</p>
                )}
              </div>
            )}

            <div className="card-raised p-8">
              <p className="text-minimal text-lime mb-3">Lock in your founding slot</p>
              <h4 className="text-xl font-light mb-5">
                Only ~25 founding Calgary installations for Summer 2026.
              </h4>
              <WaitlistForm
                source="calculator"
                defaultBill={monthlyBill}
                defaultProperty={propertyType}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const Stat = ({ label, value, accent }: { label: string; value: string; accent?: boolean }) => (
  <div>
    <p className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground mb-1">{label}</p>
    <p className={`text-2xl font-light ${accent ? "text-lime" : ""}`}>{value}</p>
  </div>
);

export default SolarCalculator;
