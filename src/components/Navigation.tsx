import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Download } from "lucide-react";
import Logo from "./Logo";
import { trackEvent } from "@/lib/analytics";
import guidePdf from "@/assets/calgary-solar-guide-2026.pdf.asset.json";

const links = [
  { href: "/services", label: "Services" },
  { href: "/calculator", label: "Calculator" },
  { href: "/work", label: "Roadmap" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const guideHref = pathname === "/" ? "#guide" : "/#guide";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-xl border-b border-border/60">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between gap-6">
        <Link to="/" className="flex items-center shrink-0" aria-label="NullPunkt Solar Inc. - Home">
          <Logo variant="light" className="h-10 w-auto" />
        </Link>

        <div className="hidden lg:flex items-center gap-10">
          {links.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3 shrink-0">
          <a
            href={guideHref}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-lime border border-lime/40 hover:border-lime hover:bg-lime/10 rounded-full px-3.5 py-2 transition-colors"
            data-cta="Free Calgary solar guide"
            data-cta-position="nav"
            onClick={() => trackEvent("guide_cta_click", { label: "Calgary solar guide 2026", position: "nav" })}
          >
            <Download className="h-3.5 w-3.5" />
            Free 2026 Calgary guide
          </a>
          <a
            href="tel:+14038197834"
            className="hidden xl:inline text-sm font-medium text-muted-foreground hover:text-lime transition-colors duration-300"
            aria-label="Call NullPunkt Solar"
          >
            (403) 819-7834
          </a>
          <Link to="/contact" className="btn-lime !py-2.5 !px-5 !text-xs" data-cta="Reserve your free site visit" data-cta-position="nav">
            Reserve your free site visit
          </Link>
        </div>

        <button
          className="md:hidden text-foreground text-2xl"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="container mx-auto px-6 py-6 space-y-4">
            {links.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                onClick={() => setOpen(false)}
                className="block text-base text-muted-foreground hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
            <a
              href={guidePdf.url}
              target="_blank"
              rel="noopener"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 text-base text-lime"
              data-cta="Free Calgary solar guide"
              data-cta-position="nav-mobile"
            >
              <Download className="h-4 w-4" />
              Free 2026 Calgary solar guide (PDF)
            </a>
            <a
              href="tel:+14038197834"
              onClick={() => setOpen(false)}
              className="block text-base text-lime"
            >
              📞 (403) 819-7834
            </a>
            <Link to="/contact" className="btn-lime w-full" data-cta="Reserve your free site visit" data-cta-position="nav-mobile">
              Reserve your free site visit
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
