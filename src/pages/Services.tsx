import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";

const Services = () => {
  const services = [
    {
      number: "01",
      title: "Solar PV Systems",
      description:
        "Tier-1 rooftop and ground-mount photovoltaic systems sized for Alberta's irradiance profile. We model your real consumption against twenty years of local weather data before we quote a single module.",
      features: [
        "Tier-1 modules with 25-year performance warranty",
        "Snow-load and chinook-wind engineered mounting",
        "Pre-build yield simulation, not back-of-envelope math",
        "Grid interconnection paperwork handled end-to-end",
      ],
    },
    {
      number: "02",
      title: "Battery Storage",
      description:
        "Lithium storage sized to your actual evening load — so the midday surplus that would normally feed back at minimal credit powers your house at retail rates instead.",
      features: [
        "LFP chemistry — safer, longer cycle life",
        "Grid backup for the next outage",
        "Modular capacity, expandable later",
        "10-year warranty as standard",
      ],
    },
    {
      number: "03",
      title: "Heat Pump Systems",
      description:
        "Cold-climate air-source and ground-source heat pumps that pair directly with your PV. One unit replaces your furnace, AC and most of your hot water — and runs on the electrons from your own roof.",
      features: [
        "Rated for Calgary winters down to -25°C",
        "COP up to 5.0 on shoulder seasons",
        "Direct integration with PV + battery",
        "Whisper-quiet outdoor unit",
      ],
    },
    {
      number: "04",
      title: "Integrated System Design",
      description:
        "The four boxes above are useless if they don't talk to each other. We design one coordinated system that prioritises self-consumption, predicts your bills, and monitors itself in real time.",
      features: [
        "Energy management with load prioritisation",
        "Live monitoring dashboard",
        "Heat pump runs on PV surplus automatically",
        "Future-ready for EV charging",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-40 pb-20 relative">
        <div className="absolute inset-x-0 top-0 h-[50vh] glow-radial pointer-events-none" />
        <div className="container mx-auto px-6 relative">
          <div className="max-w-5xl mx-auto">
            <p className="text-minimal text-lime mb-6">What we build</p>
            <h1 className="text-5xl md:text-7xl font-light text-architectural mb-8">
              Four pieces.
              <br />
              <span className="text-muted-foreground">One coordinated system.</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              We engineer PV, storage and heat pumps as a single installation — not four
              separate ones bolted together later.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-32">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto space-y-px bg-border rounded-2xl overflow-hidden">
            {services.map((s) => (
              <div key={s.number} className="bg-background p-10 md:p-14 grid md:grid-cols-12 gap-8">
                <div className="md:col-span-4">
                  <p className="text-lime text-sm font-mono font-semibold mb-3">{s.number}</p>
                  <h2 className="text-3xl md:text-4xl font-light text-architectural">{s.title}</h2>
                </div>
                <div className="md:col-span-8 space-y-6">
                  <p className="text-lg text-muted-foreground leading-relaxed">{s.description}</p>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-lime flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-card border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-light text-architectural mb-6">
            Let's run the numbers for your address.
          </h2>
          <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
            Free consultation. Full simulation. Fixed-price proposal you can compare to anything else on the table.
          </p>
          <Link to="/contact" className="btn-lime">Get your free quote →</Link>
        </div>
      </section>
    </div>
  );
};

export default Services;
