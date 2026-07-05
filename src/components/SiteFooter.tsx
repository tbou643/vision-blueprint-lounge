import { Link } from "react-router-dom";
import Logo from "./Logo";

const SiteFooter = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-background border-t border-border">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 mb-16">
            {/* Brand column */}
            <div className="lg:col-span-4">
              <Logo variant="light" showTagline className="h-14 w-auto mb-6" />
              <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mb-6">
                Integrated solar, engineered to a single point. A new Calgary company, backed by
                SMB Solartechnik GmbH — a German parent installing integrated PV, battery and HEMS
                systems since 2024.
              </p>
              <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
                <span>Launching Summer 2026 · Calgary, AB</span>
              </div>
            </div>

            {/* Services */}
            <div className="lg:col-span-2">
              <p className="text-minimal text-lime mb-5">Services</p>
              <ul className="space-y-3 text-sm">
                <li><Link to="/services" className="text-muted-foreground hover:text-foreground transition-colors">Residential</Link></li>
                <li><Link to="/services" className="text-muted-foreground hover:text-foreground transition-colors">Commercial & Agri</Link></li>
                <li><Link to="/services" className="text-muted-foreground hover:text-foreground transition-colors">Developer partnerships</Link></li>
                <li><Link to="/services" className="text-muted-foreground hover:text-foreground transition-colors">Service & monitoring</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div className="lg:col-span-2">
              <p className="text-minimal text-lime mb-5">Company</p>
              <ul className="space-y-3 text-sm">
                <li><Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</Link></li>
                <li><Link to="/work" className="text-muted-foreground hover:text-foreground transition-colors">Launch roadmap</Link></li>
                <li><Link to="/calculator" className="text-muted-foreground hover:text-foreground transition-colors">Solar calculator</Link></li>
                <li><Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Group */}
            <div className="lg:col-span-2">
              <p className="text-minimal text-lime mb-5">Group</p>
              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href="https://smb-solartechnik.de"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    SMB Solartechnik GmbH ↗
                  </a>
                </li>
                <li><Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">Parent company</Link></li>
                <li><Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">Knowledge exchange</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="lg:col-span-2">
              <p className="text-minimal text-lime mb-5">Reach us</p>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="tel:+14038197834" className="text-muted-foreground hover:text-foreground transition-colors">
                    (403) 819-7834
                  </a>
                </li>
                <li>
                  <a href="mailto:hello@nullpunkt.ca" className="text-muted-foreground hover:text-foreground transition-colors">
                    hello@nullpunkt.ca
                  </a>
                </li>
                <li>
                  <a
                    href="https://maps.google.com/?q=2005+10th+Avenue+SW+Calgary+Alberta"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors leading-relaxed block"
                  >
                    #2005 – 10th Avenue SW
                    <br />
                    Calgary, Alberta — Canada
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Standards strip */}
          <div className="py-8 border-t border-border">
            <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-4 text-center">
              Standards we hold ourselves to
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-muted-foreground">
              {[
                "IEC 61215 Class 3+",
                "UL 9540",
                "Canadian Electrical Code",
                "Alberta Micro-Generation Regulation",
                "OpenEMS",
                "Tier-1 PV",
                "CRA Clean Tech ITC",
              ].map((s, i, arr) => (
                <span key={s} className="flex items-center gap-x-8">
                  <span>{s}</span>
                  {i < arr.length - 1 && <span className="text-border hidden md:inline">·</span>}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom row */}
          <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <p>© {year} NullPunkt Solar Inc. — All rights reserved.</p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              <Link to="/privacy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <span className="text-border hidden md:inline">·</span>
              <p className="text-center md:text-right">
                Calgary subsidiary of{" "}
                <a
                  href="https://smb-solartechnik.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors underline decoration-lime/40 underline-offset-4"
                >
                  SMB Solartechnik GmbH
                </a>{" "}
                · Made with German precision.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
