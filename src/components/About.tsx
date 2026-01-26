const About = () => {
  return (
    <section id="about" className="py-32 bg-muted/20">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-minimal text-muted-foreground mb-4">WHY NULLPUNKT</h2>
              <h3 className="text-4xl md:text-6xl font-light text-architectural mb-12">
                The Point Zero Promise
              </h3>
              
              <div className="space-y-8">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  "Nullpunkt" is German for Point Zero — the coordinate origin (0,0) on a technical 
                  blueprint. It represents the perfect intersection of Solar Power and Heat Pump Efficiency.
                </p>
                
                <p className="text-lg text-muted-foreground leading-relaxed">
                  As a spin-off from our successful parent company in Southern Germany, we bring 
                  decades of experience from Europe's most advanced renewable energy market directly 
                  to Calgary. Our German craftsmen ensure every installation meets the highest standards.
                </p>
              </div>
            </div>
            
            <div className="space-y-12">
              <div>
                <h4 className="text-minimal text-muted-foreground mb-6">THE THREE ZEROS</h4>
                <div className="space-y-6">
                  <div className="border-l-2 border-architectural pl-6">
                    <h5 className="text-lg font-medium mb-2">Zero Emissions</h5>
                    <p className="text-muted-foreground">Complete decarbonization of your home energy ecosystem</p>
                  </div>
                  <div className="border-l-2 border-architectural pl-6">
                    <h5 className="text-lg font-medium mb-2">Zero Reliance</h5>
                    <p className="text-muted-foreground">Independence from the grid and volatile energy prices</p>
                  </div>
                  <div className="border-l-2 border-architectural pl-6">
                    <h5 className="text-lg font-medium mb-2">Zero Worry</h5>
                    <p className="text-muted-foreground">German engineering reliability and transparent ROI calculations</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-8 border-t border-border">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-minimal text-muted-foreground mb-2">GERMAN HERITAGE</h4>
                    <p className="text-xl">Since 2008</p>
                  </div>
                  <div>
                    <h4 className="text-minimal text-muted-foreground mb-2">INSTALLATIONS</h4>
                    <p className="text-xl">500+ Systems</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
