import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const links = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const Navigation = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-xl border-b border-border/60">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center" aria-label="NullPunkt Solar Inc. — Home">
          <Logo variant="light" className="h-10 w-auto" />
        </Link>

        <div className="hidden md:flex items-center gap-10">
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

        <div className="hidden md:block">
          <Link to="/contact" className="btn-lime !py-2.5 !px-5 !text-xs">
            Free Consultation
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
            <Link to="/contact" className="btn-lime w-full">
              Free Consultation
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
