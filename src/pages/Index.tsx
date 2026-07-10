import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import TechnologyStack from "@/components/TechnologyStack";
import EngineeringProcess from "@/components/EngineeringProcess";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import ProposalDeliverables from "@/components/ProposalDeliverables";
import ComingSummerTeaser from "@/components/ComingSummerTeaser";
import CalgarySolarGuide from "@/components/CalgarySolarGuide";
import Contact from "@/components/Contact";
import SiteFooter from "@/components/SiteFooter";
import SEO from "@/components/SEO";
import guidePdf from "@/assets/calgary-solar-guide-2026.pdf.asset.json";

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

const guideSchema = {
  "@context": "https://schema.org",
  "@type": "DigitalDocument",
  name: "Solar in Calgary: what's actually available in 2026 - A homeowner's guide",
  description:
    "Free 12-page guide to solar rebates, incentives and financing available to Calgary and Alberta homeowners in 2026: Canada Greener Homes Grant status, City of Calgary CEIP financing, Alberta Micro-generation Regulation, Solar Club 35 cent per kWh export rate, and 2026 installed cost ranges.",
  inLanguage: "en-CA",
  datePublished: "2026-07-10",
  author: { "@type": "Organization", name: "NullPunkt Solar Inc." },
  publisher: { "@type": "Organization", name: "NullPunkt Solar Inc." },
  about: [
    "Solar rebates Calgary 2026",
    "Clean Energy Improvement Program (CEIP) Calgary",
    "Canada Greener Homes Grant",
    "Alberta Micro-generation Regulation",
    "Solar Club Alberta export rate",
    "Residential solar cost Calgary",
  ],
  url: "https://nullpunkt.ca/#guide",
  encodingFormat: "application/pdf",
  contentUrl: `https://nullpunkt.ca${guidePdf.url}`,
  isAccessibleForFree: true,
};

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="NullPunkt Solar - Calgary Solar Rebates, CEIP Financing & Integrated PV Systems"
        description="Calgary solar company with a free 2026 guide to rebates, CEIP financing and Alberta's 35 ¢/kWh Solar Club export rate. Integrated PV, battery and HEMS systems for Calgary and Southern Alberta."
        path="/"
        jsonLd={[localBusiness, guideSchema]}
      />
      <Navigation />
      <Hero />
      <Services />
      <TechnologyStack />
      <EngineeringProcess />
      <CalgarySolarGuide />
      <About />
      <Portfolio />
      <ComingSummerTeaser />
      <ProposalDeliverables />
      <Contact />
      <SiteFooter />

    </div>
  );
};

export default Index;

