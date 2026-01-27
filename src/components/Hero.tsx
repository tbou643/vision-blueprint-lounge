import heroImage from "@/assets/hero-header.png";

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 hero-overlay" />
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
        <p className="text-lg md:text-xl text-white/80 font-light tracking-widest mb-6 reveal">
          GERMAN PRECISION — ZERO EMISSIONS
        </p>
        
        {/* Crosshair Symbol */}
        <div className="flex items-center justify-center mb-6 reveal">
          <svg 
            viewBox="0 0 80 80" 
            className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {/* Outer circle */}
            <circle cx="40" cy="40" r="30" />
            {/* Crosshair lines */}
            <line x1="40" y1="5" x2="40" y2="75" />
            <line x1="5" y1="40" x2="75" y2="40" />
          </svg>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white text-architectural mb-8 reveal">
          NULLPUNKT
          <br />
          <span className="text-4xl md:text-5xl lg:text-6xl">ENERGY INC.</span>
        </h1>
        <p className="text-xl md:text-2xl text-white/80 font-light tracking-wide max-w-3xl mx-auto reveal-delayed">
          Premium solar systems and heat pumps built to German standards. 
          Your trusted partner for sustainable energy in Southern Alberta.
        </p>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 reveal-delayed">
        <div className="w-px h-16 bg-white/40" />
        <div className="text-minimal text-white/60 mt-4 rotate-90 origin-center">
          SCROLL
        </div>
      </div>
    </section>
  );
};

export default Hero;
