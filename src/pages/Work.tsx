import Navigation from "@/components/Navigation";
import SiteFooter from "@/components/SiteFooter";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";

const milestones = [
  {
    label: "Q2 2026",
    title: "Pre-launch & permitting",
    body: "Alberta incorporation, micro-generation paperwork, supplier logistics from SMB Solartechnik transferred to Calgary.",
  },
  {
    label: "Summer 2026",
    title: "First Calgary installations",
    body: "Founding-customer residential systems commissioned across Calgary metro — fully monitored from day one.",
  },
  {
    label: "Late 2026",
    title: "First commercial & agri builds",
    body: "20–200 kWp commercial and agricultural installations come online across southern Alberta.",
  },
  {
    label: "2027",
    title: "Regional expansion",
    body: "Red Deer, Lethbridge corridor; developer subdivision rollouts begin.",
  },
  {
    label: "2028 – 2031",
    title: "Western Canada",
    body: "Selective expansion targeted into British Columbia and Saskatchewan, building toward a meaningful installed base of integrated systems by year five.",
  },
];

const Work = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Launch Roadmap — NullPunkt Solar comes to Calgary Summer 2026"
        description="NullPunkt Solar's Calgary launch roadmap: pre-launch and permitting Q2 2026, first installations Summer 2026, commercial builds late 2026, regional expansion 2027+."
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
                Pre-launch · Founding customer program
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-light text-architectural mb-8">
              Coming to Calgary,
              <br />
              <span className="text-muted-foreground">Summer 2026.</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mb-10">
              We're new to Alberta — not new to the work. NullPunkt Solar is the Canadian subsidiary
              of SMB Solartechnik GmbH, a profitable German solar company with hundreds of completed
              integrated installations. Join our founding cohort of Alberta projects.
            </p>
            <Link to="/contact" className="btn-lime">Join the founding waitlist →</Link>
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
              ["Founding Calgary cohort · Summer 2026", "Limited"],
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
            Be one of our first Alberta installs.
          </h2>
          <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
            Founding customers receive priority engineering slots, locked-in fixed pricing, and a
            direct line to the team designing your system.
          </p>
          <Link to="/contact" className="btn-lime">Join the waitlist →</Link>
        </div>
      </section>
      <SiteFooter />

    </div>
  );
};

export default Work;
