import Navigation from "@/components/Navigation";
import SiteFooter from "@/components/SiteFooter";
import Contact from "@/components/Contact";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24">
        <Contact />
      </div>
      <SiteFooter />

    </div>
  );
};

export default ContactPage;
