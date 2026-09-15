import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { trackEvent } from "@/lib/analytics";
import {
  REGULAR_PRICE_PER_WATT,
  estimateFromBill,
  formatCad,
  isPromoActive,
  daysUntilPromoEnd,
} from "@/lib/pricing";

const QuickEstimate = () => {
  const [monthlyBill, setMonthlyBill] = useState(200);
  const promo = isPromoActive();
  const est = useMemo(() => estimateFromBill(monthlyBill), [monthlyBill]);

  const context = `Home estimate: ${est.modules} modules / ${est.kwp.toFixed(1)} kW - ${formatCad(
    est.priceBeforeGst,
  )} + GST at $${est.pricePerWatt.toFixed(2)}/W`;

  return (
    <section id="estimate" className="relative py-20 md:py-24 bg-background border-b border-border">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="card-raised p-6 md:p-10 grid lg:grid-cols-[1.1fr_1fr] gap-10 items-center reveal">
          {/* Input */}
          <div>
            <p className="text-minimal text-lime mb-4">
              {promo ? `Fall launch offer · ${daysUntilPromoEnd()} days left` : "10 second estimate"}
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-architectural mb-4">
              What would solar cost
              <br />
              <span className="lime-underline">on your Calgary roof?</span>
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-8 max-w-md">
              Move the slider to your average monthly power bill. No email, no sales call, no waiting.
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

            <div className="flex items-baseline gap-3">
              <p className="text-5xl md:text-6xl font-light text-architectural text-lime lime-underline">
                ${est.pricePerWatt.toFixed(2)}/W
              </p>
              {promo && (
                <span className="text-lg text-muted-foreground line-through">
                  ${REGULAR_PRICE_PER_WATT.toFixed(2)}/W
                </span>
              )}
            </div>
            <p className="text-lg text-muted-foreground mt-3">
              {formatCad(est.priceBeforeGst)} + GST · about {formatCad(est.monthlySavings)}/month saved
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                to="/contact"
                state={{ calculator: context }}
                className="btn-lime justify-center"
                data-cta="Book free site assessment"
                data-cta-position="home-estimate"
                onClick={() =>
                  trackEvent("home_estimate_cta", { label: "book assessment", meta: { kwp: est.kwp } })
                }
              >
                Book your free site assessment
              </Link>
              <Link to="/calculator" className="btn-ghost justify-center" data-cta="Full calculator" data-cta-position="home-estimate">
                Full calculator
              </Link>
            </div>
            <p className="text-[11px] text-muted-foreground mt-5 leading-relaxed">
              Estimate based on Calgary yield of 1,150 kWh per kWp and a blended rate of $0.22/kWh. Final
              quote after your free site assessment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickEstimate;
