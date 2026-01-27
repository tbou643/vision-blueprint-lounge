import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

// Fallback images
import projectSolar1Fallback from "@/assets/project-solar-1.jpg";
import projectSolar2Fallback from "@/assets/project-solar-2.jpg";
import projectHeatpumpFallback from "@/assets/project-heatpump.jpg";

interface Project {
  id: string;
  fallback: string;
  title: string;
  location: string;
  description: string;
}

const Portfolio = () => {
  const [images, setImages] = useState<Record<string, string>>({});

  const projects: Project[] = [
    {
      id: "project-solar-1",
      fallback: projectSolar1Fallback,
      title: "RESIDENTIAL SOLAR SYSTEM",
      location: "CALGARY, 2024",
      description: "12kW premium solar installation with integrated battery storage. Achieving 85% energy self-sufficiency for a family of four."
    },
    {
      id: "project-solar-2",
      fallback: projectSolar2Fallback,
      title: "COMMERCIAL INSTALLATION",
      location: "SOUTHERN ALBERTA, 2024",
      description: "Large-scale 150kW commercial solar array with advanced monitoring. ROI achieved within 6 years through optimal system design."
    },
    {
      id: "project-heatpump",
      fallback: projectHeatpumpFallback,
      title: "INTEGRATED HEAT PUMP SYSTEM",
      location: "CALGARY, 2024",
      description: "Complete home energy solution combining solar PV with an efficient heat pump system. True Nullpunkt: production equals consumption."
    }
  ];

  useEffect(() => {
    const loadStorageImages = async () => {
      const loadedImages: Record<string, string> = {};

      for (const project of projects) {
        const { data } = supabase.storage
          .from("project-images")
          .getPublicUrl(`${project.id}.jpg`);

        // Check if image actually exists
        try {
          const response = await fetch(data.publicUrl, { method: "HEAD" });
          if (response.ok) {
            loadedImages[project.id] = data.publicUrl;
          }
        } catch {
          // Image doesn't exist, will use fallback
        }
      }

      setImages(loadedImages);
    };

    loadStorageImages();
  }, []);

  const getImageUrl = (project: Project) => {
    return images[project.id] || project.fallback;
  };

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
            {projects.map((project, index) => (
              <div key={index} className="group">
                <div className="relative overflow-hidden">
                  <img 
                    src={getImageUrl(project)} 
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
