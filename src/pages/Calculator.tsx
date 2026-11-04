import Navigation from "@/components/Navigation";
import SiteFooter from "@/components/SiteFooter";
import SEO from "@/components/SEO";
import SolarCalculator from "@/components/SolarCalculator";
import PriceTrust from "@/components/PriceTrust";

import { CEIP_STATUS, CEIP_SOURCE } from "@/lib/solar-facts";
import { Link } from "react-router-dom";

const calgaryFacts = [
  { stat: "1,150", unit: "kWh / kWp / year", note: "Illustrative annual production assumption. Actual yield depends on roof orientation, shading and snow." },
  { stat: "12", unit: "months of electricity use", note: "Actual annual consumption in kWh is the starting point for your design, not roof area alone." },
  { stat: "Optional", unit: "battery storage", note: "Storage is assessed separately for your consumption pattern and backup goals." },
  { stat: "Individual", unit: "project quote", note: "Roof, equipment, electrical upgrades and installation scope determine your price." },
];

const incentives = [
  { name: "Solar Club retailer plans", amount: "Variable retailer rates", detail: "Participating retailers offer solar-specific import and export plans. Compare current high and low energy rates, fees, timing and your expected exports. A high export rate is not a guaranteed saving and may also apply to imported electricity." },
  { name: "Calgary Clean Energy Improvement Program (CEIP)", amount: "Intake currently closed", detail: CEIP_STATUS, source: CEIP_SOURCE },
  { name: "Clean Technology Investment Tax Credit", amount: "Eligibility-dependent", detail: "A federal credit may apply to qualifying business entities and eligible clean-technology equipment. It is not a general homeowner solar rebate. Confirm eligibility, labour requirements and current terms with a qualified tax adviser." },
  { name: "Alberta Micro-Generation Regulation", amount: "Energy export credits", detail: "Eligible systems generate electricity for the customer's own use and receive retailer energy credits for surplus exports. Credits are not the full delivered bill rate; fixed charges and charges on imported electricity can remain payable." },
  { name: "Canada Greener Homes Grant and Loan", amount: "Closed to new applicants", detail: "Do not include these retired programs in the funding plan for a new application. An existing approved application is governed by its own terms." },
];

const climateChallenges = [
  { title: "Roof condition and hail", body: "Review the remaining roof life before installing solar. Discuss the selected module's documented hail testing, warranty exclusions and your home insurance rather than assuming any panel is hail-proof." },
  { title: "Snow and roof loads", body: "Snow can reduce winter production. Mounting, roof pitch and structural requirements are assessed for the specific property; annual production modelling includes seasonal variation." },
  { title: "Shading and orientation", body: "Trees, neighbouring buildings and roof faces affect output. Equipment and array layout are selected after the roof review, not from a universal yield promise." },
  { title: "Electricity rates", body: "Compare your current energy rate, import charges, export credit and fixed fees. Battery storage and a retailer change may help in some cases, but must be evaluated against their cost." },
];

const faqs = [
  { q: "Is solar worth it for my Calgary home?", a: "It depends on the quoted installation cost, roof suitability, annual electricity use and retailer terms. We model those factors in an individual proposal rather than promising a universal payback period." },
  { q: "What size system do I need?", a: "Start with 12 months of electricity use in kWh. Our sizing tool uses a bill-based approximation only. A final recommendation accounts for your roof, shading, electrical requirements and utility approval." },
  { q: "Do I need a battery?", a: "No. Battery storage is optional and should be justified by your consumption pattern, economics and backup needs. Backup capability depends on the specific equipment and circuits included." },
  { q: "Can I apply for Calgary CEIP now?", a: CEIP_STATUS },
  { q: "How long does installation take?", a: "Timing is confirmed in your proposal, subject to engineering, permits, utility approvals and equipment availability. We do not promise a universal installation date." },
  { q: "What does German engineering mean here?", a: "NullPunkt Solar is the wholly-owned Canadian subsidiary of SMB Solartechnik GmbH, installing integrated systems in Germany since 2024. We bring that design and commissioning experience to Calgary with Alberta-licensed electrical partners." },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const CalculatorPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Solar System Size Calculator Calgary | NullPunkt Solar"
        description="Estimate your Calgary solar system size and production. Review roof suitability, optional storage and current financing information; request an individual quote."
        path="/calculator"
        jsonLd={faqJsonLd}
      />
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 border-b border-border">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-minimal text-lime mb-6">Calgary · Alberta · Canada</p>
            <h1 className="text-5xl md:text-7xl font-light text-architectural mb-8">
              Solar system sizing <span className="lime-underline">for Calgary.</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed font-light">
              Estimate a starting system size, then let us review your actual annual consumption and roof. Your installation cost and financial case are calculated in an individual proposal.
            </p>
          </div>
        </div>
      </section>

      {/* Facts strip */}
      <section className="py-16 border-b border-border bg-card">
        <div className="container mx-auto px-6 max-w-7xl">
          <p className="text-minimal text-lime mb-8">Calgary at a glance</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {calgaryFacts.map((f) => (
              <div key={f.unit}>
                <p className="text-5xl md:text-6xl font-light text-architectural mb-2">{f.stat}</p>
                <p className="text-sm tracking-wider uppercase text-lime mb-3">{f.unit}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section id="calculator" className="py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="max-w-2xl mb-12">
            <p className="text-minimal text-lime mb-4">The calculator</p>
            <h2 className="text-4xl md:text-5xl font-light text-architectural mb-6">
              A starting point, not a final design.
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              This bill-based approximation is not a savings model. We confirm size using 12 months of electricity use in kWh and a property assessment.
            </p>
          </div>
          <SolarCalculator />
        </div>
      </section>

      <PriceTrust />


      {/* Incentives */}
      <section className="py-24 border-t border-border bg-card">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="max-w-2xl mb-12">
            <p className="text-minimal text-lime mb-4">Programs and retailer options</p>
            <h2 className="text-4xl md:text-5xl font-light text-architectural mb-6">
              Check eligibility before budgeting.
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Financing, tax credits and export credits are different things. None is assumed approved in your quote. Information checked November 4, 2026; terms may change.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {incentives.map((inc) => (
              <div key={inc.name} className="card-raised p-8">
                <p className="text-minimal text-lime mb-3">{inc.amount}</p>
                <h3 className="text-xl font-light mb-3">{inc.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{inc.detail}</p>
                {inc.source && <a href={inc.source} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-sm text-lime underline">Check the City of Calgary CEIP page</a>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Climate */}
      <section className="py-24 border-t border-border">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="max-w-2xl mb-12">
            <p className="text-minimal text-lime mb-4">Built for Alberta weather</p>
            <h2 className="text-4xl md:text-5xl font-light text-architectural mb-6">
              Roof suitability comes before panel selection.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {climateChallenges.map((c) => (
              <div key={c.title} className="border-l-2 border-lime/30 pl-6 py-2">
                <h3 className="text-2xl font-light mb-3">{c.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 border-t border-border bg-card">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="max-w-2xl mb-12">
            <p className="text-minimal text-lime mb-4">FAQ</p>
            <h2 className="text-4xl md:text-5xl font-light text-architectural mb-6">
              The questions Calgary homeowners actually ask.
            </h2>
          </div>
          <div className="divide-y divide-border max-w-4xl">
            {faqs.map((f) => (
              <details key={f.q} className="group py-6 cursor-pointer">
                <summary className="flex items-center justify-between gap-6 list-none">
                  <h3 className="text-xl font-light flex-1">{f.q}</h3>
                  <span className="text-lime text-2xl transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="text-muted-foreground leading-relaxed mt-4 pr-12">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-border">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-light text-architectural mb-6">
            Ready to talk to a real engineer?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto">
            We're now open in Calgary. Book a free site assessment to turn your estimate into a tailored
            system design and a fixed-price proposal.
          </p>
          <Link to="/contact" className="btn-lime">Reserve your free site visit →</Link>
        </div>
      </section>
      <SiteFooter />

    </div>
  );
};

export default CalculatorPage;
