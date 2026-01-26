import Navigation from "@/components/Navigation";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <section className="pt-32 pb-32 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="mb-24">
              <h1 className="text-minimal text-muted-foreground mb-4">ABOUT NULLPUNKT</h1>
              <h2 className="text-4xl md:text-6xl font-light text-architectural mb-12">
                German Precision
                <br />
                <span className="text-muted-foreground">Zero Emissions</span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
                "Nullpunkt" is German for Point Zero — the coordinate origin (0,0) on a technical 
                blueprint. It represents the perfect intersection of Solar Power and Heat Pump 
                Efficiency. We combine these technologies with German precision to drive your 
                emissions and costs to exactly that mark: Point Zero.
              </p>
            </div>

            {/* Origin Story */}
            <div className="grid md:grid-cols-2 gap-20 mb-24">
              <div>
                <h3 className="text-minimal text-muted-foreground mb-6">OUR ORIGIN</h3>
                <div className="space-y-6">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Nullpunkt Energy Inc. is a spin-off from our successful parent company in 
                    Southern Germany, where we have been leading the renewable energy market since 2008.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Germany has the world's most mature and innovative solar market. We bring that 
                    expertise, those products, and that uncompromising quality directly to Calgary 
                    and Southern Alberta.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Our team includes German-trained craftsmen who ensure every installation meets 
                    the highest European standards. We don't just sell systems — we engineer 
                    complete energy solutions.
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-minimal text-muted-foreground mb-6">THE TECHNOLOGICAL SYNERGY</h3>
                <div className="space-y-6">
                  <div className="border-l-2 border-architectural pl-6">
                    <h4 className="text-lg font-medium mb-2">The X-Axis: Production</h4>
                    <p className="text-muted-foreground">Solar PV generates clean electricity from Alberta's abundant sunshine.</p>
                  </div>
                  <div className="border-l-2 border-architectural pl-6">
                    <h4 className="text-lg font-medium mb-2">The Y-Axis: Efficiency</h4>
                    <p className="text-muted-foreground">Heat Pumps utilize that electricity with maximum thermodynamic efficiency.</p>
                  </div>
                  <div className="border-l-2 border-architectural pl-6">
                    <h4 className="text-lg font-medium mb-2">The Intersection (0,0)</h4>
                    <p className="text-muted-foreground">Where these technologies meet perfectly, you reach the Nullpunkt — production equals consumption.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* The Three Zeros */}
            <div className="mb-24">
              <h3 className="text-minimal text-muted-foreground mb-6">THE POINT ZERO PROMISE</h3>
              <div className="grid md:grid-cols-3 gap-12">
                <div className="text-center p-8 border border-border">
                  <h4 className="text-2xl font-light text-architectural mb-4">Zero Emissions</h4>
                  <p className="text-muted-foreground">Complete decarbonization of your home's energy ecosystem.</p>
                </div>
                <div className="text-center p-8 border border-border">
                  <h4 className="text-2xl font-light text-architectural mb-4">Zero Reliance</h4>
                  <p className="text-muted-foreground">Independence from the grid and volatile gas prices.</p>
                </div>
                <div className="text-center p-8 border border-border">
                  <h4 className="text-2xl font-light text-architectural mb-4">Zero Worry</h4>
                  <p className="text-muted-foreground">German engineering reliability and transparent calculations.</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-border">
              <div>
                <h4 className="text-minimal text-muted-foreground mb-2">GERMAN HERITAGE</h4>
                <p className="text-3xl font-light">Since 2008</p>
              </div>
              <div>
                <h4 className="text-minimal text-muted-foreground mb-2">INSTALLATIONS</h4>
                <p className="text-3xl font-light">500+</p>
              </div>
              <div>
                <h4 className="text-minimal text-muted-foreground mb-2">MW INSTALLED</h4>
                <p className="text-3xl font-light">15+</p>
              </div>
              <div>
                <h4 className="text-minimal text-muted-foreground mb-2">WARRANTY CLAIMS</h4>
                <p className="text-3xl font-light">&lt; 0.5%</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
