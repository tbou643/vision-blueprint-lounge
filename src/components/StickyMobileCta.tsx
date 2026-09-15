import { Link, useLocation } from "react-router-dom";
import { Phone } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const StickyMobileCta = () => {
  const { pathname } = useLocation();
  if (pathname.startsWith("/admin")) return null;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 backdrop-blur-xl">
      <div className="px-4 py-3 flex items-center gap-3">
        <a
          href="tel:+14038197834"
          className="btn-ghost !px-4 !py-3 flex items-center gap-2 shrink-0"
          aria-label="Call NullPunkt Solar"
          data-cta="Call"
          data-cta-position="sticky-mobile"
          onClick={() => trackEvent("phone_click", { label: "sticky mobile" })}
        >
          <Phone className="h-4 w-4" />
        </a>
        <Link
          to="/contact"
          className="btn-lime flex-1 justify-center !py-3 !text-xs"
          data-cta="Reserve your free site visit"
          data-cta-position="sticky-mobile"
        >
          Reserve your free site visit
        </Link>
      </div>
    </div>
  );
};

export default StickyMobileCta;
