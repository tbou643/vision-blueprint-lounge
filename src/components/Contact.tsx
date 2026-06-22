import { Link } from "react-router-dom";
import Logo from "./Logo";

const Contact = () => {
  return (
    <section id="contact" className="relative py-32 bg-card border-t border-border">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left: pitch */}
            <div>
              <p className="text-minimal text-lime mb-4">Get in touch</p>
              <h2 className="text-4xl md:text-6xl font-light text-architectural mb-8">
                Ready to reach
                <br />
                <span className="lime-underline">Point Zero?</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-lg">
                Free, no-obligation consultation. We measure your roof, model your
                consumption, and give you a fixed-price proposal you can actually compare.
              </p>

              <div className="space-y-6">
                <div>
                  <p className="text-minimal text-muted-foreground mb-1">Email</p>
                  <a href="mailto:info@nullpunkt.energy" className="text-xl hover:text-lime transition-colors">
                    info@nullpunkt.energy
                  </a>
                </div>
                <div>
                  <p className="text-minimal text-muted-foreground mb-1">Phone</p>
                  <a href="tel:+14035551234" className="text-xl hover:text-lime transition-colors">
                    +1 (403) 555-1234
                  </a>
                </div>
                <div>
                  <p className="text-minimal text-muted-foreground mb-1">Office</p>
                  <address className="text-xl not-italic leading-relaxed">
                    NullPunkt Solar Inc.
                    <br />
                    Calgary, Alberta — Canada
                  </address>
                </div>
              </div>

              <div className="mt-10">
                <Link to="/contact" className="btn-lime">Book a free site visit →</Link>
              </div>
            </div>

            {/* Right: what's included */}
            <div className="card-raised p-10">
              <p className="text-minimal text-muted-foreground mb-6">What you get in the first call</p>
              <ul className="space-y-5">
                {[
                  "Satellite roof analysis with shading model",
                  "PV + battery + heat pump sizing for your bills",
                  "Full bill of materials and warranty terms",
                  "Fixed-price proposal — no upsells, no surprises",
                  "Honest payback math for Alberta's grid rates",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-4">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-lime shadow-lime flex-shrink-0" />
                    <span className="text-muted-foreground leading-relaxed">{line}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 pt-8 border-t border-border flex items-center justify-between gap-6">
                <Logo variant="light" showTagline className="h-12 w-auto" />
                <p className="text-xs text-muted-foreground/70 text-right max-w-[12rem]">
                  Calgary office of a European solar engineering company. 20+ years installing.
                </p>
              </div>
            </div>
          </div>

          {/* Footer line */}
          <div className="mt-20 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <p>© {new Date().getFullYear()} NullPunkt Solar Inc. — All rights reserved.</p>
            <Link to="/admin" className="hover:text-foreground transition-colors">Site admin</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
