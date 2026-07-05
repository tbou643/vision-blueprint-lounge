import { Link } from "react-router-dom";
import Logo from "./Logo";
import WaitlistForm from "./WaitlistForm";

const Contact = () => {
  return (
    <section id="contact" className="relative py-32 bg-card border-t border-border">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left: pitch */}
            <div>
              <p className="text-minimal text-lime mb-4">Get in touch</p>
              <h1 className="text-4xl md:text-6xl font-light text-architectural mb-8">
                Ready to reach
                <br />
                <span className="lime-underline">Point Zero?</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-lg">
                Free, no-obligation consultation. We measure your roof, model your
                consumption, and give you a fixed-price proposal you can actually compare.
              </p>

              <div className="space-y-6">
                <div>
                  <p className="text-minimal text-muted-foreground mb-1">Phone</p>
                  <a href="tel:+14038197834" className="text-xl hover:text-lime transition-colors">
                    (403) 819-7834
                  </a>
                </div>
                <div>
                  <p className="text-minimal text-muted-foreground mb-1">Email</p>
                  <a href="mailto:hello@nullpunkt.ca" className="text-xl hover:text-lime transition-colors">
                    hello@nullpunkt.ca
                  </a>
                </div>
                <div>
                  <p className="text-minimal text-muted-foreground mb-1">Office</p>
                  <address className="text-xl not-italic leading-relaxed">
                    NullPunkt Solar Inc.
                    <br />
                    #2005 – 10th Avenue SW
                    <br />
                    Calgary, Alberta - Canada
                  </address>
                </div>
              </div>

              <div className="mt-10">
                <Link to="/calculator" className="btn-ghost" data-cta="Try the solar calculator" data-cta-position="contact-page">Try the solar calculator →</Link>
              </div>
            </div>

            {/* Right: waitlist form */}
            <div className="card-raised p-10">
              <p className="text-minimal text-lime mb-3">First 25 Calgary installations · August 2026</p>
              <h3 className="text-2xl font-light mb-3">Reserve your free site visit.</h3>
              <p className="text-sm text-muted-foreground mb-8">
                We're scheduling our first 25 Calgary assessments for August. Tell us about your home and we'll confirm your slot personally.
              </p>
              <WaitlistForm source="contact-page" />

              <div className="mt-10 pt-8 border-t border-border flex items-center justify-between gap-6">
                <Logo variant="light" showTagline className="h-12 w-auto" />
                <p className="text-xs text-muted-foreground text-right max-w-[14rem]">
                  A new Calgary company, backed by a German parent installing integrated systems since 2024.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
