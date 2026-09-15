const cards = [
  {
    title: "Transparent $/W pricing",
    body:
      "Most Alberta installers hide their price per watt. We put it first. Compare any quote: divide the price by the system watts.",
  },
  {
    title: "Serious quality",
    body:
      "Tier-1 modules (25-year product warranty), APsystems microinverters, Red Seal certified electrical work.",
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
      <p className="text-minimal text-lime mb-4">Why our price is real</p>
      <h2 className="text-4xl md:text-5xl font-light text-architectural mb-12 max-w-2xl">
        No hidden math. Just the price per watt.
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
        Typical market prices in Calgary range from $2.50 to well over $4.00 per watt. We keep overhead low and pass it
        on - that's the whole trick. To be fully transparent: we are in our launch preparation phase, so right now we
        plan systems, reserve prices and book site visits - no commitment on your side.
      </p>
    </div>
  </section>
);

export default PriceTrust;
