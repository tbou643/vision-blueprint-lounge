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
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white text-architectural mb-8 reveal">
          NULLPUNKT
          <br />
          <span className="text-4xl md:text-5xl lg:text-6xl">ENERGY</span>
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
