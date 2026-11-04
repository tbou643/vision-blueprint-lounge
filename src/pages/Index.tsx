import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import QuickEstimate from "@/components/QuickEstimate";
import PriceTrust from "@/components/PriceTrust";
import HomeFaq, { homeFaqs } from "@/components/HomeFaq";

import Services from "@/components/Services";
import TechnologyStack from "@/components/TechnologyStack";
import EngineeringProcess from "@/components/EngineeringProcess";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import ProposalDeliverables from "@/components/ProposalDeliverables";
import CalgarySolarGuide from "@/components/CalgarySolarGuide";
import Contact from "@/components/Contact";
import SiteFooter from "@/components/SiteFooter";
import SEO from "@/components/SEO";
import guidePdf from "@/assets/calgary-solar-guide-2026.pdf.asset.json";

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://nullpunkt.ca/#organization",
  name: "NullPunkt Solar Inc.",
  url: "https://nullpunkt.ca",
  email: "hello@nullpunkt.ca",
  telephone: "+1-403-819-7834",
  priceRange: "$$",
  slogan: "German Precision - Zero Emissions",
  image: "https://nullpunkt.ca/email/nullpunkt-signature-logo.png",
  logo: "https://nullpunkt.ca/email/nullpunkt-signature-logo.png",
  knowsLanguage: ["en", "de"],
  sameAs: ["https://smb-solartechnik.de"],
  description:
    "Integrated PV, battery and HEMS systems for Calgary and Southern Alberta. Canadian subsidiary of SMB Solartechnik GmbH.",
  parentOrganization: {
    "@type": "Organization",
    name: "SMB Solartechnik GmbH",
    url: "https://smb-solartechnik.de",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "#2005 - 10th Avenue SW",
    addressLocality: "Calgary",
    addressRegion: "AB",
    addressCountry: "CA",
  },
  geo: { "@type": "GeoCoordinates", latitude: 51.0396, longitude: -114.1006 },
  areaServed: [
    { "@type": "City", name: "Calgary" },
    { "@type": "AdministrativeArea", name: "Southern Alberta" },
    { "@type": "State", name: "Alberta" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Solar services in Calgary",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Residential integrated solar systems (PV, battery, HEMS)",
          areaServed: "Calgary, Alberta",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Commercial and agricultural solar",
          areaServed: "Southern Alberta",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Developer partnerships and new-build solar",
          areaServed: "Calgary, Alberta",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Service, maintenance and system monitoring",
          areaServed: "Calgary, Alberta",
        },
      },
    ],
  },
};

const guideSchema = {
  "@context": "https://schema.org",
  "@type": "DigitalDocument",
  name: "Solar in Calgary: what's actually available in 2026 - A homeowner's guide",
  description:
    "July 2026 homeowner guide to Calgary solar programs. Historical figures are not current offers; confirm current CEIP intake and retailer rates before applying.",
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
  contentUrl: new URL(guidePdf.url, "https://nullpunkt.ca").href,
  isAccessibleForFree: true,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homeFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="Solar Panel Installation Calgary - Free Consultation | NullPunkt Solar"
        description="Calgary rooftop solar with optional battery storage and German engineering. Request a free roof and electricity-use assessment and an individual project quote."
        path="/"
        jsonLd={[localBusiness, guideSchema, faqSchema]}
      />
      <Navigation />
      <Hero />
      <QuickEstimate />
      <PriceTrust />
      <Services />

      <TechnologyStack />
      <EngineeringProcess />
      <CalgarySolarGuide />
      <About />
      <Portfolio />
      <HomeFaq />
      <ProposalDeliverables />
      <Contact />
      <SiteFooter />
      <div className="lg:hidden h-20" aria-hidden="true" />
    </div>
  );
};

export default Index;

