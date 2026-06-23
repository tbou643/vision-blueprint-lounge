const SECTIONS = [
  { label: "01 · Site & roof survey", body: "Orientation, tilt, shading, structural notes, panel position." },
  { label: "02 · Yield simulation", body: "Hour-by-hour PV production modelled against your load." },
  { label: "03 · System design", body: "Single-line diagram, BOM, mounting, cabling, HEMS configuration." },
  { label: "04 · Incentive stack", body: "CEIP, Clean Tech ITC, micro-generation credit, retailer comparison." },
  { label: "05 · Payback model", body: "Year-by-year cash flow, simple payback, IRR, sensitivity." },
  { label: "06 · Warranty stack", body: "Module, inverter, storage and NullPunkt workmanship cover." },
  { label: "07 · Fixed-price proposal", body: "All-in price, scope of works, payment schedule, timeline." },
];

const ProposalDeliverables = () => {
  return (
    <section id="proposal" className="relative py-32 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            {/* Left: copy */}
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <p className="text-minimal text-lime mb-4">What you get</p>
              <h2 className="text-4xl md:text-6xl font-light text-architectural mb-8">
                A real proposal.
                <br />
                <span className="lime-underline">Not a back-of-envelope quote.</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Every NullPunkt site visit ends with a single, document-backed proposal. Seven sections,
                fixed-price, comparable line-by-line against any other quote on the table.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-10">
                The same proposal template our German parent has issued across hundreds of integrated
                installations — recalibrated for Alberta tariffs, weather and incentives.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Free", "Fixed-price", "Document-backed", "No pressure"].map((b) => (
                  <span
                    key={b}
                    className="text-[10px] tracking-[0.2em] uppercase border border-border rounded-full px-3 py-1.5 text-muted-foreground"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: mock document */}
            <div className="lg:col-span-7">
              <div className="relative">
                {/* Stacked paper effect */}
                <div className="absolute -inset-2 bg-card/40 border border-border/40 rounded-sm translate-x-3 translate-y-3" />
                <div className="absolute -inset-2 bg-card/60 border border-border/60 rounded-sm translate-x-1.5 translate-y-1.5" />

                <div className="relative bg-card border border-border rounded-sm overflow-hidden shadow-elegant">
                  {/* Doc header */}
                  <div className="px-8 py-5 border-b border-border flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-lime" />
                      <span className="text-minimal text-muted-foreground">Proposal · Confidential</span>
                    </div>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                      v1.0 · PDF
                    </span>
                  </div>

                  {/* Doc body */}
                  <div className="px-8 py-8">
                    <div className="mb-8">
                      <p className="text-minimal text-lime mb-2">NullPunkt Solar Inc.</p>
                      <h3 className="text-2xl font-light text-architectural mb-2">
                        Integrated PV, Battery & HEMS System
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Prepared for: Calgary homeowner · Reference: NP-2026-0XX
                      </p>
                    </div>

                    <div className="space-y-0">
                      {SECTIONS.map((s) => (
                        <div
                          key={s.label}
                          className="grid grid-cols-12 gap-4 py-4 border-t border-border first:border-t-0"
                        >
                          <p className="col-span-5 text-sm font-medium text-foreground">{s.label}</p>
                          <p className="col-span-7 text-sm text-muted-foreground leading-relaxed">{s.body}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-border grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1">
                          Pages
                        </p>
                        <p className="text-lg font-light">18–24</p>
                      </div>
                      <div>
                        <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1">
                          Validity
                        </p>
                        <p className="text-lg font-light">30 days</p>
                      </div>
                      <div>
                        <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1">
                          Cost
                        </p>
                        <p className="text-lg font-light text-lime">Free</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-6 text-xs text-muted-foreground text-center">
                Illustrative document structure · Actual proposals are tailored to your site, roof and load profile.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProposalDeliverables;
