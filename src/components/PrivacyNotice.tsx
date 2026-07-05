import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { X } from "lucide-react";

const ACK_KEY = "np_notice_ack";

const PrivacyNotice = () => {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(ACK_KEY) === "1") return;
      // Don't show on admin or privacy page
      if (pathname.startsWith("/admin") || pathname.startsWith("/privacy")) return;
      // Small delay so it doesn't fight the LCP
      const t = setTimeout(() => setVisible(true), 900);
      return () => clearTimeout(t);
    } catch {
      /* noop */
    }
  }, [pathname]);

  const dismiss = () => {
    try {
      localStorage.setItem(ACK_KEY, "1");
    } catch {
      /* noop */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Privacy notice"
      className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:bottom-6 md:max-w-md z-40"
    >
      <div className="card-raised p-4 md:p-5 border border-border/80 bg-card/95 backdrop-blur-xl shadow-xl">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <p className="text-minimal text-lime mb-1.5">Privacy-friendly analytics</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We use lightweight first-party analytics - no ads, no cross-site tracking, no data sold.
              Approximate country/city is derived from your IP. Read our{" "}
              <Link to="/privacy" className="text-lime hover:underline">
                Privacy Policy
              </Link>{" "}
              for details.
            </p>
            <div className="mt-3 flex items-center gap-3">
              <button
                onClick={dismiss}
                className="btn-lime !py-2 !px-4 !text-xs"
                data-cta="Privacy notice ack"
                data-cta-position="privacy-notice"
              >
                Got it
              </button>
              <Link
                to="/privacy"
                onClick={dismiss}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Learn more →
              </Link>
            </div>
          </div>
          <button
            onClick={dismiss}
            aria-label="Dismiss privacy notice"
            className="text-muted-foreground hover:text-foreground transition-colors -mt-1 -mr-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyNotice;
