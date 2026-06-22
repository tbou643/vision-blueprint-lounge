import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";
import founderImage from "@/assets/tim-brunkel.asset.json";

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
                  <span className="text-foreground"> SMB Solartechnik GmbH</span> — an
                  established German solar company with hundreds of completed integrated
                  installations.
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
                  Most installers sell what their supplier pushes. We design around your bills,
                  your roof and your appetite for grid independence — then pick the modules, the
                  inverter, the battery and the energy-management controller.
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

      {/* Founder section */}
      <section className="py-28">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Subtle inline portrait */}
            <div className="flex items-center gap-5 mb-10">
              <div
                className="relative w-20 h-20 rounded-full overflow-hidden border border-border bg-card shrink-0"
                style={{
                  WebkitMaskImage:
                    "radial-gradient(circle at center, black 55%, transparent 100%)",
                  maskImage:
                    "radial-gradient(circle at center, black 55%, transparent 100%)",
                }}
              >
                <img
                  src={founderImage.url}
                  alt="Tim Brunkel — Founder & CEO of NullPunkt Solar Inc."
                  className="w-full h-full object-cover opacity-80 saturate-75"
                  loading="lazy"
                />
              </div>
              <div>
                <p className="text-minimal text-lime">Meet the founder</p>
                <p className="text-sm text-muted-foreground mt-1">Tim Brunkel · NullPunkt Solar Inc.</p>
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl font-light text-architectural mb-8">
              Tim Brunkel.
              <br />
              <span className="text-muted-foreground">Recognised PV authority. Calgary-bound.</span>
            </h2>

            <div className="grid lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-8 space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  Hi — I'm Tim. I founded <span className="text-foreground">SMB Solartechnik GmbH</span>{" "}
                  in 2024 and grew it past{" "}
                  <span className="text-foreground font-medium">CAD $1,000,000 in annual sales</span>{" "}
                  in Germany's hyper-competitive solar market, personally overseeing several hundred
                  integrated photovoltaic installations across residential, commercial and
                  agricultural projects. Within the German integrated-PV scene I'm regarded as one of
                  the go-to authorities on combined PV + battery + HEMS design — it's exactly that
                  playbook I'm bringing to Calgary.
                </p>
                <p>
                  Before solar, I spent 13+ years in senior technology roles — most recently as
                  Head of IT Innovation Solution Design at <span className="text-foreground">ZF
                  Friedrichshafen AG</span>, leading cross-functional teams turning emerging
                  technology into enterprise solutions. That product- and program-management
                  background is exactly what fully integrated solar needs: PV + battery + heat
                  pump + EV + intelligent energy management (HEMS / OpenEMS) is a software-meets-
                  hardware problem, not a panel-on-a-roof problem.
                </p>
                <p>
                  I'm relocating from southern Germany to Calgary as principal directing mind and
                  sole Director of NullPunkt Solar Inc., committing CAD $298,000 of capital
                  (verified by Sparkasse Salem-Heiligenberg) to the Canadian launch. I lived and
                  worked in Canada once before — 18 months of Work & Travel back in 2008–09 — and
                  I've wanted to come back ever since. Now I get to build something here that
                  actually matters for Alberta's energy future.
                </p>
                <p className="text-foreground">
                  If you join the founding waitlist in our first year, the engineer at your
                  kitchen table will be me.
                </p>
              </div>

              {/* Tall, masked portrait blending into bg */}
              <div className="lg:col-span-4">
                <div
                  className="relative aspect-[3/4] w-full"
                  style={{
                    WebkitMaskImage:
                      "linear-gradient(to bottom, black 0%, black 55%, transparent 100%), linear-gradient(to right, transparent 0%, black 25%, black 100%)",
                    WebkitMaskComposite: "source-in",
                    maskImage:
                      "linear-gradient(to bottom, black 0%, black 55%, transparent 100%), linear-gradient(to right, transparent 0%, black 25%, black 100%)",
                    maskComposite: "intersect",
                  }}
                >
                  <img
                    src={founderImage.url}
                    alt=""
                    aria-hidden
                    className="w-full h-full object-cover opacity-60 saturate-50"
                  />
                </div>
                <div className="grid grid-cols-3 gap-px bg-border rounded-xl overflow-hidden mt-6">
                  {[
                    ["13+ yrs", "tech / product"],
                    ["100s", "PV installs"],
                    ["C2", "English"],
                  ].map(([n, l]) => (
                    <div key={l} className="bg-card p-4 text-center">
                      <p className="text-lg font-semibold text-lime">{n}</p>
                      <p className="text-[10px] tracking-wider uppercase text-muted-foreground mt-1">{l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners & quality */}
      <section className="py-24 bg-card border-y border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <p className="text-minimal text-lime mb-4">Partners on the ground</p>
            <h2 className="text-3xl md:text-4xl font-light text-architectural mb-10">
              We only work with fully licensed,
              <br />
              <span className="text-muted-foreground">high-qualification trades.</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="card-raised p-8">
                <p className="text-minimal text-lime mb-3">Lead electrical partner</p>
                <h3 className="text-2xl font-light mb-3">
                  Jochen Volland — German-Canadian Red Seal Master Electrician
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  15+ years of Alberta electrical experience and the Interprovincial Red Seal
                  endorsement. Every NullPunkt residential and commercial install in the Calgary
                  region is delivered with Jochen's team — so we have full Code-compliant
                  electrical capacity from day one and the German engineering mindset on both
                  sides of the project.
                </p>
              </div>
              <div className="card-raised p-8">
                <p className="text-minimal text-lime mb-3">Standards we hold ourselves to</p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex gap-3"><span className="text-lime">→</span> Canadian Electrical Code + Alberta-licensed master electricians on every project.</li>
                  <li className="flex gap-3"><span className="text-lime">→</span> Tier-1 modules with IEC 61215 Class 3+ hail rating, UL 9540 storage.</li>
                  <li className="flex gap-3"><span className="text-lime">→</span> The same engineering, commissioning and documentation discipline used on 600+ German installations.</li>
                  <li className="flex gap-3"><span className="text-lime">→</span> 5-year NullPunkt workmanship warranty stacked on top of manufacturer warranties.</li>
                </ul>
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
              Founding customers get priority engineering slots and a direct line to me and the team.
            </p>
            <Link to="/contact" className="btn-lime">Book a free consultation →</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
