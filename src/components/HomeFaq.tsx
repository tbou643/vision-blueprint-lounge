export const homeFaqs = [
  {
    q: "How much does a solar system cost in Calgary in 2026?",
    a: "Our launch price for residential rooftop systems is $1.99 per watt before GST, reservable until September 30, 2026, and $2.20 per watt after that. A typical 7.5 kW system therefore lands around $14,925 before GST. Quotes in the Calgary market commonly range from $2.50 to over $4.00 per watt, so always divide any quote by the system watts before comparing.",
  },
  {
    q: "Does solar actually work in Calgary's climate?",
    a: "Calgary is one of the sunniest major cities in Canada. We size systems on roughly 1,150 kWh of production per installed kWp per year. Cold, clear winter days are good for panel efficiency; snow cover reduces winter output, which is why we size on annual consumption rather than a single month.",
  },
  {
    q: "What size system am I allowed to install in Alberta?",
    a: "Under the Alberta Micro-Generation Regulation your system is sized to your own annual consumption. That is why we start from your power bill instead of your roof area, and why there is no fixed minimum system size.",
  },
  {
    q: "What incentives and financing are available to Calgary homeowners?",
    a: "The City of Calgary's Clean Energy Improvement Program (CEIP) lets eligible homeowners finance the installation through their property tax bill. Surplus production is credited under the Alberta Micro-Generation Regulation, and retailers such as the Solar Club offer higher export rates in summer. Our free 2026 guide walks through what is currently open and what has closed.",
  },
  {
    q: "Who does the electrical work?",
    a: "Every installation is delivered with an Alberta-licensed master electrician partner and Red Seal certified electrical work. We only work with fully licensed trades, no anonymous subcontractor chains.",
  },
  {
    q: "What happens at the free site assessment?",
    a: "We measure your roof, review your actual consumption profile, and give you a fixed-price proposal you can compare line by line. It is free and there is no obligation.",
  },
];

const HomeFaq = () => (
  <section id="faq" className="py-24 border-t border-border bg-background">
    <div className="container mx-auto px-6 max-w-7xl">
      <p className="text-minimal text-lime mb-4">Calgary solar questions</p>
      <h2 className="text-4xl md:text-5xl font-light text-architectural mb-12 max-w-2xl">
        The answers people actually
        <br />
        <span className="text-muted-foreground">search for.</span>
      </h2>
      <div className="grid md:grid-cols-2 gap-px bg-border rounded-2xl overflow-hidden">
        {homeFaqs.map((f) => (
          <div key={f.q} className="bg-background p-8 md:p-10">
            <h3 className="text-lg font-medium mb-3">{f.q}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HomeFaq;
