import founderImage from "@/assets/tim-brunkel.asset.json";

const About = () => {
  return (
    <section id="about" className="relative py-32 bg-card">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5">
              <p className="text-minimal text-lime mb-4">Why NullPunkt</p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-architectural mb-8">
                A new name in Calgary.
                <br />
                <span className="text-muted-foreground">A proven engineering playbook.</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                <span className="text-foreground font-medium">NullPunkt Solar Inc.</span> is the
                wholly-owned Canadian subsidiary of{" "}
                <a
                  href="https://www.smb-solartechnik.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground font-medium underline decoration-lime/40 underline-offset-4 hover:decoration-lime transition-colors"
                >
                  SMB Solartechnik GmbH
                </a>{" "}
                — a German solar company specialising in integrated PV, battery and HEMS systems,
                with several hundred residential, commercial and agricultural installations
                completed. Calgary inherits the same engineering team, supplier network and quality
                standards through a continuous transatlantic knowledge-exchange programme.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We bring the engineering playbook, the supplier network and the partner standards to
                Alberta — and we only work with fully licensed, high-qualification trades on the
                ground. Every installation is delivered together with an
                <span className="text-foreground"> Alberta-licensed master electrician partner</span>,
                so the first system we commission in Calgary is held to the same standard our parent
                applies to every install in Germany.
              </p>
            </div>

            <div className="lg:col-span-7 lg:pl-12">
              <p className="text-minimal text-muted-foreground mb-8">The Point Zero promise</p>
              <div className="space-y-6">
                {[
                  {
                    title: "Zero guesswork",
                    body: "Every proposal includes the full yield simulation, the bill of materials and the payback math — before you sign.",
                  },
                  {
                    title: "Zero handoffs",
                    body: "One team designs the PV, sizes the battery, configures the HEMS and commissions the lot. No subcontractor chains.",
                  },
                  {
                    title: "Zero surprises",
                    body: "Fixed-price quotes, climate-engineered hardware and warranties measured in decades — backed by a parent company built to last.",
                  },
                ].map((row) => (
                  <div key={row.title} className="flex gap-6 p-6 rounded-xl border border-border bg-background/40">
                    <div className="mt-2 w-2 h-2 rounded-full bg-lime shadow-lime flex-shrink-0" />
                    <div>
                      <h4 className="text-lg font-semibold mb-2">{row.title}</h4>
                      <p className="text-muted-foreground leading-relaxed">{row.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Founder snapshot */}
          <div className="mt-24 max-w-4xl">
            <div className="flex items-center gap-5 mb-8">
              <div
                className="relative w-16 h-16 rounded-full overflow-hidden border border-border bg-card shrink-0"
                style={{
                  WebkitMaskImage: "radial-gradient(circle at center, black 55%, transparent 100%)",
                  maskImage: "radial-gradient(circle at center, black 55%, transparent 100%)",
                }}
              >
                <img
                  src={founderImage.url}
                  alt="Tim Brunkel, Founder & CEO of NullPunkt Solar Inc."
                  className="w-full h-full object-cover opacity-80 saturate-75"
                  loading="lazy"
                />
              </div>
              <p className="text-minimal text-lime">Meet the founder</p>
            </div>
            <h3 className="text-3xl md:text-4xl font-light text-architectural mb-6">
              Tim Brunkel — recognised PV authority in Germany, now building in Calgary.
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Tim founded SMB Solartechnik in Germany in 2024 and scaled the parent company past{" "}
              <span className="text-foreground font-medium">CAD $1,000,000 in annual sales</span>,
              personally overseeing several hundred integrated PV installations across residential,
              commercial and agricultural sites. Within Germany's hyper-competitive solar market he's
              regarded as a go-to authority on fully integrated PV + battery + HEMS design. Before
              solar he spent 13+ years leading IT innovation and product programs — most recently as
              Head of IT Innovation Solution Design at ZF Friedrichshafen AG.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              He's relocating to Calgary as principal directing mind of NullPunkt Solar Inc., with
              CAD $298,000 of committed capital and a hand on every early Alberta project. If you
              book a site visit in our first year, the engineer at your kitchen table is the
              founder.
            </p>
          </div>

          {/* Stat strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border mt-20 rounded-xl overflow-hidden">
            {[
              ["Parent company", "SMB Solartechnik"],
              ["Integrated installs", "Hundreds, DE"],
              ["Calgary launch", "Summer 2026"],
              ["Calgary sunshine", "2,396 hrs/yr"],
            ].map(([k, v]) => (
              <div key={k} className="bg-card p-8">
                <p className="text-minimal text-muted-foreground mb-2">{k}</p>
                <p className="text-2xl font-semibold">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
