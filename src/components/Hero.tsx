import heroImage from "@/assets/hero-header.png";
import logoWhite from "@/assets/logo-white.png";

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
        {/* Logo */}
        <img 
          src={logoWhite} 
          alt="Nullpunkt Solar Energy Inc. - German Precision - Zero Emissions" 
          className="w-full max-w-2xl lg:max-w-4xl mx-auto mb-10 reveal"
        />
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
