import { Link } from "react-router-dom";
import { daysUntilPromoEnd, isPromoActive, PROMO_PRICE_PER_WATT } from "@/lib/pricing";

const PromoBanner = () => {
  if (!isPromoActive()) return null;
  const days = daysUntilPromoEnd();

  return (
    <div className="w-full bg-background border-b border-border/60">
      <Link
        to="/calculator"
        className="container mx-auto px-6 py-2 flex items-center justify-center gap-3 text-center group"
        data-cta="September deal banner"
        data-cta-position="banner"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-lime shrink-0 shadow-lime" aria-hidden="true" />
        <span className="text-[11px] sm:text-xs tracking-wide text-muted-foreground group-hover:text-foreground transition-colors">
          <span className="text-foreground font-medium">Fall Launch Offer</span> - $
          {PROMO_PRICE_PER_WATT.toFixed(2)}/W for every contract signed by September 30
          <span className="hidden sm:inline text-lime"> · {days} days left</span>
        </span>
      </Link>
    </div>
  );
};

export default PromoBanner;
