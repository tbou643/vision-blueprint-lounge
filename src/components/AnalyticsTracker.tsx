import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageview } from "@/lib/analytics";

const AnalyticsTracker = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // Skip admin routes
    if (pathname.startsWith("/admin")) return;
    trackPageview(pathname + search);
  }, [pathname, search]);

  return null;
};

export default AnalyticsTracker;
