const STEPS = [
  {
    n: "01",
    title: "Site assessment",
    body: "On-site roof survey, shading analysis, electrical panel review, consumption audit from 12 months of bills.",
    deliverable: "Site report",
  },
  {
    n: "02",
    title: "Yield simulation",
    body: "PV yield modelled against NRCan long-term Calgary irradiance data, hour-by-hour against your actual load profile.",
    deliverable: "Yield report",
  },
  {
    n: "03",
    title: "Engineering & permitting",
    body: "Single-line diagram, structural calc, micro-generation paperwork with ENMAX/EPCOR, municipal permits, utility interconnection queue.",
    deliverable: "Stamped drawings",
  },
  {
    n: "04",
    title: "Procurement & logistics",
    body: "Tier-1 modules, NA-certified inverter, UL 9540 storage, HEMS controller — sourced through the supply network our German parent has used for years.",
    deliverable: "Bill of materials",
  },
  {
    n: "05",
    title: "Installation & commissioning",
    body: "Mounting, DC and AC works delivered with an Alberta-licensed master electrician partner. HEMS configured on site. Utility-witnessed commissioning.",
    deliverable: "Commissioning report",
  },
  {
    n: "06",
    title: "Monitoring & service",
    body: "Cloud monitoring dashboard live from day one. Optional annual maintenance, warranty management, performance reviews — for the lifetime of the system.",
    deliverable: "Lifetime dashboard",
  },
];

const EngineeringProcess = () => {
  return (
    <section id="process" className="relative py-32 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 mb-20">
            <div className="lg:col-span-5">
              <p className="text-minimal text-lime mb-4">How we work</p>
              <h2 className="text-4xl md:text-6xl font-light text-architectural">
                Six stages.
                <br />
                <span className="lime-underline">One accountable team.</span>
              </h2>
            </div>
            <div className="lg:col-span-7 lg:pt-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Every NullPunkt project moves through the same six-stage engineering pipeline our German parent
                has refined across hundreds of integrated installations. No anonymous subcontractor chains.
                A documented deliverable at every stage.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {STEPS.map((s) => (
              <div
                key={s.n}
                className="group relative bg-background p-10 hover:bg-card transition-colors duration-500"
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="text-minimal text-lime">{s.n}</span>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground border border-border rounded-full px-3 py-1">
                    {s.deliverable}
                  </span>
                </div>
                <h3 className="text-2xl font-light mb-4 text-architectural">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>

                <div className="mt-8 h-px w-12 bg-lime/40 group-hover:w-24 transition-all duration-500" />
              </div>
            ))}
          </div>

          <p className="mt-10 text-xs text-muted-foreground text-center">
            Indicative timeline · 8–12 weeks from signed proposal to commissioned system, depending on utility interconnection queue.
          </p>
        </div>
      </div>
    </section>
  );
};

export default EngineeringProcess;
