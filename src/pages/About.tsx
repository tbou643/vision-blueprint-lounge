import Navigation from "@/components/Navigation";
import SiteFooter from "@/components/SiteFooter";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import founderImage from "@/assets/tim-brunkel.asset.json";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="About NullPunkt Solar - German engineering, Calgary subsidiary"
        description="NullPunkt Solar Inc. is the Canadian subsidiary of SMB Solartechnik GmbH. Meet the team behind Calgary's German-engineered integrated solar systems."
        path="/about"
      />
      <Navigation />

      <section className="pt-40 pb-24 relative">
        <div className="absolute inset-x-0 top-0 h-[60vh] glow-radial pointer-events-none" />
        <div className="container mx-auto px-6 relative">
          <div className="max-w-5xl mx-auto">
            <p className="text-minimal text-lime mb-6">About NullPunkt</p>
            <h1 className="text-5xl md:text-7xl font-light text-architectural mb-10">
              A new Calgary company, with a proven German playbook already running.
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
              <span className="text-foreground font-medium">"NullPunkt"</span> is the point of
              origin on a technical drawing - coordinate zero, where every measurement starts.
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
                  NullPunkt Solar Inc. is the wholly-owned Canadian subsidiary of{" "}
                  <a
                    href="https://www.smb-solartechnik.de"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground underline decoration-lime/40 underline-offset-4 hover:decoration-lime transition-colors"
                  >
                    SMB Solartechnik GmbH
                  </a>{" "}
                  - an established German solar company with hundreds of completed integrated PV,
                  battery and HEMS installations across residential, commercial and agricultural
                  sites.
                </p>
                <p>
                  We didn't show up in Calgary to learn the trade. We came because the Alberta
                  grid, the housing stock and the sun hours finally make the numbers work - and
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
                  your roof and your appetite for grid independence - then pick the modules, the
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
      {/* Group structure & parent company */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-12 items-start mb-14">
              <div className="lg:col-span-5">
                <p className="text-minimal text-lime mb-4">The group</p>
                <h2 className="text-4xl md:text-5xl font-light text-architectural mb-6">
                  Two companies.
                  <br />
                  <span className="text-muted-foreground">One engineering standard.</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  NullPunkt Solar and SMB Solartechnik operate as a single technical organisation
                  across two countries. Engineering, procurement standards, monitoring
                  infrastructure and HEMS know-how flow continuously between Calgary and southern
                  Germany - so every Alberta install benefits from work already proven on hundreds
                  of European rooftops.
                </p>
              </div>

              <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
                <div className="card-raised p-7">
                  <p className="text-minimal text-lime mb-3">Parent company</p>
                  <h3 className="text-xl font-semibold mb-2">SMB Solartechnik GmbH</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    Southern Germany. Integrated PV + battery + HEMS specialist. Several hundred
                    installations delivered across residential, commercial and agricultural sites.
                  </p>
                  <a
                    href="https://www.smb-solartechnik.de"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-lime hover:text-foreground transition-colors"
                  >
                    smb-solartechnik.de
                    <span aria-hidden>↗</span>
                  </a>
                </div>
                <div className="card-raised p-7">
                  <p className="text-minimal text-lime mb-3">Canadian subsidiary</p>
                  <h3 className="text-xl font-semibold mb-2">NullPunkt Solar Inc.</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Calgary, Alberta. Wholly-owned subsidiary delivering the same integrated
                    systems for Canadian homes and businesses, with Alberta-licensed master
                    electrician partners on every project.
                  </p>
                </div>
                <div className="card-raised p-7 sm:col-span-2">
                  <p className="text-minimal text-lime mb-3">Transatlantic knowledge exchange</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Shared engineering reviews, joint supplier relationships, common design tools
                    and a continuous feedback loop between the two teams. Every system commissioned
                    in Calgary is signed off against the same internal standard SMB applies to its
                    German fleet - and every operational lesson from Alberta winters flows back
                    into the group playbook.
                  </p>
                </div>
              </div>
            </div>

            {/* Leadership */}
            <p className="text-minimal text-lime mb-4">Leadership</p>
            <div className="flex items-center gap-5 mb-8">
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
                  alt="Tim Brunkel - Founder & CEO of NullPunkt Solar Inc."
                  className="w-full h-full object-cover opacity-80 saturate-75"
                  loading="lazy"
                />
              </div>
              <div>
                <p className="text-sm text-foreground font-medium">Tim Brunkel</p>
                <p className="text-sm text-muted-foreground">Founder & CEO · NullPunkt Solar Inc. / SMB Solartechnik GmbH</p>
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl font-light text-architectural mb-8">
              The group's principal engineer
              <br />
              <span className="text-muted-foreground">leading the Calgary launch in person.</span>
            </h2>

            <div className="grid lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-8 space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  Hi - I'm Tim. I founded <span className="text-foreground">SMB Solartechnik GmbH</span>{" "}
                  in 2024 and grew it past{" "}
                  <span className="text-foreground font-medium">CAD 1.2M in annual sales</span>{" "}
                  in Germany's hyper-competitive solar market, personally overseeing several hundred
                  integrated photovoltaic installations across residential, commercial and
                  agricultural projects. Within the German integrated-PV scene I'm regarded as one of
                  the go-to authorities on combined PV + battery + HEMS design - it's exactly that
                  playbook I'm bringing to Calgary.
                </p>
                <p>
                  Before solar, I spent 13+ years in senior technology roles at a major German
                  industrial group, leading cross-functional teams turning emerging technology into
                  enterprise solutions. That product- and program-management background is exactly
                  what fully integrated solar needs: PV + battery + heat pump + EV + intelligent
                  energy management (HEMS / OpenEMS) is a software-meets-hardware problem, not a
                  panel-on-a-roof problem.
                </p>
                <p>
                  I'm relocating from southern Germany to Calgary as principal directing mind and
                  sole Director of NullPunkt Solar Inc., with significant committed capital
                  (bank-verified) backing the Canadian launch. I lived and worked in Canada once
                  before - 18 months of Work & Travel back in 2008–09 - and I've wanted to come
                  back ever since. Now I get to build something here that actually matters for
                  Alberta's energy future.
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
                  German-Canadian master electrician partnership
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our planned default electrical partner for Calgary installations is a
                  German-Canadian, Alberta-licensed master electrician with long-standing local
                  experience and an Interprovincial trade endorsement. Working with vetted partner
                  crews - rather than anonymous day labour - means every NullPunkt residential and
                  commercial install runs to Canadian Electrical Code with German engineering
                  discipline on both sides of the project. Partner details are confirmed in the
                  proposal for each site.
                </p>
              </div>
              <div className="card-raised p-8">
                <p className="text-minimal text-lime mb-3">Standards we hold ourselves to</p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex gap-3"><span className="text-lime">→</span> Canadian Electrical Code + Alberta-licensed master electrician partner on every project.</li>
                  <li className="flex gap-3"><span className="text-lime">→</span> Tier-1 modules with IEC 61215 Class 3+ hail rating, UL 9540 storage.</li>
                  <li className="flex gap-3"><span className="text-lime">→</span> The same engineering, commissioning and documentation discipline our parent has applied across several hundred German installations.</li>
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
      <SiteFooter />

    </div>
  );
};

export default About;
