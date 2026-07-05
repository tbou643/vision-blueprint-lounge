import Navigation from "@/components/Navigation";
import SiteFooter from "@/components/SiteFooter";
import SEO from "@/components/SEO";
import Contact from "@/components/Contact";

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "NullPunkt Solar Inc.",
  url: "https://nullpunkt.ca/contact",
  email: "hello@nullpunkt.ca",
  image: "https://nullpunkt.ca/logo-black.png",
  address: {
    "@type": "PostalAddress",
    streetAddress: "#2005 – 10th Avenue SW",
    addressLocality: "Calgary",
    addressRegion: "AB",
    addressCountry: "CA",
  },
  areaServed: ["Calgary", "Southern Alberta"],
};

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Contact NullPunkt Solar - Calgary founding waitlist"
        description="Get a free, no-obligation solar consultation for your Calgary or Southern Alberta property. Join the Summer 2026 founding customer waitlist."
        path="/contact"
        jsonLd={localBusiness}
      />
      <Navigation />
      <div className="pt-24">
        <Contact />
      </div>
      <SiteFooter />
    </div>
  );
};

export default ContactPage;
