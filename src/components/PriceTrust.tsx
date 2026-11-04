const cards = [
  {
    title: "A quote for your actual roof",
    body:
      "System size, equipment, installation scope and GST are explained in your proposal. Compare like for like, including any electrical upgrades and optional storage.",
  },
  {
    title: "Serious quality",
    body:
      "Equipment selected for your roof and Canadian requirements, with Alberta-licensed electrical partners. Your proposal identifies the components and applicable manufacturer warranties.",
  },
  {
    title: "German precision",
    body:
      "Engineered to the standards of our German parent company SMB Solartechnik GmbH, which has been installing integrated PV, battery and HEMS systems since 2024.",
  },
];

const PriceTrust = () => (
  <section id="how-we-compare" className="py-24 border-t border-border">
    <div className="container mx-auto px-6 max-w-7xl">
      <p className="text-minimal text-lime mb-4">Why NullPunkt Solar</p>
      <h2 className="text-4xl md:text-5xl font-light text-architectural mb-12 max-w-2xl">
        Clear scope. Local accountability. German precision.
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {cards.map((c) => (
          <div key={c.title} className="card-raised p-8">
            <h3 className="text-xl font-light mb-3">{c.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{c.body}</p>
          </div>
        ))}
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed mt-8 max-w-3xl">
        We are a newly launched Calgary company, not an installer claiming a completed Canadian portfolio.
        Start with a free consultation. We review your roof and consumption before recommending a system
        and confirming the price, scope and installation schedule individually.
      </p>
    </div>
  </section>
);

export default PriceTrust;
