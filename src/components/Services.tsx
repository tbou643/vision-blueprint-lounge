const Services = () => {
  const services = [
    {
      number: "01",
      title: "SOLAR PV SYSTEMS",
      description: "Premium German-engineered photovoltaic systems designed for Southern Alberta's unique climate. Maximized ROI with transparent, calculable returns."
    },
    {
      number: "02", 
      title: "BATTERY STORAGE",
      description: "Advanced energy storage solutions that capture surplus solar production. German technology ensures reliability and optimal self-consumption rates."
    },
    {
      number: "03",
      title: "HEAT PUMPS",
      description: "Efficient heat pump systems that integrate seamlessly with your solar installation. Utilize energy surplus for heating and cooling your home."
    },
    {
      number: "04",
      title: "SYSTEM INTEGRATION",
      description: "Holistic energy ecosystem design connecting PV, storage, and heat pumps. The Nullpunkt approach: where production meets consumption perfectly."
    }
  ];

  return (
    <section id="services" className="py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-minimal text-muted-foreground mb-4">OUR SERVICES</h2>
            <h3 className="text-4xl md:text-6xl font-light text-architectural">
              German Engineering
              <br />
              <span className="text-muted-foreground">Calgary Precision</span>
            </h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-x-20 gap-y-16">
            {services.map((service, index) => (
              <div key={index} className="group">
                <div className="flex items-start space-x-6">
                  <span className="text-minimal text-muted-foreground font-medium">
                    {service.number}
                  </span>
                  <div>
                    <h4 className="text-2xl font-light mb-4 text-architectural group-hover:text-muted-foreground transition-colors duration-500">
                      {service.title}
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
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

export default Services;
