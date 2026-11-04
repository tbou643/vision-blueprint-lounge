import Navigation from "@/components/Navigation";
import SiteFooter from "@/components/SiteFooter";
import SEO from "@/components/SEO";
import { CEIP_STATUS, CEIP_SOURCE } from "@/lib/solar-facts";
import { Link } from "react-router-dom";

const Services = () => {
  const services = [
    {
      number: "01",
      title: "Residential Integrated Systems",
      tag: "B2C · Calgary metro",
      description:
        "Rooftop solar for Calgary homeowners, designed around actual annual electricity use, roof condition and shading. Battery storage and energy management are optional and assessed against your goals and budget.",
      features: [
        "Tier-1 PV sized to your annual consumption, up to 15 kWp, with Hail Class HW5 modules",
        "Optional battery storage, selected for the site and required certifications",
        "Intelligent HEMS - OpenEMS-based, no vendor lock-in",
        "Optional EV and energy-management integration; no heat-pump installation",
      ],
      price: "Individual project quote",
      priceNote: "All-in: hardware, install, permits, ENMAX/EPCOR interconnection, HEMS commissioning",
    },
    {
      number: "02",
      title: "Commercial & Agricultural",
      tag: "B2B · Businesses & farms",
      description:
        "Larger-scale solar with optional storage and energy management for commercial buildings, farms and small-industrial sites. Demand-charge optimisation, peak shaving and Agri-PV configurations.",
      features: [
        "15-200 kWp PV with NA-certified inverters",
        "Optional battery storage for peak shaving",
        "Demand-charge and time-of-use optimisation",
        "Agri-PV configurations for farms",
      ],
      price: "Individual commercial quote",
      priceNote: "Scope and pricing confirmed after site review; tax-credit eligibility requires individual assessment",
    },
    {
      number: "03",
      title: "Developer Partnerships",
      tag: "B2B · New construction",
      description:
        "Volume turnkey installations for new-construction subdivisions, integrated directly into the homebuilding process. Premium integrated solar becomes a marketable feature for the builder.",
      features: [
        "Pre-integrated unit per home, sized to each floor plan's load",
        "Volume pricing coordinated with build schedule",
        "Marketing collateral for builder sales teams",
        "Single point of contact for the entire subdivision",
      ],
      price: "Project-specific volume quote",
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
      price: "Maintenance scope quoted separately",
      priceNote: "Monitoring free for life · Annual inspection + cleaning packages optional",
    },
  ];

  const process = [
    {
      step: "01",
      title: "Free site assessment",
      duration: "First step",
      body: "Site visit in Calgary metro, roof + electrical inspection, irradiance & shading study with PV*SOL, honest go / no-go recommendation.",
    },
    {
      step: "02",
      title: "Fixed-price proposal",
      duration: "After site review",
      body: "Yield modelling, itemised equipment and installation scope, applicable program eligibility and a project-specific quote. Financing and tax credits are not assumed approved.",
    },
    {
      step: "03",
      title: "Engineering & permits",
      duration: "Approval-dependent",
      body: "Stamped electrical drawings, City of Calgary permit, ENMAX/EPCOR micro-generation application. We handle every form.",
    },
    {
      step: "04",
      title: "Installation",
      duration: "Scope-dependent",
      body: "Roof mounting, electrical work and optional storage are coordinated to the approved scope. The installation schedule is confirmed individually with Alberta-licensed partners.",
    },
    {
      step: "05",
      title: "Commissioning & handover",
      duration: "After approvals",
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
    { name: "Master Electrician", body: "Alberta-licensed master electrician on every project - code-compliant, inspection-ready." },
    { name: "IEC 61215 Class 3", body: "Hail-rated modules tested to 35 mm ice balls at 27 m/s - built for Calgary's hail belt." },
    { name: "UL 9540 batteries", body: "North-American certified energy storage - required by Alberta building code for residential install." },
    { name: "CSA / cULus inverters", body: "Only inverters with Canadian electrical certification - non-negotiable for utility interconnection." },
    { name: "OpenEMS HEMS", body: "Open-source energy management - no vendor lock-in, no subscription to view your own data." },
    { name: "WCB & $5M liability", body: "Fully insured, Workers' Compensation covered - your property and our crews are protected." },
  ];

  const financing = [
    { name: "Cash purchase", headline: "Individual terms", body: "Payment milestones and the full CAD cost, including GST, are set out in your project proposal. Compare lifetime costs without assuming financing is cheaper." },
    { name: "Calgary CEIP", headline: "Intake closed", body: CEIP_STATUS, source: CEIP_SOURCE },
    { name: "Private financing", headline: "Lender approval", body: "If you arrange a bank or credit-union loan, compare interest, fees and repayment terms directly with the lender. We do not promise approval, a specific rate or an existing lending partnership." },
    { name: "Business tax credits", headline: "Eligibility-dependent", body: "Qualifying businesses may be eligible for clean-technology tax credits. Confirm equipment, entity and labour requirements with your tax adviser before including any credit in the project budget." },
  ];

  const comparison = [
    { feature: "System sizing", us: "Annual consumption and site assessment", them: "Which annual kWh and roof assumptions are used?" },
    { feature: "Battery storage", us: "Optional, assessed separately", them: "Does the battery cost justify the expected benefit?" },
    { feature: "Warranty coverage", us: "Documented in the proposal", them: "Who handles warranty claims and exclusions?" },
    { feature: "Electrical work", us: "Alberta-licensed electrical partners", them: "Who is responsible for the permitted electrical scope?" },
    { feature: "Quote scope", us: "Equipment, installation and GST identified", them: "Are electrical upgrades and permits included?" },
    { feature: "Project timing", us: "Confirmed individually", them: "Which permits and utility approvals are still needed?" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Solar Installation Calgary - Residential & Commercial | NullPunkt"
        description="Four integrated solar service lines for Calgary and Alberta: residential PV+battery+HEMS, commercial and agri PV, developer partnerships, and lifetime monitoring."
        path="/services"
      />
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
              single coordinated installation - not four products bolted together later.
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
                      <p className="text-minimal text-muted-foreground">Your proposal</p>
                      <p className="text-lime font-semibold">{s.price}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{s.priceNote}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground text-center max-w-3xl mx-auto mt-6">
            We do not publish a universal installation price. Your individual CAD quote identifies GST, equipment, roof work, permits and electrical upgrades. Optional storage is priced separately.
          </p>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 border-t border-border bg-card">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="max-w-2xl mb-14">
            <p className="text-minimal text-lime mb-4">How we work</p>
            <h2 className="text-4xl md:text-5xl font-light text-architectural mb-6">
              From roof review to permission-to-operate.
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
              Financing is not a rebate.
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We're installers, not lenders - so we'll always show you the math behind every option, including
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
                {f.source && <a href={f.source} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-sm text-lime underline">Check current CEIP terms</a>}
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
              What to check in any solar quote.
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Use the same questions for every proposal. Compare scope, not just a headline price.
            </p>
          </div>
          <div className="card-raised overflow-hidden">
            <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-border bg-background/40">
              <p className="col-span-5 text-minimal text-muted-foreground">What matters</p>
              <p className="col-span-4 text-minimal text-lime">NullPunkt Solar</p>
              <p className="col-span-3 text-minimal text-muted-foreground">Ask any installer</p>
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
              Reserve your free site visit →
            </Link>
          </div>
        </div>
      </section>
      <SiteFooter />

    </div>
  );
};

export default Services;
