import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { supabase } from "@/integrations/supabase/client";

import projectSolar1Fallback from "@/assets/project-solar-1.jpg";
import projectSolar2Fallback from "@/assets/project-solar-2.jpg";
import projectHeatpumpFallback from "@/assets/project-heatpump.jpg";

interface Project {
  id: string;
  image_id: string;
  title: string;
  location: string;
  category: string;
  description: string;
  specs: string | null;
  roi: string | null;
}

const fallbackImages: Record<string, string> = {
  "project-solar-1": projectSolar1Fallback,
  "project-solar-2": projectSolar2Fallback,
  "project-heatpump": projectHeatpumpFallback,
};

const Work = () => {
  const [active, setActive] = useState("ALL");
  const [projects, setProjects] = useState<Project[]>([]);
  const [imgs, setImgs] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  const categories = ["ALL", "RESIDENTIAL", "COMMERCIAL", "HEAT PUMP"];

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("projects")
        .select("*")
        .order("sort_order", { ascending: true });
      const list = data || [];
      setProjects(list);
      const ids = [...new Set(list.map((p) => p.image_id))];
      const loaded: Record<string, string> = {};
      for (const id of ids) {
        for (const ext of ["jpg", "png", "webp"]) {
          const { data: pub } = supabase.storage.from("project-images").getPublicUrl(`${id}.${ext}`);
          try {
            const r = await fetch(pub.publicUrl, { method: "HEAD" });
            if (r.ok) { loaded[id] = pub.publicUrl; break; }
          } catch {}
        }
      }
      setImgs(loaded);
      setLoading(false);
    })();
  }, []);

  const imgUrl = (id: string) => imgs[id] || fallbackImages[id] || projectSolar1Fallback;
  const filtered = active === "ALL" ? projects : projects.filter((p) => p.category === active);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-40 pb-16 relative">
        <div className="absolute inset-x-0 top-0 h-[50vh] glow-radial pointer-events-none" />
        <div className="container mx-auto px-6 relative">
          <div className="max-w-5xl">
            <p className="text-minimal text-lime mb-6">Reference projects</p>
            <h1 className="text-5xl md:text-7xl font-light text-architectural mb-8">
              Twenty years of installs.
              <br />
              <span className="text-muted-foreground">Calgary book opening 2026.</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Selected references from our European parent company. Alberta-specific
              installations will be added here as we commission them.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-6">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`text-xs tracking-[0.2em] uppercase font-medium transition-colors duration-300 relative ${
                  active === c ? "text-lime" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
                {active === c && <span className="absolute -bottom-2 left-0 right-0 h-px bg-lime" />}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-32">
        <div className="container mx-auto px-6">
          {loading ? (
            <div className="grid md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-[60vh] bg-card animate-pulse rounded-2xl" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="card-raised p-16 text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-lime/40 bg-lime/10 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
                <span className="text-[11px] tracking-[0.2em] uppercase text-lime font-medium">
                  Booking founding installs
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-architectural mb-4">
                Our first Calgary projects are scheduled for 2026.
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Want to be one of them? Reference projects from our European parent are
                available on request — and we'll happily walk you through a comparable build.
              </p>
              <Link to="/contact" className="btn-lime">Book a site visit →</Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {filtered.map((p) => (
                <article key={p.id} className="group card-raised overflow-hidden">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={imgUrl(p.image_id)}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                    <div className="absolute top-6 left-6 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur border border-border">
                      <span className="text-[10px] tracking-[0.2em] uppercase text-lime font-medium">
                        {p.category}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <p className="text-minimal text-muted-foreground mb-2">{p.location}</p>
                      <h3 className="text-2xl font-semibold">{p.title}</h3>
                    </div>
                  </div>
                  <div className="p-8 space-y-5">
                    <p className="text-muted-foreground leading-relaxed">{p.description}</p>
                    {(p.specs || p.roi) && (
                      <div className="flex gap-8 pt-4 border-t border-border">
                        {p.specs && (
                          <div>
                            <p className="text-minimal text-muted-foreground mb-1">System</p>
                            <p className="text-foreground">{p.specs}</p>
                          </div>
                        )}
                        {p.roi && (
                          <div>
                            <p className="text-minimal text-muted-foreground mb-1">Payback</p>
                            <p className="text-lime">{p.roi}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-24 bg-card border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-light text-architectural mb-6">
            Be one of our first Alberta installs.
          </h2>
          <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
            Founding customers receive priority engineering slots and a direct line to the team.
          </p>
          <Link to="/contact" className="btn-lime">Get your free quote →</Link>
        </div>
      </section>
    </div>
  );
};

export default Work;
