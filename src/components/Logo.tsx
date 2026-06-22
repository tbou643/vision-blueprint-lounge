interface LogoProps {
  className?: string;
  variant?: "light" | "dark";
  showTagline?: boolean;
}

/**
 * NullPunkt Solar Inc. wordmark.
 * Arc + dot motif over the wordmark, "Solar Inc." subtitle.
 * - variant="light"  → wordmark in light foreground (use on dark bg)
 * - variant="dark"   → wordmark in deep slate (use on light bg)
 * The arc/dot is always lime.
 */
const Logo = ({ className = "", variant = "light", showTagline = true }: LogoProps) => {
  const wordColor = variant === "light" ? "#F4F6F8" : "#0F1828";
  const subColor = variant === "light" ? "#A6B0BD" : "#3A4757";
  const lime = "#D4E400";

  return (
    <svg
      viewBox="0 0 520 180"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="NullPunkt Solar Inc."
    >
      {/* Arc with dot — orbit motif */}
      <path
        d="M 90 70 Q 260 -30 430 70"
        stroke={lime}
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="92" cy="70" r="13" fill={lime} />

      {/* Wordmark */}
      <text
        x="50%"
        y="118"
        textAnchor="middle"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight={800}
        fontSize="72"
        letterSpacing="-2"
        fill={wordColor}
      >
        NullPunkt
      </text>

      {showTagline && (
        <text
          x="50%"
          y="158"
          textAnchor="middle"
          fontFamily="Inter, system-ui, sans-serif"
          fontWeight={400}
          fontSize="26"
          letterSpacing="2"
          fill={subColor}
        >
          Solar Inc.
        </text>
      )}
    </svg>
  );
};

export default Logo;
