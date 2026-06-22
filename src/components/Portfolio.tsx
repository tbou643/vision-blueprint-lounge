import { Link } from "react-router-dom";

const milestones = [
  {
    label: "Now",
    title: "Founding waitlist open",
    body: "First 25 Calgary homes receive priority engineering slots and founding-customer pricing.",
  },
  {
    label: "Spring 2026",
    title: "Calgary HQ commissioned",
    body: "Local crew assembled, warehouse stocked, supplier logistics from SMB Solartechnik transferred.",
  },
  {
    label: "Summer 2026",
    title: "First Alberta installations",
    body: "Residential integrated systems go live across Calgary metro — fully monitored from day one.",
  },
  {
    label: "2027 →",
    title: "Commercial & developer rollout",
    body: "B2B partnerships activated in Red Deer, Lethbridge corridor and new-construction subdivisions.",
  },
];

const Portfolio = () => {
  return (
    <section id="launch" className="relative py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <p className="text-minimal text-lime mb-4">Launch roadmap</p>
              <h2 className="text-4xl md:text-6xl font-light text-architectural">
                NullPunkt Solar,
                <br />
                <span className="text-muted-foreground">coming to Calgary.</span>
              </h2>
            </div>
            <p className="text-muted-foreground max-w-md leading-relaxed">
              We're a new operation in Alberta — but not a new company. Our German parent has been
              installing integrated systems for years. Get on the list while founding slots are open.
            </p>
          </div>

          <div className="card-raised p-10 md:p-14 mb-12">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-lime/40 bg-lime/10 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
              <span className="text-[11px] tracking-[0.2em] uppercase text-lime font-medium">
                Founding customer program · Summer 2026
              </span>
            </div>
            <div className="grid md:grid-cols-2 gap-10 items-start">
              <div>
                <h3 className="text-3xl md:text-4xl font-light text-architectural mb-4">
                  Be one of the first 25 integrated systems in Alberta.
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Founding customers receive priority engineering, fixed-price proposals locked in
                  before commissioning, and a direct line to the team that designed the system.
                </p>
              </div>
              <div className="space-y-4">
                {[
                  "Full yield simulation against 20 years of Calgary weather data",
                  "10 kWp PV + 10 kWh storage + HEMS reference systems from CAD $26,000",
                  "Greener Homes Loan: interest-free financing up to CAD $40,000",
                  "Fixed-price proposal — not a back-of-envelope quote",
                ].map((line) => (
                  <div key={line} className="flex gap-3 text-muted-foreground">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-lime flex-shrink-0" />
                    <p>{line}</p>
                  </div>
                ))}
                <div className="pt-4">
                  <Link to="/contact" className="btn-lime">Join the waitlist</Link>
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
