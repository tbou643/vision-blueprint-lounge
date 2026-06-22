import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";

const Services = () => {
  const services = [
    {
      number: "01",
      title: "Residential Integrated Systems",
      tag: "B2C · Calgary metro",
      description:
        "Fully integrated solar energy systems for owner-occupied homes. Engineered as one ecosystem rather than a stack of separately installed devices — increasing self-consumption from 25–40% (PV-only) to 70–85%.",
      features: [
        "8–15 kWp Tier-1 PV with Hail Class HW5 modules",
        "10–15 kWh LFP battery storage (UL 9540)",
        "Intelligent HEMS — OpenEMS-based, no vendor lock-in",
        "Heat-pump and EV-charger readiness pre-wired",
      ],
      price: "CAD $26,000 – $48,000",
    },
    {
      number: "02",
      title: "Commercial & Agricultural",
      tag: "B2B · Businesses & farms",
      description:
        "Larger-scale solar with optional storage and energy management for commercial buildings, farms and small-industrial sites. Demand-charge optimisation, peak shaving and Agri-PV configurations.",
      features: [
        "20–200 kWp PV with NA-certified inverters",
        "Optional battery storage for peak shaving",
        "Demand-charge and time-of-use optimisation",
        "Agri-PV configurations for farms",
      ],
      price: "CAD $65,000 – $220,000+",
    },
    {
      number: "03",
      title: "Developer Partnerships",
      tag: "B2B · New construction",
      description:
        "Volume turnkey installations for new-construction subdivisions, integrated directly into the homebuilding process. Premium integrated solar becomes a marketable feature for the builder.",
      features: [
        "8–10 kWp pre-integrated unit per home",
        "Volume pricing coordinated with build schedule",
        "Marketing collateral for builder sales teams",
        "Single point of contact for the entire subdivision",
      ],
      price: "CAD $22,000 – $28,000 per unit",
    },
    {
      number: "04",
      title: "Service, Monitoring & Maintenance",
      tag: "Recurring · Lifetime",
      description:
        "Recurring revenue programs that keep every installed system performing for decades. Real-time monitoring, scheduled inspections and premium-component warranty management.",
      features: [
        "Lifetime cloud-based monitoring dashboard",
        "Optional annual maintenance subscription",
        "40-year module warranty management (premium tier)",
        "5-year NullPunkt Solar workmanship guarantee",
      ],
      price: "Included + optional packages",
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
              Four service lines.
              <br />
              <span className="text-muted-foreground">One integrated system.</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              NullPunkt Solar engineers PV, battery storage and intelligent energy management as a
              single coordinated installation — not four products bolted together later.
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
                  <h2 className="text-3xl md:text-4xl font-light text-architectural mb-3">{s.title}</h2>
                  <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">{s.tag}</p>
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
                  <div className="pt-4 border-t border-border flex items-center justify-between">
                    <p className="text-minimal text-muted-foreground">Reference pricing</p>
                    <p className="text-lime font-semibold">{s.price}</p>
                  </div>
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
            Free consultation. Full yield simulation. Fixed-price proposal you can compare to
            anything else on the table.
          </p>
          <Link to="/contact" className="btn-lime">Join the founding waitlist →</Link>
        </div>
      </section>
    </div>
  );
};

export default Services;
