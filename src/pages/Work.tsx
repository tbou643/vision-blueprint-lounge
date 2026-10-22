import Navigation from "@/components/Navigation";
import SiteFooter from "@/components/SiteFooter";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";

const milestones = [
  {
    label: "October 2026",
    title: "Official Calgary launch",
    body: "NullPunkt Solar is officially open in Calgary and accepting solar project enquiries and free site assessment requests.",
  },
  {
    label: "Your project",
    title: "Assessment to commissioning",
    body: "Site assessment, system design and fixed-price proposal, followed by permitting, installation and commissioning. Timing is confirmed individually, subject to approvals and equipment availability.",
  },
  {
    label: "Commercial & agricultural",
    title: "Project enquiries open",
    body: "We welcome enquiries for 15-200 kWp commercial and agricultural systems in Southern Alberta, with scope and schedule agreed for each project.",
  },
  {
    label: "2027",
    title: "Regional expansion",
    body: "Planned expansion into the Red Deer and Lethbridge corridor, alongside developer partnerships. Timing depends on project demand.",
  },
  {
    label: "2028 - 2031",
    title: "Western Canada",
    body: "Selective expansion targeted into British Columbia and Saskatchewan, building toward a meaningful installed base of integrated systems by year five.",
  },
];

const Work = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Now Open in Calgary - NullPunkt Solar Roadmap"
        description="NullPunkt Solar has officially launched in Calgary. Explore our solar project process and plans for Southern Alberta, commercial solar and developer partnerships."
        path="/work"
      />
      <Navigation />

      <section className="pt-40 pb-16 relative">
        <div className="absolute inset-x-0 top-0 h-[50vh] glow-radial pointer-events-none" />
        <div className="container mx-auto px-6 relative">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-lime/40 bg-lime/10 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
              <span className="text-[11px] tracking-[0.2em] uppercase text-lime font-medium">
                Officially launched · Calgary, Alberta
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-light text-architectural mb-8">
              NullPunkt Solar,
              <br />
              <span className="text-muted-foreground">now open in Calgary.</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mb-10">
              We're new to Alberta - not new to the work. NullPunkt Solar is the Canadian subsidiary
              of SMB Solartechnik GmbH, a profitable German solar company with hundreds of completed
              integrated installations. Let's plan your Alberta solar project.
            </p>
            <Link to="/contact" className="btn-lime">Reserve your free site visit →</Link>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <p className="text-minimal text-lime mb-10">Launch roadmap</p>
            <div className="space-y-px bg-border rounded-2xl overflow-hidden">
              {milestones.map((m) => (
                <div key={m.label} className="bg-background p-10 md:p-12 grid md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-3">
                    <p className="text-lime text-sm font-mono font-semibold">{m.label}</p>
                  </div>
                  <div className="md:col-span-9">
                    <h3 className="text-2xl font-semibold mb-2">{m.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{m.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-32">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-px bg-border rounded-2xl overflow-hidden">
            {[
              ["Integrated installs by parent (Germany)", "Hundreds"],
              ["Calgary operations", "Now open"],
            ].map(([k, v]) => (
              <div key={k} className="bg-card p-10 text-center">
                <p className="text-minimal text-muted-foreground mb-3">{k}</p>
                <p className="text-3xl font-semibold text-lime">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-card border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-light text-architectural mb-6">
            Let's build your solar project.
          </h2>
          <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
            Start with a free site assessment, a fixed-price proposal and a
            direct line to the team designing your system.
          </p>
          <Link to="/contact" className="btn-lime">Reserve your free site visit →</Link>
        </div>
      </section>
      <SiteFooter />

    </div>
  );
};

export default Work;
