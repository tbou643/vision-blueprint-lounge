import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { trackEvent } from "@/lib/analytics";
import { systemFromBill } from "@/lib/system-sizing";
import { formatCad } from "@/lib/pricing";
import { QUOTE_NOTE } from "@/lib/solar-facts";
import { Button } from "@/components/ui/button";

const QuickEstimate = () => {
  const [monthlyBill, setMonthlyBill] = useState(200);
  const est = useMemo(() => systemFromBill(monthlyBill), [monthlyBill]);

  const context = `Home sizing estimate: ${est.modules} modules / ${est.kwp.toFixed(1)} kW; monthly bill ${formatCad(monthlyBill)}. Please review my actual annual kWh and provide an individual quote.`;

  return (
    <section id="estimate" className="relative py-20 md:py-24 bg-background border-b border-border">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 items-center reveal">
          {/* Input */}
          <div>
            <p className="text-minimal text-lime mb-4">
              Your Calgary roof
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-architectural mb-4">
              What size solar system
              <br />
              <span className="lime-underline">could suit your home?</span>
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-8 max-w-md">
              A starting point for your roof assessment, not a quote or guaranteed recommendation.
            </p>

            <label className="text-minimal text-muted-foreground mb-3 block" htmlFor="home-bill">
              Average monthly power bill
            </label>
            <div className="flex items-center gap-5">
              <input
                id="home-bill"
                type="range"
                min={100}
                max={450}
                step={5}
                value={monthlyBill}
                onChange={(e) => setMonthlyBill(Number(e.target.value))}
                onPointerUp={() => trackEvent("home_estimate_used", { label: "bill slider" })}
                className="flex-1 accent-lime"
              />
              <span className="text-3xl font-light w-28 text-right">{formatCad(monthlyBill)}</span>
            </div>
          </div>

          {/* Result */}
          <div className="border-t lg:border-t-0 lg:border-l border-border pt-8 lg:pt-0 lg:pl-10">
            <p className="text-minimal text-lime mb-3">Your estimated system</p>
            <p className="text-2xl font-light mb-6">
              {est.modules} modules · {est.kwp.toFixed(1)} kW
            </p>

            <p className="text-4xl font-light text-lime">
              {Math.round(est.annualProduction).toLocaleString("en-CA")} <span className="text-lg">kWh/year</span>
            </p>
            <p className="text-sm text-muted-foreground mt-3">Illustrative production. Your price is quoted individually.</p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button asChild className="btn-lime h-auto whitespace-normal"><Link
                to="/contact"
                state={{ calculator: context }}
                className="btn-lime justify-center"
                data-cta="Book free site assessment"
                data-cta-position="home-estimate"
                onClick={() =>
                  trackEvent("home_estimate_cta", { label: "book assessment", meta: { kwp: est.kwp } })
                }
              >
                Request your individual quote
              </Link></Button>
              <Link to="/calculator" className="btn-ghost justify-center" data-cta="Full calculator" data-cta-position="home-estimate">
                Full calculator
              </Link>
            </div>
            <p className="text-[11px] text-muted-foreground mt-5 leading-relaxed">
              Sizing assumes 1,150 kWh/kWp/year and $0.22/kWh to approximate consumption from your bill.
              Fixed charges are not fully avoidable; actual sizing uses 12 months of kWh, roof condition and shading. {QUOTE_NOTE}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickEstimate;
