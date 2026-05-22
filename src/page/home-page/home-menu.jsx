import HeroSection from "../../components/layout/HeroSection";
import ServiceSection from "../../components/layout/ServiceSection";

const HomePage = ({ onNavigate }) => {
  return (
    <>
      <HeroSection />
      <ServiceSection onNavigate={onNavigate} />
    </>
  );
};

export default HomePage;