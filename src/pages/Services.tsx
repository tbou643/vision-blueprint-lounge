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
      price: "CAD $25,000 – $44,000 turn-key",
      priceNote: "All-in: hardware, install, permits, ENMAX/EPCOR interconnection, HEMS commissioning",
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
      price: "From CAD $1,800 / kWp",
      priceNote: "Typical projects $40,000 – $320,000 · 30% federal Clean Tech ITC eligible",
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
      price: "From CAD $16,500 per unit",
      priceNote: "Volume pricing from 10+ units · battery optional add-on",
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
        "25-year module performance warranty management",
        "5-year NullPunkt Solar workmanship guarantee",
      ],
      price: "Included + CAD $180–$360 / yr optional",
      priceNote: "Monitoring free for life · Annual inspection + cleaning packages optional",
    },
  ];

  const process = [
    {
      step: "01",
      title: "Free site assessment",
      duration: "Week 1",
      body: "Site visit in Calgary metro, roof + electrical inspection, irradiance & shading study with PV*SOL, honest go / no-go recommendation.",
    },
    {
      step: "02",
      title: "Fixed-price proposal",
      duration: "Week 2",
      body: "Detailed yield simulation, stacked incentive breakdown (Solar Club, CEIP, Clean Tech ITC), and a single-page fixed quote — no upsells later.",
    },
    {
      step: "03",
      title: "Engineering & permits",
      duration: "Week 3–8",
      body: "Stamped electrical drawings, City of Calgary permit, ENMAX/EPCOR micro-generation application. We handle every form.",
    },
    {
      step: "04",
      title: "Installation",
      duration: "1–2 days on site",
      body: "Day 1: roof and racking. Day 2: electrical, battery, HEMS commissioning. Crew is in-house — never subbed out.",
    },
    {
      step: "05",
      title: "Commissioning & handover",
      duration: "Week 9–10",
      body: "Utility inspection, permission-to-operate, customer walkthrough on the HEMS dashboard, monitoring activated for life.",
    },
    {
      step: "06",
      title: "Performance care",
      duration: "Lifetime",
      body: "Daily remote monitoring, proactive alerts, optional annual physical inspection. We notice underperformance before you do.",
    },
  ];

  const certifications = [
    { name: "Master Electrician", body: "Alberta-licensed master electrician on every project — code-compliant, inspection-ready." },
    { name: "IEC 61215 Class 3", body: "Hail-rated modules tested to 35 mm ice balls at 27 m/s — built for Calgary's hail belt." },
    { name: "UL 9540 batteries", body: "North-American certified energy storage — required by Alberta building code for residential install." },
    { name: "CSA / cULus inverters", body: "Only inverters with Canadian electrical certification — non-negotiable for utility interconnection." },
    { name: "OpenEMS HEMS", body: "Open-source energy management — no vendor lock-in, no subscription to view your own data." },
    { name: "WCB & $5M liability", body: "Fully insured, Workers' Compensation covered — your property and our crews are protected." },
  ];

  const financing = [
    {
      name: "Cash purchase",
      headline: "Best lifetime ROI",
      body: "Pay turn-key on milestones (30% deposit, 60% delivery, 10% PTO). Fastest payback, full ownership of every kWh.",
    },
    {
      name: "CEIP 0% PACE financing",
      headline: "$0 upfront",
      body: "Property-assessed clean-energy loan repaid through your property-tax bill over up to 20 years. Available in Calgary, Edmonton, Lethbridge, Banff and 20+ other Alberta municipalities. Obligation transfers if you sell.",
    },
    {
      name: "Bank green loan",
      headline: "Prime + 1–3%",
      body: "We partner with Alberta credit unions offering dedicated solar loan products. Pre-approval typically within 5 business days.",
    },
    {
      name: "Commercial leasing",
      headline: "Off-balance-sheet",
      body: "For commercial and agricultural clients — operating leases that preserve borrowing capacity and capture the 30% federal Clean Tech ITC.",
    },
  ];

  const comparison = [
    { feature: "Engineering before quoting", us: "Always — stamped PV*SOL yield study", them: "Rarely — rule-of-thumb sizing" },
    { feature: "Battery integrated from day one", us: "Standard on every residential build", them: "Bolted on later, often incompatible" },
    { feature: "Workmanship warranty", us: "5 years, transferable", them: "1–2 years typical" },
    { feature: "Crews", us: "In-house W-2 employees", them: "Subcontracted day labour" },
    { feature: "HEMS / monitoring", us: "Open-source, free for life", them: "Proprietary, often paid subscription" },
    { feature: "After-sales response", us: "Same-day diagnosis · ≤72h on-site", them: "Multi-week ticket queues" },
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
                  <div className="pt-4 border-t border-border space-y-1">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <p className="text-minimal text-muted-foreground">Reference pricing (2026)</p>
                      <p className="text-lime font-semibold">{s.price}</p>
                    </div>
                    <p className="text-xs text-muted-foreground/70">{s.priceNote}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground/70 text-center max-w-3xl mx-auto mt-6">
            All pricing in CAD, exclusive of GST. Final price depends on roof complexity, electrical
            upgrades, and selected hardware tier. Quoted prices are fixed — not estimates.
          </p>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 border-t border-border bg-card">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="max-w-2xl mb-14">
            <p className="text-minimal text-lime mb-4">How we work</p>
            <h2 className="text-4xl md:text-5xl font-light text-architectural mb-6">
              From first call to permission-to-operate — typically 8–10 weeks.
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              A predictable, transparent process. You always know what step we're on, what's blocking
              progress, and what's next.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {process.map((p) => (
              <div key={p.step} className="card-raised p-7">
                <div className="flex items-baseline justify-between mb-4">
                  <span className="text-lime text-sm font-mono font-semibold">{p.step}</span>
                  <span className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground">{p.duration}</span>
                </div>
                <h3 className="text-xl font-light mb-3">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-24 border-t border-border">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="max-w-2xl mb-14">
            <p className="text-minimal text-lime mb-4">Certifications & standards</p>
            <h2 className="text-4xl md:text-5xl font-light text-architectural mb-6">
              Built to North-American code. Engineered to German tolerances.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden">
            {certifications.map((c) => (
              <div key={c.name} className="bg-background p-7">
                <p className="text-minimal text-lime mb-3">{c.name}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Financing */}
      <section className="py-24 border-t border-border bg-card">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="max-w-2xl mb-14">
            <p className="text-minimal text-lime mb-4">Financing options</p>
            <h2 className="text-4xl md:text-5xl font-light text-architectural mb-6">
              Four ways to pay. We help you pick the cheapest one.
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We're installers, not lenders — so we'll always show you the math behind every option, including
              the one where you don't finance at all.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {financing.map((f) => (
              <div key={f.name} className="card-raised p-8">
                <div className="flex items-baseline justify-between mb-3 gap-4">
                  <h3 className="text-xl font-light">{f.name}</h3>
                  <p className="text-minimal text-lime whitespace-nowrap">{f.headline}</p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-24 border-t border-border">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="max-w-2xl mb-14">
            <p className="text-minimal text-lime mb-4">Why NullPunkt</p>
            <h2 className="text-4xl md:text-5xl font-light text-architectural mb-6">
              How we compare to a typical Alberta installer.
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Honest, no-marketing comparison. If another installer matches all six rows, hire them — they're good.
            </p>
          </div>
          <div className="card-raised overflow-hidden">
            <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-border bg-background/40">
              <p className="col-span-5 text-minimal text-muted-foreground">What matters</p>
              <p className="col-span-4 text-minimal text-lime">NullPunkt Solar</p>
              <p className="col-span-3 text-minimal text-muted-foreground">Typical installer</p>
            </div>
            {comparison.map((row, i) => (
              <div
                key={row.feature}
                className={`grid grid-cols-12 gap-4 px-6 py-5 text-sm ${
                  i !== comparison.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <p className="col-span-5 font-light">{row.feature}</p>
                <p className="col-span-4 text-foreground">{row.us}</p>
                <p className="col-span-3 text-muted-foreground">{row.them}</p>
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
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link to="/calculator" className="btn-lime">Run the calculator →</Link>
            <Link to="/contact" className="text-sm text-muted-foreground hover:text-lime transition-colors">
              Join the founding waitlist →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
