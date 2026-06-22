import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-header.png";
import Logo from "./Logo";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 hero-overlay" />
      <div className="absolute inset-x-0 top-0 h-[60vh] glow-radial pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6 pt-24">
        {/* Eyebrow */}
        <div className="reveal inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
          <span className="text-[11px] tracking-[0.22em] uppercase text-white/80 font-medium">
            Calgary · Southern Alberta
          </span>
        </div>

        {/* Logo */}
        <Logo
          variant="light"
          showTagline={false}
          className="reveal w-full max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto mb-10"
        />

        {/* Headline */}
        <h1 className="reveal-delayed text-4xl md:text-6xl lg:text-7xl font-light text-architectural text-white mb-8">
          Solar &amp; heat pumps,
          <br />
          engineered to a <span className="lime-underline">single point</span>.
        </h1>

        <p className="reveal-delayed-2 text-lg md:text-xl text-white/75 font-light max-w-2xl mx-auto mb-12 leading-relaxed">
          We design integrated PV, battery and heat pump systems for Alberta homes —
          built on twenty years of European engineering, now landing in Calgary.
        </p>

        {/* CTAs */}
        <div className="reveal-delayed-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/contact" className="btn-lime">
            Get your free quote
            <span aria-hidden>→</span>
          </Link>
          <Link to="/services" className="btn-ghost !text-white !border-white/30 hover:!border-lime hover:!text-lime">
            Explore the system
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 reveal-delayed-2">
        <span className="text-[10px] tracking-[0.3em] uppercase text-white/50">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
