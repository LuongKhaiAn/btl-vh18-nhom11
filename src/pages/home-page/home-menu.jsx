import Footer from "../../components/common/Footer";
import Navbar from "../../components/common/Navbar";
import HeroSection from "../../components/layout/HeroSection";
import HerSection from "../../components/layout/HerSection";
import ServiceSection from "../../components/layout/ServiceSection";

// Gom cac section cua trang home theo dung cau truc src/pages/home-page.
const HomeMenu = () => {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ServiceSection />
        <HerSection />
      </main>
      <Footer />
    </>
  );
};

export default HomeMenu;
