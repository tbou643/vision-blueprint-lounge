import Navigation from "@/components/Navigation";

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <section className="pt-32 pb-32 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-20">
              <div>
                <h1 className="text-minimal text-muted-foreground mb-4">GET IN TOUCH</h1>
                <h2 className="text-4xl md:text-6xl font-light text-architectural mb-12">
                  Ready to Reach
                  <br />
                  Point Zero?
                </h2>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-minimal text-muted-foreground mb-2">EMAIL</h3>
                    <a href="mailto:info@nullpunkt.energy" className="text-xl hover:text-muted-foreground transition-colors duration-300">
                      info@nullpunkt.energy
                    </a>
                  </div>
                  
                  <div>
                    <h3 className="text-minimal text-muted-foreground mb-2">PHONE</h3>
                    <a href="tel:+14035551234" className="text-xl hover:text-muted-foreground transition-colors duration-300">
                      +1 (403) 555-1234
                    </a>
                  </div>
                  
                  <div>
                    <h3 className="text-minimal text-muted-foreground mb-2">OFFICE</h3>
                    <address className="text-xl not-italic">
                      Nullpunkt Energy Inc.
                      <br />
                      Calgary, Alberta
                      <br />
                      Canada
                    </address>
                  </div>
                </div>
              </div>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-minimal text-muted-foreground mb-6">FREE CONSULTATION</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    Every project starts with a free, no-obligation consultation. We'll analyze your 
                    energy consumption, roof potential, and calculate your exact ROI with German precision.
                  </p>
                  <ul className="space-y-3">
                    <li className="text-muted-foreground flex items-center">
                      <span className="w-1.5 h-1.5 bg-foreground rounded-full mr-3" />
                      Detailed Energy Analysis
                    </li>
                    <li className="text-muted-foreground flex items-center">
                      <span className="w-1.5 h-1.5 bg-foreground rounded-full mr-3" />
                      Custom System Design
                    </li>
                    <li className="text-muted-foreground flex items-center">
                      <span className="w-1.5 h-1.5 bg-foreground rounded-full mr-3" />
                      Transparent ROI Calculation
                    </li>
                    <li className="text-muted-foreground flex items-center">
                      <span className="w-1.5 h-1.5 bg-foreground rounded-full mr-3" />
                      No Hidden Costs
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-minimal text-muted-foreground mb-6">FOLLOW US</h3>
                  <div className="space-y-4">
                    <a href="#" className="block text-xl hover:text-muted-foreground transition-colors duration-300">
                      Instagram
                    </a>
                    <a href="#" className="block text-xl hover:text-muted-foreground transition-colors duration-300">
                      LinkedIn
                    </a>
                    <a href="#" className="block text-xl hover:text-muted-foreground transition-colors duration-300">
                      Facebook
                    </a>
                  </div>
                </div>
                
                <div className="pt-12 border-t border-border">
                  <p className="text-sm text-muted-foreground italic">
                    Proudly serving Calgary and Southern Alberta with premium German-engineered 
                    solar and heat pump solutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
