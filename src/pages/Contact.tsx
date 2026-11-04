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
  telephone: "+1-403-819-7834",
  image: "https://nullpunkt.ca/email/nullpunkt-signature-logo.png",
  address: {
    "@type": "PostalAddress",
    streetAddress: "#2005 - 10th Avenue SW",
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
        title="Free Solar Consultation Calgary - Contact NullPunkt Solar"
        description="Request a free Calgary solar consultation, roof review and individual quote. Tell us about your home or a quote you are comparing; no obligation to buy."
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
