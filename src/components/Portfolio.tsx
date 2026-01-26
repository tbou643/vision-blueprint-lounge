import projectSolar1 from "@/assets/project-solar-1.jpg";
import projectSolar2 from "@/assets/project-solar-2.jpg";
import projectHeatpump from "@/assets/project-heatpump.jpg";

const Portfolio = () => {
  const projects = [
    {
      image: projectSolar1,
      title: "RESIDENTIAL SOLAR SYSTEM",
      location: "CALGARY, 2024",
      description: "12kW premium solar installation with integrated battery storage. Achieving 85% energy self-sufficiency for a family of four."
    },
    {
      image: projectSolar2,
      title: "COMMERCIAL INSTALLATION",
      location: "SOUTHERN ALBERTA, 2024",
      description: "Large-scale 150kW commercial solar array with advanced monitoring. ROI achieved within 6 years through optimal system design."
    },
    {
      image: projectHeatpump,
      title: "INTEGRATED HEAT PUMP SYSTEM",
      location: "CALGARY, 2024",
      description: "Complete home energy solution combining solar PV with an efficient heat pump system. True Nullpunkt: production equals consumption."
    }
  ];

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
                    src={project.image} 
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
