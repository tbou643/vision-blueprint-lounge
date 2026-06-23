import Navigation from "@/components/Navigation";
import SiteFooter from "@/components/SiteFooter";
import SolarCalculator from "@/components/SolarCalculator";
import { Link } from "react-router-dom";

const calgaryFacts = [
  { stat: "333", unit: "sunny days / year", note: "More than Miami. Calgary is one of Canada's top solar cities." },
  { stat: "1,292", unit: "kWh / kWp / year", note: "Specific yield — beats Berlin (~1,050) and most of Europe." },
  { stat: "+8%", unit: "winter cold bonus", note: "Cold panels are efficient panels. Alberta winters help." },
  { stat: "~450 g", unit: "CO₂ / kWh grid", note: "Alberta's grid carbon intensity (AESO, 2024 after the last coal unit converted to natural gas) — every solar kWh still meaningfully cleaner than the grid mix." },
];

const incentives = [
  {
    name: "Solar Club (UTILITYnet retailer program)",
    amount: "~35 ¢/kWh export",
    detail:
      "An Alberta-only retailer rate structure offered through UTILITYnet that pays roughly 35 ¢/kWh for exported solar and charges around 8.4 ¢/kWh for consumption (verified May 2026 — rates set monthly). It dramatically improves payback for systems that export a meaningful share of production. Not always the best fit — when self-consumption is very high (e.g. big battery + heat pump), a standard retailer can win. We model both in your proposal.",
  },
  {
    name: "Clean Energy Improvement Program (CEIP)",
    amount: "0% PACE financing",
    detail:
      "$0-upfront property-assessed clean energy financing for residential and commercial owners in 26+ participating Alberta municipalities (Calgary, Edmonton, Lethbridge, Banff and more). Repaid through the property tax bill over up to 20 years; obligation transfers with the property if sold (Alberta Municipalities).",
  },
  {
    name: "Clean Technology Investment Tax Credit",
    amount: "30% refundable",
    detail:
      "Federal refundable tax credit on the capital cost of new solar PV and battery storage for commercial, agricultural, and developer-scale projects in Canada. Available through Dec 31, 2034 (CRA / NRCan).",
  },
  {
    name: "Alberta Micro-Generation Regulation",
    amount: "Net billing",
    detail:
      "Small micro-generators under 150 kW are credited monthly at their retail energy rate for surplus exported to the grid. Systems from 150 kW to 5 MW are settled hourly. Administered by the Alberta Utilities Commission.",
  },
  {
    name: "Agrivoltaics & cold-climate research funding",
    amount: "Project-based",
    detail:
      "Federal NRCan and Alberta-administered programs (RDAR, ERA) co-fund agri-PV and cold-climate solar demonstrations. We help eligible farms and developers structure applications.",
  },
  {
    name: "Canada Greener Homes Loan",
    amount: "Closed Oct 2025",
    detail:
      "The $40,000 interest-free federal loan closed to new applications on October 2, 2025. Existing approved loans are unaffected. We're tracking what replaces it federally and will flag any new residential program the moment it opens.",
  },
];


const climateChallenges = [
  {
    title: "Hail",
    body:
      "Calgary sits in Canada's hail capital. We spec only IEC 61215 Class 3+ panels — the same panels rated for German alpine installations — and back them with our own workmanship warranty.",
  },
  {
    title: "Snow load & shedding",
    body:
      "Alberta Building Code ground snow loads near Calgary reach 1.0 kPa. We design at 30°+ tilts with frameless or low-edge frames so snow sheds within hours of sunrise rather than sitting for weeks.",
  },
  {
    title: "Chinooks & thermal cycling",
    body:
      "−25 °C to +15 °C in 12 hours is normal. We use UV-stabilised cabling, glass-glass modules where applicable, and torque-checked mounting — every joint engineered for ~80 K thermal swings.",
  },
  {
    title: "Deregulated electricity market",
    body:
      "Alberta's energy-only market means rates swing 6–25 ¢/kWh. A correctly sized battery shifts your consumption to avoid peaks — turning volatility from a risk into a savings lever.",
  },
];

const faqs = [
  {
    q: "Is solar actually worth it in Calgary?",
    a: "Yes — and the numbers are better than most Canadians assume. Calgary's solar yield (1,292 kWh/kWp) is on par with Northern Spain. Combined with Alberta's high all-in residential rate (~16.5 ¢/kWh), simple paybacks of 8–11 years are realistic for a properly engineered system.",
  },
  {
    q: "What size system do I need?",
    a: "For an average Calgary single-family home (~8,500 kWh/year), 7–10 kWp covers most consumption. Add a battery if you want to ride through peak pricing or outages. Our calculator above gives you a properly-sized starting point in under a minute.",
  },
  {
    q: "How do hail and snow affect my system?",
    a: "Our modules are hail-rated to 35 mm at 27 m/s (IEC 61215 Class 3). We mount at 30°+ tilts so snow sheds rapidly. Our German parent company has not had to replace a panel due to weather on its installations to date — and we engineer the Alberta systems to the same spec.",
  },
  {
    q: "Can I go fully off-grid in Alberta?",
    a: "Possible for acreages and farms, but rarely cost-optimal. The Micro-Generation Regulation makes a grid-tied + battery system more economical for nearly every site. We'll model both scenarios honestly during your site visit.",
  },
  {
    q: "How long does installation take?",
    a: "For a typical residential system: 1 day on the roof, 1 day for electrical + HEMS commissioning. Permitting and ENMAX/EPCOR interconnection adds 4–8 weeks depending on the utility's queue.",
  },
  {
    q: "Why German engineering for Alberta?",
    a: "Germany installs over 1 GW of residential solar every month — they've already solved the integration problems (battery + EV + heat pump + grid) Canada is just starting to face. We bring that playbook to Calgary, with local crews and Canadian warranty coverage.",
  },
];

const CalculatorPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 border-b border-border">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-minimal text-lime mb-6">Calgary · Alberta · Canada</p>
            <h1 className="text-5xl md:text-7xl font-light text-architectural mb-8">
              How much sun is your <span className="lime-underline">roof wasting?</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed font-light">
              Calgary gets more solar than Berlin, Frankfurt, or Munich. Run the same engineering math our German parent
              company has used on hundreds of European installations — calibrated for Alberta's grid, weather, and tariffs.
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
              Engineering math, not marketing fluff.
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Built on Calgary's real irradiance data, Alberta's all-in retail rate, and the Micro-Generation export
              credit — grounded on the same numbers our engineers use.
            </p>
          </div>
          <SolarCalculator />
        </div>
      </section>

      {/* Incentives */}
      <section className="py-24 border-t border-border bg-card">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="max-w-2xl mb-12">
            <p className="text-minimal text-lime mb-4">Money on the table</p>
            <h2 className="text-4xl md:text-5xl font-light text-architectural mb-6">
              Alberta & federal incentives, as of 2026.
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We don't sell the rebate — we engineer the system. But every NullPunkt proposal includes a stacked
              incentive breakdown so you see your real, after-rebate cost.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {incentives.map((inc) => (
              <div key={inc.name} className="card-raised p-8">
                <p className="text-minimal text-lime mb-3">{inc.amount}</p>
                <h3 className="text-xl font-light mb-3">{inc.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{inc.detail}</p>
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
              Calgary breaks ordinary solar systems. Ours are over-engineered for it.
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
            Founding slots for Summer 2026 are limited. Reserve yours — we'll prioritise your site visit when we open
            Calgary installations.
          </p>
          <Link to="/contact" className="btn-lime">Join the founding waitlist →</Link>
        </div>
      </section>
      <SiteFooter />

    </div>
  );
};

export default CalculatorPage;
