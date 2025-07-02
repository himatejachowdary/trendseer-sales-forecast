import HeroSection from "@/components/HeroSection";
import ProjectOverview from "@/components/ProjectOverview";
import TechnicalDetails from "@/components/TechnicalDetails";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ProjectOverview />
      <TechnicalDetails />
      <Footer />
    </div>
  );
};

export default Index;
