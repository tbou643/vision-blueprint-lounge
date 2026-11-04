export const homeFaqs = [
  {
    q: "How much does a solar system cost in Calgary in 2026?",
    a: "We provide individual CAD quotes, not a universal price per watt. Your cost depends on system size, roof condition and layout, electrical upgrades, equipment and optional battery storage. Start with a free roof and consumption assessment. Your proposal separates the equipment, installation scope and GST so you can compare like for like.",
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
    a: "As checked November 4, 2026, Calgary's residential CEIP intake is closed until winter 2026/2027, with estimated interest rates of 6.00%-6.10%, not 0%. Confirm current eligibility and funding with the City. Alberta micro-generation provides energy credits for eligible exports, and Solar Club retailer plans have variable rates and conditions. The Canada Greener Homes Grant and Loan are closed to new applicants. Financing is not a rebate or guaranteed approval.",
  },
  {
    q: "Who does the electrical work?",
    a: "Electrical work is delivered with Alberta-licensed master electrician partners. The electrical scope and responsible partner are confirmed in your project proposal. We work with qualified, licensed trades and apply our German engineering standards to the system design.",
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
        Before you choose solar
        <br />
        <span className="text-muted-foreground">for your Calgary home.</span>
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
