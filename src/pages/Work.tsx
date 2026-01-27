import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { supabase } from "@/integrations/supabase/client";

// Fallback images
import projectSolar1Fallback from "@/assets/project-solar-1.jpg";
import projectSolar2Fallback from "@/assets/project-solar-2.jpg";
import projectHeatpumpFallback from "@/assets/project-heatpump.jpg";

interface Project {
  imageId: string;
  fallback: string;
  title: string;
  location: string;
  category: string;
  description: string;
  specs: string;
  roi: string;
}

const Work = () => {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [storageImages, setStorageImages] = useState<Record<string, string>>({});

  const projects: Project[] = [
    {
      imageId: "project-solar-1",
      fallback: projectSolar1Fallback,
      title: "RESIDENTIAL SOLAR SYSTEM",
      location: "CALGARY NW, 2024",
      category: "RESIDENTIAL",
      description: "12kW premium solar installation with integrated battery storage. This family of four now achieves 85% energy self-sufficiency, significantly reducing their utility costs.",
      specs: "12 kW System",
      roi: "6.2 Year ROI"
    },
    {
      imageId: "project-solar-2",
      fallback: projectSolar2Fallback,
      title: "COMMERCIAL INSTALLATION",
      location: "SOUTHERN ALBERTA, 2024",
      category: "COMMERCIAL",
      description: "Large-scale 150kW commercial solar array with advanced monitoring and load management. German engineering ensured optimal ROI.",
      specs: "150 kW System",
      roi: "5.8 Year ROI"
    },
    {
      imageId: "project-heatpump",
      fallback: projectHeatpumpFallback,
      title: "INTEGRATED HEAT PUMP",
      location: "CALGARY SW, 2024",
      category: "HEAT PUMP",
      description: "Complete home energy solution combining solar PV with an efficient air-source heat pump. True Nullpunkt: production meets consumption.",
      specs: "10 kW + Heat Pump",
      roi: "Zero Gas Bills"
    },
    {
      imageId: "project-solar-1",
      fallback: projectSolar1Fallback,
      title: "SUBURBAN RESIDENCE",
      location: "AIRDRIE, 2024",
      category: "RESIDENTIAL",
      description: "8kW residential installation optimized for Alberta's climate. Premium German panels with 25-year performance warranty.",
      specs: "8 kW System",
      roi: "7.1 Year ROI"
    },
    {
      imageId: "project-solar-2",
      fallback: projectSolar2Fallback,
      title: "WAREHOUSE COMPLEX",
      location: "CALGARY SE, 2023",
      category: "COMMERCIAL",
      description: "200kW installation across multiple warehouse rooftops. Comprehensive monitoring system with real-time performance tracking.",
      specs: "200 kW System",
      roi: "5.2 Year ROI"
    },
    {
      imageId: "project-heatpump",
      fallback: projectHeatpumpFallback,
      title: "NET-ZERO HOME",
      location: "OKOTOKS, 2024",
      category: "HEAT PUMP",
      description: "Complete net-zero conversion with ground-source heat pump and 15kW solar array. The ultimate Nullpunkt achievement.",
      specs: "15 kW + GSHP",
      roi: "Net-Zero"
    }
  ];

  useEffect(() => {
    const loadStorageImages = async () => {
      const imageIds = ["project-solar-1", "project-solar-2", "project-heatpump"];
      const loadedImages: Record<string, string> = {};

      for (const id of imageIds) {
        const { data } = supabase.storage
          .from("project-images")
          .getPublicUrl(`${id}.jpg`);

        try {
          const response = await fetch(data.publicUrl, { method: "HEAD" });
          if (response.ok) {
            loadedImages[id] = data.publicUrl;
          }
        } catch {
          // Image doesn't exist in storage
        }
      }

      setStorageImages(loadedImages);
    };

    loadStorageImages();
  }, []);

  const getImageUrl = (project: Project) => {
    return storageImages[project.imageId] || project.fallback;
  };

  const categories = ["ALL", "RESIDENTIAL", "COMMERCIAL", "HEAT PUMP"];

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
            <div className="grid md:grid-cols-2 gap-16 lg:gap-20">
              {filteredProjects.map((project, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="relative overflow-hidden mb-8">
                    <img 
                      src={getImageUrl(project)} 
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
                    
                    <div className="flex gap-8 pt-4 border-t border-border">
                      <div>
                        <p className="text-minimal text-muted-foreground mb-1">SYSTEM</p>
                        <p className="text-foreground">{project.specs}</p>
                      </div>
                      <div>
                        <p className="text-minimal text-muted-foreground mb-1">ROI</p>
                        <p className="text-foreground">{project.roi}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
