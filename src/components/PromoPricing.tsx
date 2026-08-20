import { Link } from "react-router-dom";
import {
  PROMO_PRICE_PER_WATT,
  PROMO_TERMS,
  REGULAR_PRICE_PER_WATT,
  daysUntilPromoEnd,
  isPromoActive,
} from "@/lib/pricing";

const PromoPricing = () => {
  const promo = isPromoActive();

  return (
    <section className="py-20 border-t border-border">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="card-raised p-8 md:p-12 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-minimal text-lime mb-4">
              {promo ? `Fall launch offer · ${daysUntilPromoEnd()} days left` : "Our pricing"}
            </p>
            <div className="flex items-baseline gap-4 mb-4">
              <p className="text-6xl md:text-7xl font-light text-architectural text-lime lime-underline">
                ${(promo ? PROMO_PRICE_PER_WATT : REGULAR_PRICE_PER_WATT).toFixed(2)}/W
              </p>
              {promo && (
                <span className="text-2xl text-muted-foreground line-through">
                  ${REGULAR_PRICE_PER_WATT.toFixed(2)}/W
                </span>
              )}
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-lg">
              {promo
                ? "Every residential rooftop contract signed by September 30, 2026 is installed at $1.99 per watt, before GST."
                : "Straightforward residential rooftop pricing per watt, before GST."}
            </p>
          </div>
          <div className="lg:text-right">
            <Link
              to="/calculator"
              className="btn-lime"
              data-cta="September deal"
              data-cta-position="home-pricing"
            >
              Calculate your system price →
            </Link>
            {promo && (
              <p className="text-[11px] text-muted-foreground leading-relaxed mt-6 lg:ml-auto max-w-md">
                {PROMO_TERMS}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoPricing;
