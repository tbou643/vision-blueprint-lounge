import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import TechnologyStack from "@/components/TechnologyStack";
import EngineeringProcess from "@/components/EngineeringProcess";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import ProposalDeliverables from "@/components/ProposalDeliverables";
import Contact from "@/components/Contact";
import SiteFooter from "@/components/SiteFooter";

const Index = () => {
  return (
    <div className="min-h-screen">
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
