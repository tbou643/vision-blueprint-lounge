import logoLight from "@/assets/nullpunkt-logo-light.png.asset.json";
import fallbackLogo from "@/assets/logo-white.png";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark";
  showTagline?: boolean;
}

/**
 * NullPunkt Solar Inc. official wordmark (arc + dot motif, lime on light type).
 * - variant="light" → original artwork, for dark backgrounds
 * - variant="dark"  → type darkened for light backgrounds
 * `showTagline` is kept for API compatibility; the artwork always includes "Solar Inc."
 */
const Logo = ({ className = "", variant = "light" }: LogoProps) => (
  <img
    src={logoLight.url}
    onError={(event) => {
      const image = event.currentTarget;
      if (image.dataset.fallback) return;
      image.dataset.fallback = "true";
      image.src = fallbackLogo;
    }}
    alt="NullPunkt Solar Inc."
    width={2000}
    height={1007}
    className={`${className} ${variant === "dark" ? "invert-[0.9] hue-rotate-180" : ""}`}
    loading="eager"
    decoding="async"
  />
);

export default Logo;
