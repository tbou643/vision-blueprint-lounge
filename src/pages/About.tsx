import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-40 pb-24 relative">
        <div className="absolute inset-x-0 top-0 h-[60vh] glow-radial pointer-events-none" />
        <div className="container mx-auto px-6 relative">
          <div className="max-w-5xl mx-auto">
            <p className="text-minimal text-lime mb-6">About NullPunkt</p>
            <h1 className="text-5xl md:text-7xl font-light text-architectural mb-10">
              A Calgary office, with two decades of solar already behind it.
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
              <span className="text-foreground font-medium">"NullPunkt"</span> is the point of
              origin on a technical drawing — coordinate zero, where every measurement starts.
              That's where we want your home's energy balance to sit: production matching
              consumption, exactly.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-card border-y border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16">
            <div>
              <p className="text-minimal text-lime mb-4">Our origin</p>
              <h2 className="text-3xl md:text-4xl font-light text-architectural mb-6">
                Spin-off, not start-up.
              </h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  NullPunkt Solar Inc. is the wholly-owned Canadian subsidiary of
                  <span className="text-foreground"> SMB Solartechnik GmbH</span> — a profitable
                  German solar company with annual revenue exceeding EUR 700,000 and hundreds of
                  completed integrated installations.
                </p>
                <p>
                  We didn't show up in Calgary to learn the trade. We came because the Alberta
                  grid, the housing stock and the sun hours finally make the numbers work — and
                  because we wanted to build here from day one with the engineering playbook
                  already written.
                </p>
              </div>
            </div>

            <div>
              <p className="text-minimal text-lime mb-4">How we work</p>
              <h2 className="text-3xl md:text-4xl font-light text-architectural mb-6">
                One team. Whole system.
              </h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  Most installers sell what their supplier pushes. We design around your
                  bills, your roof, and your appetite for grid independence — and only then
                  pick the modules, the inverter, the battery and the heat pump.
                </p>
                <p>
                  Engineering, procurement, installation and commissioning all sit under
                  one roof. The person who designed your system is on site when it gets
                  switched on.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <p className="text-minimal text-lime mb-6">The Point Zero promise</p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                ["Zero guesswork", "Full simulation, bill of materials and payback math before you sign anything."],
                ["Zero handoffs", "Same crew from first site visit to commissioning. No subcontractor chains."],
                ["Zero surprises", "Fixed-price quotes, hardware-backed warranties, and a service contract built to last."],
              ].map(([t, b]) => (
                <div key={t} className="card-raised p-8">
                  <h3 className="text-2xl font-semibold mb-3">{t}</h3>
                  <p className="text-muted-foreground leading-relaxed">{b}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-card border-t border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-light text-architectural mb-6">
              Want to be one of our first Calgary installs?
            </h2>
            <p className="text-muted-foreground mb-10">
              Founding customers get priority engineering slots and a direct line to the team.
            </p>
            <Link to="/contact" className="btn-lime">Book a free consultation →</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
