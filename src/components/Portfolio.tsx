import { Link } from "react-router-dom";

const milestones = [
  {
    label: "Now · October 2026",
    title: "Officially launched in Calgary",
    body: "NullPunkt Solar is open for solar project enquiries. Book a free site assessment and receive a proposal tailored to your property and annual electricity consumption.",
  },
  {
    label: "Your first step",
    title: "Site assessment & engineering",
    body: "We assess your roof, review your consumption and model solar production. Your proposal sets out the equipment, scope and price before you decide.",
  },
  {
    label: "Your project",
    title: "Permitting to commissioning",
    body: "Installation timing is confirmed for each project, subject to permitting, utility approvals and equipment availability. Electrical work is delivered with Alberta-licensed partners.",
  },
  {
    label: "2027 →",
    title: "Commercial & developer rollout",
    body: "B2B partnerships targeted in Red Deer, Lethbridge corridor and new-construction subdivisions.",
  },
];

const Portfolio = () => {
  return (
    <section id="launch" className="relative py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <p className="text-minimal text-lime mb-4">Officially launched</p>
              <h2 className="text-4xl md:text-6xl font-light text-architectural">
                NullPunkt Solar,
                <br />
                <span className="text-muted-foreground">now open in Calgary.</span>
              </h2>
            </div>
            <p className="text-muted-foreground max-w-md leading-relaxed">
              We're a new operation in Alberta, backed by SMB Solartechnik GmbH in Germany,
              installing integrated systems since 2024. Let's put that engineering to work on your roof.
            </p>
          </div>

          <div className="card-raised p-10 md:p-14 mb-12">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-lime/40 bg-lime/10 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
              <span className="text-[11px] tracking-[0.2em] uppercase text-lime font-medium">
                Calgary solar projects · Now booking site assessments
              </span>
            </div>
            <div className="grid md:grid-cols-2 gap-10 items-start">
              <div>
                <h3 className="text-3xl md:text-4xl font-light text-architectural mb-4">
                  Your Calgary roof. One integrated solar system.
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Start with a free assessment, a fixed-price proposal before you commit,
                  and a direct line to the team designing your system.
                </p>
              </div>
              <div className="space-y-4">
                {[
                  "Full yield simulation against long-term Calgary irradiance data (NRCan)",
                  "Individual equipment and installation quote, with optional battery storage",
                  "Retailer comparison using current Solar Club terms, not a guaranteed export rate",
                  "Calgary CEIP intake currently closed until winter 2026/2027; financing is not interest-free",
                  "Fixed-price proposal - not a back-of-envelope quote",
                ].map((line) => (
                  <div key={line} className="flex gap-3 text-muted-foreground">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-lime flex-shrink-0" />
                    <p>{line}</p>
                  </div>
                ))}
                <div className="pt-4">
                  <Link to="/contact" className="btn-lime">Reserve your free site visit</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden">
            {milestones.map((m) => (
              <div key={m.label} className="bg-card p-8">
                <p className="text-minimal text-lime mb-3">{m.label}</p>
                <h4 className="text-lg font-semibold mb-3">{m.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
