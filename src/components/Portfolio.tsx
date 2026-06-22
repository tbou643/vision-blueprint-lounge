import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

import projectSolar1Fallback from "@/assets/project-solar-1.jpg";
import projectSolar2Fallback from "@/assets/project-solar-2.jpg";
import projectHeatpumpFallback from "@/assets/project-heatpump.jpg";

interface Project {
  id: string;
  image_id: string;
  title: string;
  location: string;
  description: string;
  is_featured: boolean;
}

const fallbackImages: Record<string, string> = {
  "project-solar-1": projectSolar1Fallback,
  "project-solar-2": projectSolar2Fallback,
  "project-heatpump": projectHeatpumpFallback,
};

const Portfolio = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [storageImages, setStorageImages] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("projects")
        .select("*")
        .eq("is_featured", true)
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
            if (r.ok) {
              loaded[id] = pub.publicUrl;
              break;
            }
          } catch {}
        }
      }
      setStorageImages(loaded);
      setLoading(false);
    })();
  }, []);

  const imgUrl = (id: string) => storageImages[id] || fallbackImages[id] || projectSolar1Fallback;

  return (
    <section id="work" className="relative py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <p className="text-minimal text-lime mb-4">Reference work</p>
              <h2 className="text-4xl md:text-6xl font-light text-architectural">
                Built portfolio,
                <br />
                <span className="text-muted-foreground">new market.</span>
              </h2>
            </div>
            <p className="text-muted-foreground max-w-md leading-relaxed">
              The systems below are from our European parent. Our Calgary book is opening
              now — founding customers receive priority engineering slots in 2026.
            </p>
          </div>

          {loading ? (
            <div className="h-[60vh] bg-card animate-pulse rounded-2xl" />
          ) : projects.length === 0 ? (
            <div className="card-raised p-16 text-center">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-lime/40 bg-lime/10 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
                <span className="text-[11px] tracking-[0.2em] uppercase text-lime font-medium">
                  Opening Calgary book — 2026
                </span>
              </div>
              <h3 className="text-3xl md:text-4xl font-light text-architectural mb-4">
                Our first Alberta installations are being scheduled.
              </h3>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Reference projects from our European parent are available on request. Reach
                out for a site walkthrough and a fixed-price proposal.
              </p>
              <Link to="/contact" className="btn-lime">Book a site visit</Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((p) => (
                <article key={p.id} className="group card-raised overflow-hidden">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={imgUrl(p.image_id)}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <p className="text-minimal text-lime mb-2">{p.location}</p>
                      <h3 className="text-2xl font-semibold">{p.title}</h3>
                    </div>
                  </div>
                  <div className="p-8 border-t border-border">
                    <p className="text-muted-foreground leading-relaxed">{p.description}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
