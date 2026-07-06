import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import TechnologyStack from "@/components/TechnologyStack";
import EngineeringProcess from "@/components/EngineeringProcess";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import ProposalDeliverables from "@/components/ProposalDeliverables";
import ComingSummerTeaser from "@/components/ComingSummerTeaser";
import Contact from "@/components/Contact";
import SiteFooter from "@/components/SiteFooter";
import SEO from "@/components/SEO";

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "NullPunkt Solar Inc.",
  url: "https://nullpunkt.ca",
  email: "hello@nullpunkt.ca",
  image: "https://nullpunkt.ca/logo-black.png",
  description:
    "Integrated PV, battery and HEMS systems for Calgary and Southern Alberta. Canadian subsidiary of SMB Solartechnik GmbH.",
  parentOrganization: {
    "@type": "Organization",
    name: "SMB Solartechnik GmbH",
    url: "https://smb-solartechnik.de",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "#2005 – 10th Avenue SW",
    addressLocality: "Calgary",
    addressRegion: "AB",
    addressCountry: "CA",
  },
  areaServed: ["Calgary", "Southern Alberta"],
};

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="NullPunkt Solar - Integrated Solar for Calgary, Alberta"
        description="Integrated PV, battery and HEMS systems for Calgary and Southern Alberta. A new Calgary company backed by a German parent installing integrated systems since 2024."
        path="/"
        jsonLd={localBusiness}
      />
      <Navigation />
      <Hero />
      <Services />
      <TechnologyStack />
      <EngineeringProcess />
      <About />
      <Portfolio />
      <ProposalDeliverables />
      <Contact />
      <SiteFooter />
    </div>
  );
};

export default Index;

