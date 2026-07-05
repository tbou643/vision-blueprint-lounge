const Services = () => {
  const services = [
    {
      number: "01",
      title: "Residential Integrated Systems",
      tag: "B2C",
      description:
        "8–15 kWp PV, 10–15 kWh battery storage, intelligent HEMS, plus heat-pump and EV-charger readiness - engineered as one coordinated system for Alberta homes.",
    },
    {
      number: "02",
      title: "Commercial & Agricultural",
      tag: "B2B",
      description:
        "20–200 kWp PV with optional storage and energy management for businesses, farms and small commercial properties. Demand-charge optimisation and Agri-PV included.",
    },
    {
      number: "03",
      title: "Developer Partnerships",
      tag: "B2B",
      description:
        "Turnkey pre-integrated solar built into new-construction subdivisions - a premium sales feature for builders, fully coordinated with the construction schedule.",
    },
    {
      number: "04",
      title: "Service, Monitoring & Maintenance",
      tag: "Recurring",
      description:
        "Lifetime cloud-based monitoring dashboard, optional annual maintenance packages and premium-component warranty management for every installed system.",
    },
  ];

  return (
    <section id="services" className="relative py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 max-w-3xl">
            <p className="text-minimal text-lime mb-4">What we build</p>
            <h2 className="text-4xl md:text-6xl font-light text-architectural">
              Four service lines.
              <br />
              <span className="text-muted-foreground">One integrated system.</span>
            </h2>
          </div>

          <p className="text-sm text-muted-foreground max-w-2xl mt-10">
            Every installation is delivered with an Alberta-licensed master electrician partner and
            engineered to the same standards our parent company has refined across several hundred
            German installations. We only work with fully licensed, high-qualification trades -
            no anonymous subcontractor chains.
          </p>


          <div className="grid md:grid-cols-2 gap-px bg-border rounded-2xl overflow-hidden">
            {services.map((s) => (
              <div
                key={s.number}
                className="bg-background p-10 md:p-12 group hover:bg-card transition-colors duration-500"
              >
                <div className="flex items-start gap-6">
                  <span className="text-lime text-sm font-mono font-semibold pt-1">{s.number}</span>
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="text-2xl font-semibold group-hover:text-lime transition-colors duration-500">
                        {s.title}
                      </h3>
                      <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground border border-border px-2 py-0.5 rounded-full">
                        {s.tag}
                      </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{s.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
