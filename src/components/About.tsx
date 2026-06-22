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
                <span className="text-muted-foreground">A decade of practice.</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                <span className="text-foreground font-medium">NullPunkt Solar Inc.</span> is the
                wholly-owned Canadian subsidiary of <span className="text-foreground font-medium">SMB
                Solartechnik GmbH</span> — a profitable German solar company with annual revenue
                exceeding EUR 700,000 and hundreds of completed integrated installations.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We're bringing the engineering, the supplier network and the playbook to Alberta —
                so the first integrated system we commission in Calgary builds on years of refined
                practice in the world's most demanding solar market.
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
