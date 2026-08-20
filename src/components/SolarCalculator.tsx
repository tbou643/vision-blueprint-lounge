import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { trackEvent } from "@/lib/analytics";
import {
  REGULAR_PRICE_PER_WATT,
  PROMO_PRICE_PER_WATT,
  BLENDED_RATE_PER_KWH,
  estimateFromBill,
  estimateFromKwp,
  formatCad,
  isPromoActive,
  PROMO_TERMS,
} from "@/lib/pricing";

const SolarCalculator = () => {
  const [monthlyBill, setMonthlyBill] = useState(200);
  const [knowSize, setKnowSize] = useState(false);
  const [kwp, setKwp] = useState(8);
  const [showDetails, setShowDetails] = useState(false);

  const promo = isPromoActive();

  const est = useMemo(() => {
    if (knowSize) {
      const annualConsumption = (monthlyBill * 12) / BLENDED_RATE_PER_KWH;
      return estimateFromKwp(kwp, annualConsumption);
    }
    return estimateFromBill(monthlyBill);
  }, [knowSize, kwp, monthlyBill]);

  const contactContext = `Calculator result: ${est.modules} modules / ${est.kwp.toFixed(1)} kW - ${formatCad(
    est.priceBeforeGst,
  )} + GST at $${est.pricePerWatt.toFixed(2)}/W`;

  return (
    <div className="space-y-6">
      <div className="card-raised p-6 md:p-10 reveal">
        {/* Input */}
        <div className="max-w-2xl">
          <label className="text-minimal text-muted-foreground mb-4 block" htmlFor="bill-slider">
            Your average monthly power bill
          </label>
          <div className="flex items-center gap-5">
            <input
              id="bill-slider"
              type="range"
              min={100}
              max={450}
              step={5}
              value={monthlyBill}
              onChange={(e) => setMonthlyBill(Number(e.target.value))}
              className="flex-1 accent-lime"
            />
            <span className="text-3xl font-light w-28 text-right">{formatCad(monthlyBill)}</span>
          </div>

          <div className="mt-5">
            <button
              type="button"
              onClick={() => setKnowSize(!knowSize)}
              className="text-xs tracking-wide text-muted-foreground hover:text-lime transition-colors"
            >
              {knowSize ? "− Use my power bill instead" : "+ I know my system size"}
            </button>
            {knowSize && (
              <div className="mt-4 flex items-center gap-5">
                <input
                  type="range"
                  min={4}
                  max={15}
                  step={0.5}
                  value={kwp}
                  onChange={(e) => setKwp(Number(e.target.value))}
                  className="flex-1 accent-lime"
                  aria-label="System size in kWp"
                />
                <span className="text-xl font-light w-28 text-right">{kwp.toFixed(1)} kWp</span>
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-6 mt-10 pt-10 border-t border-border">
          <div>
            <p className="text-minimal text-lime mb-3">Your system</p>
            <p className="text-4xl md:text-5xl font-light text-architectural">
              {est.modules} <span className="text-xl text-muted-foreground">modules</span>
            </p>
            <p className="text-lg text-muted-foreground mt-1">{est.kwp.toFixed(1)} kW</p>
          </div>

          <div>
            <p className="text-minimal text-lime mb-3">Your price</p>
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
            <p className="text-lg text-muted-foreground mt-2">
              {formatCad(est.priceBeforeGst)} + GST ({formatCad(est.gstAmount)})
            </p>
          </div>

          <div>
            <p className="text-minimal text-lime mb-3">Estimated yearly production</p>
            <p className="text-4xl md:text-5xl font-light text-architectural">
              {Math.round(est.annualProduction).toLocaleString("en-CA")}
              <span className="text-xl text-muted-foreground"> kWh</span>
            </p>
            <p className="text-lg text-muted-foreground mt-1">
              ≈ {Math.round(est.coverage)}% of your usage
            </p>
          </div>
        </div>

        {/* Details */}
        <div className="mt-8 pt-6 border-t border-border">
          <button
            type="button"
            onClick={() => {
              setShowDetails(!showDetails);
              if (!showDetails) trackEvent("calculator_details_open", { label: "see details" });
            }}
            className="text-sm text-muted-foreground hover:text-lime transition-colors"
            aria-expanded={showDetails}
          >
            {showDetails ? "Hide details" : "See details"}
          </button>
          {showDetails && (
            <div className="grid sm:grid-cols-3 gap-6 mt-6 text-sm">
              <div>
                <p className="text-minimal text-muted-foreground mb-2">Estimated monthly savings</p>
                <p className="text-2xl font-light">{formatCad(est.monthlySavings)}</p>
              </div>
              <div>
                <p className="text-minimal text-muted-foreground mb-2">Simple payback</p>
                <p className="text-2xl font-light">{est.paybackYears.toFixed(1)} years</p>
              </div>
              <div>
                <p className="text-minimal text-muted-foreground mb-2">Grid credit</p>
                <p className="text-muted-foreground leading-relaxed">
                  Surplus production is credited under the Alberta Micro-Generation Regulation.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link
            to="/contact"
            state={{ calculator: contactContext }}
            className="btn-lime justify-center"
            data-cta="Lock in promo price"
            data-cta-position="calculator"
            onClick={() =>
              trackEvent("calculator_cta_click", {
                label: "book assessment",
                meta: { kwp: est.kwp, price: est.priceBeforeGst },
              })
            }
          >
            {promo ? `Lock in $${PROMO_PRICE_PER_WATT.toFixed(2)}/W - book your free assessment` : "Book your free assessment"}
          </Link>
          <a href="#how-we-compare" className="btn-ghost justify-center">
            How we compare
          </a>
        </div>

        <p className="text-[11px] text-muted-foreground leading-relaxed mt-6">
          {promo ? PROMO_TERMS : "Price before GST, based on standard asphalt shingle roof and single array layout. Final quote after free site assessment."}
        </p>
      </div>
    </div>
  );
};

export default SolarCalculator;
