import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { supabase } from "@/integrations/supabase/client";

// Fallback images
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
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [projects, setProjects] = useState<Project[]>([]);
  const [storageImages, setStorageImages] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  const categories = ["ALL", "RESIDENTIAL", "COMMERCIAL", "HEAT PUMP"];

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("Error loading projects:", error);
      setLoading(false);
      return;
    }

    setProjects(data || []);

    // Load storage images
    if (data) {
      const imageIds = [...new Set(data.map((p) => p.image_id))];
      await loadStorageImages(imageIds);
    }

    setLoading(false);
  };

  const loadStorageImages = async (imageIds: string[]) => {
    const loadedImages: Record<string, string> = {};

    for (const id of imageIds) {
      for (const ext of ["jpg", "png", "webp"]) {
        const { data } = supabase.storage
          .from("project-images")
          .getPublicUrl(`${id}.${ext}`);

        try {
          const response = await fetch(data.publicUrl, { method: "HEAD" });
          if (response.ok) {
            loadedImages[id] = data.publicUrl;
            break;
          }
        } catch {
          // Continue
        }
      }
    }

    setStorageImages(loadedImages);
  };

  const getImageUrl = (imageId: string) => {
    return storageImages[imageId] || fallbackImages[imageId] || projectSolar1Fallback;
  };

  const filteredProjects = activeCategory === "ALL" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h1 className="text-6xl md:text-8xl font-light text-architectural mb-8">
                OUR PROJECTS
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl">
                A selection of our solar and heat pump installations across Southern Alberta. 
                Each project demonstrates our commitment to German precision and transparent ROI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Categories */}
      <section className="pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-8 justify-center md:justify-start">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`text-minimal transition-colors duration-300 relative group ${
                    activeCategory === category 
                      ? "text-foreground" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {category}
                  <span className={`absolute bottom-0 left-0 w-full h-px bg-foreground transition-transform duration-300 origin-left ${
                    activeCategory === category 
                      ? "scale-x-100" 
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}></span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-32">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="grid md:grid-cols-2 gap-16 lg:gap-20">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-[60vh] bg-muted rounded"></div>
                    <div className="mt-8 space-y-4">
                      <div className="h-6 bg-muted rounded w-3/4"></div>
                      <div className="h-4 bg-muted rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-16 lg:gap-20">
                {filteredProjects.map((project) => (
                  <div key={project.id} className="group cursor-pointer">
                    <div className="relative overflow-hidden mb-8">
                      <img 
                        src={getImageUrl(project.image_id)} 
                        alt={project.title}
                        className="w-full h-[60vh] object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Project Category Badge */}
                      <div className="absolute top-6 left-6 bg-background/90 backdrop-blur-sm px-4 py-2">
                        <span className="text-minimal text-foreground">
                          {project.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-2xl lg:text-3xl font-light text-architectural mb-2 group-hover:text-muted-foreground transition-colors duration-500">
                          {project.title}
                        </h3>
                        <p className="text-minimal text-muted-foreground">
                          {project.location}
                        </p>
                      </div>
                      
                      <p className="text-muted-foreground leading-relaxed">
                        {project.description}
                      </p>
                      
                      {(project.specs || project.roi) && (
                        <div className="flex gap-8 pt-4 border-t border-border">
                          {project.specs && (
                            <div>
                              <p className="text-minimal text-muted-foreground mb-1">SYSTEM</p>
                              <p className="text-foreground">{project.specs}</p>
                            </div>
                          )}
                          {project.roi && (
                            <div>
                              <p className="text-minimal text-muted-foreground mb-1">ROI</p>
                              <p className="text-foreground">{project.roi}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 bg-muted">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-light text-architectural mb-8">
              Ready to Reach
              <br />
              Point Zero?
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              Let's calculate your ROI and design the perfect energy system for your home or business.
            </p>
            <a 
              href="/contact" 
              className="inline-block text-minimal text-foreground hover:text-muted-foreground transition-colors duration-300 relative group"
            >
              GET A FREE QUOTE
              <span className="absolute bottom-0 left-0 w-full h-px bg-foreground group-hover:bg-muted-foreground transition-colors duration-300"></span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Work;
