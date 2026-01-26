import Navigation from "@/components/Navigation";

const Services = () => {
  const services = [
    {
      number: "01",
      title: "SOLAR PV SYSTEMS",
      description: "Premium German-engineered photovoltaic systems designed for Southern Alberta's unique climate. We use only proven products from Germany's leading manufacturers, ensuring maximum efficiency and longevity. Our systems are designed with transparent ROI calculations so you know exactly what to expect.",
      features: ["Tier-1 German Modules", "Optimized for Alberta Climate", "25-Year Performance Warranty", "Transparent ROI Analysis"]
    },
    {
      number: "02", 
      title: "BATTERY STORAGE",
      description: "Advanced energy storage solutions that capture surplus solar production for use when you need it most. German-engineered battery systems ensure reliability, safety, and optimal self-consumption rates throughout the year.",
      features: ["German Battery Technology", "Intelligent Load Management", "Backup Power Capability", "10-Year System Warranty"]
    },
    {
      number: "03",
      title: "HEAT PUMP SYSTEMS",
      description: "Efficient heat pump systems that integrate seamlessly with your solar installation. Utilize your energy surplus for heating and cooling, achieving true energy independence with German precision engineering.",
      features: ["Air & Ground Source Options", "COP Rating up to 5.0", "Full PV Integration", "Whisper-Quiet Operation"]
    },
    {
      number: "04",
      title: "SYSTEM INTEGRATION",
      description: "Holistic energy ecosystem design connecting PV, storage, and heat pumps into one intelligent system. The Nullpunkt approach brings all technologies to the intersection point where production meets consumption perfectly.",
      features: ["Smart Energy Management", "Real-Time Monitoring", "Load Optimization", "Future-Ready Design"]
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <section className="pt-32 pb-32 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-20">
              <h1 className="text-minimal text-muted-foreground mb-4">OUR SERVICES</h1>
              <h2 className="text-4xl md:text-6xl font-light text-architectural">
                German Engineering
                <br />
                <span className="text-muted-foreground">Calgary Precision</span>
              </h2>
            </div>
            
            <div className="space-y-20">
              {services.map((service, index) => (
                <div key={index} className="group border-b border-border pb-16 last:border-b-0">
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="flex items-start space-x-6">
                      <span className="text-3xl text-muted-foreground font-light">
                        {service.number}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-light text-architectural group-hover:text-muted-foreground transition-colors duration-500">
                        {service.title}
                      </h3>
                    </div>
                    
                    <div className="md:col-span-2 space-y-6">
                      <p className="text-muted-foreground leading-relaxed text-lg">
                        {service.description}
                      </p>
                      <ul className="grid grid-cols-2 gap-3">
                        {service.features.map((feature, fIndex) => (
                          <li key={fIndex} className="text-sm text-muted-foreground flex items-center">
                            <span className="w-1.5 h-1.5 bg-foreground rounded-full mr-3" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
