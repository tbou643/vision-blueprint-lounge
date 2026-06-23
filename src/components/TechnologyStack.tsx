const LAYERS = [
  {
    tag: "Layer 03 · Cloud",
    title: "Monitoring & service layer",
    body: "Cloud monitoring dashboard, performance analytics, alerting, warranty management. The same telemetry stack our parent operates across its German fleet — running for the lifetime of your system.",
    items: ["Live production & consumption", "Battery state-of-charge", "Alert & fault management", "Performance reviews"],
  },
  {
    tag: "Layer 02 · Control",
    title: "Intelligent energy management",
    body: "HEMS controller built on OpenEMS — open-source, vendor-neutral. Coordinates PV, battery, heat pump, EV charger and grid in real time, optimising for self-consumption or peak-tariff avoidance.",
    items: ["OpenEMS controller", "Self-consumption optimisation", "Peak-shaving logic", "Heat-pump & EV orchestration"],
  },
  {
    tag: "Layer 01 · Hardware",
    title: "Climate-engineered hardware",
    body: "Tier-1 PV modules with IEC 61215 Class 3+ hail rating, NA-certified inverters and UL 9540 LFP battery storage. Specified by our engineers, not pushed by a single supplier.",
    items: ["Tier-1 PV · IEC 61215 Class 3+", "NA-certified inverter", "UL 9540 LFP storage", "EV charger & heat-pump readiness"],
  },
];

const TechnologyStack = () => {
  return (
    <section id="technology" className="relative py-32 bg-card border-t border-border overflow-hidden">
      <div className="glow-radial absolute inset-0 opacity-40 pointer-events-none" />
      <div className="container mx-auto px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 mb-20">
            <div className="lg:col-span-5">
              <p className="text-minimal text-lime mb-4">Technology stack</p>
              <h2 className="text-4xl md:text-6xl font-light text-architectural">
                Three layers.
                <br />
                <span className="lime-underline">One integrated system.</span>
              </h2>
            </div>
            <div className="lg:col-span-7 lg:pt-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Integrated solar isn't a panel on a roof. It's a software-meets-hardware system —
                a control layer orchestrating climate-engineered hardware, connected to a monitoring
                cloud that runs for decades. We engineer all three layers, not just the one in the middle.
              </p>
            </div>
          </div>

          <div className="space-y-px">
            {LAYERS.map((l, i) => (
              <div
                key={l.tag}
                className="group relative bg-background border border-border hover:border-lime/40 transition-colors duration-500"
              >
                <div className="grid lg:grid-cols-12 gap-8 p-10">
                  <div className="lg:col-span-3 flex lg:flex-col items-start gap-4">
                    <span className="text-minimal text-lime">{l.tag}</span>
                    <span className="text-5xl font-extralight text-muted-foreground/30 leading-none">
                      0{3 - i}
                    </span>
                  </div>
                  <div className="lg:col-span-5">
                    <h3 className="text-2xl md:text-3xl font-light mb-4 text-architectural">{l.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{l.body}</p>
                  </div>
                  <div className="lg:col-span-4">
                    <ul className="space-y-3">
                      {l.items.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm">
                          <span className="text-lime mt-1.5 w-1.5 h-1.5 rounded-full bg-lime flex-shrink-0" />
                          <span className="text-foreground/90">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-10 text-xs text-muted-foreground text-center">
            Open standards · No vendor lock-in · OpenEMS controller documented at openems.io
          </p>
        </div>
      </div>
    </section>
  );
};

export default TechnologyStack;
