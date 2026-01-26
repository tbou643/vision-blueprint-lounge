const Contact = () => {
  return (
    <section id="contact" className="py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20">
            <div>
              <h2 className="text-minimal text-muted-foreground mb-4">GET IN TOUCH</h2>
              <h3 className="text-4xl md:text-6xl font-light text-architectural mb-12">
                Ready to Reach
                <br />
                Point Zero?
              </h3>
              
              <div className="space-y-8">
                <div>
                  <h4 className="text-minimal text-muted-foreground mb-2">EMAIL</h4>
                  <a href="mailto:info@nullpunkt.energy" className="text-xl hover:text-muted-foreground transition-colors duration-300">
                    info@nullpunkt.energy
                  </a>
                </div>
                
                <div>
                  <h4 className="text-minimal text-muted-foreground mb-2">PHONE</h4>
                  <a href="tel:+14035551234" className="text-xl hover:text-muted-foreground transition-colors duration-300">
                    +1 (403) 555-1234
                  </a>
                </div>
                
                <div>
                  <h4 className="text-minimal text-muted-foreground mb-2">OFFICE</h4>
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
                <h4 className="text-minimal text-muted-foreground mb-6">FOLLOW US</h4>
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
                <p className="text-muted-foreground mb-6">
                  We believe in transparency and calculability. Every project begins with a 
                  detailed ROI analysis and ends with a system that performs exactly as promised. 
                  German precision, Calgary service.
                </p>
                <p className="text-sm text-muted-foreground italic">
                  Serving Calgary and Southern Alberta with premium solar and heat pump solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
