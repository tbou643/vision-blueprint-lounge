const Services = () => {
  const services = [
    {
      number: "01",
      title: "Solar PV Systems",
      description:
        "High-yield rooftop and ground-mount PV designed for Alberta's long winters and high-irradiance summers. Tier-1 modules, 25-year performance warranty.",
    },
    {
      number: "02",
      title: "Battery Storage",
      description:
        "Modern lithium storage that captures your midday surplus and powers your evenings — with grid backup when the wind picks up on the foothills.",
    },
    {
      number: "03",
      title: "Heat Pumps",
      description:
        "Cold-climate air-source and ground-source heat pumps that pair with your PV. One system for heating, cooling and hot water — minus the gas bill.",
    },
    {
      number: "04",
      title: "Integrated Design",
      description:
        "We don't sell boxes. We engineer one coordinated system where production meets consumption — monitored, optimised, and built to last.",
    },
  ];

  return (
    <section id="services" className="relative py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 max-w-3xl">
            <p className="text-minimal text-lime mb-4">What we build</p>
            <h2 className="text-4xl md:text-6xl font-light text-architectural">
              One system.
              <br />
              <span className="text-muted-foreground">Four moving parts.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-border rounded-2xl overflow-hidden">
            {services.map((s) => (
              <div
                key={s.number}
                className="bg-background p-10 md:p-12 group hover:bg-card transition-colors duration-500"
              >
                <div className="flex items-start gap-6">
                  <span className="text-lime text-sm font-mono font-semibold pt-1">{s.number}</span>
                  <div>
                    <h3 className="text-2xl font-semibold mb-4 group-hover:text-lime transition-colors duration-500">
                      {s.title}
                    </h3>
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
