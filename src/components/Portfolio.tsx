import { useState, useEffect } from "react";
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
    loadProjects();
  }, []);

  const loadProjects = async () => {
    // Load featured projects from database
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("is_featured", true)
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("Error loading projects:", error);
      setLoading(false);
      return;
    }

    setProjects(data || []);

    // Load storage images for these projects
    if (data) {
      const imageIds = [...new Set(data.map((p) => p.image_id))];
      await loadStorageImages(imageIds);
    }

    setLoading(false);
  };

  const loadStorageImages = async (imageIds: string[]) => {
    const loadedImages: Record<string, string> = {};

    for (const id of imageIds) {
      // Try different extensions
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
          // Continue to next extension
        }
      }
    }

    setStorageImages(loadedImages);
  };

  const getImageUrl = (imageId: string) => {
    return storageImages[imageId] || fallbackImages[imageId] || projectSolar1Fallback;
  };

  if (loading) {
    return (
      <section id="work" className="py-32 bg-muted">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse space-y-8">
              <div className="h-8 bg-muted-foreground/20 rounded w-1/4"></div>
              <div className="h-[50vh] bg-muted-foreground/20 rounded"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="work" className="py-32 bg-muted">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-minimal text-muted-foreground mb-4">OUR PROJECTS</h2>
            <h3 className="text-4xl md:text-6xl font-light text-architectural">
              Recent Installations
            </h3>
          </div>
          
          <div className="space-y-32">
            {projects.map((project) => (
              <div key={project.id} className="group">
                <div className="relative overflow-hidden">
                  <img 
                    src={getImageUrl(project.image_id)} 
                    alt={project.title}
                    className="w-full h-[70vh] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                <div className="mt-8 grid md:grid-cols-3 gap-8">
                  <div>
                    <h4 className="text-2xl font-light text-architectural mb-2">
                      {project.title}
                    </h4>
                    <p className="text-minimal text-muted-foreground">
                      {project.location}
                    </p>
                  </div>
                  
                  <div className="md:col-span-2">
                    <p className="text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
