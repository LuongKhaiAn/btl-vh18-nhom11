import Footer from "../../components/common/Footer";
import Navbar from "../../components/common/Navbar";
import HeroSection from "../../components/layout/HeroSection";
import ServiceSection from "../../components/layout/ServiceSection";
import ListingSection from "../../components/layout/ListingSection";

// Gom cac section cua trang home theo dung cau truc src/pages/home-page.
const HomeMenu = () => {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ServiceSection />
        <ListingSection />
      </main>
      <Footer />
    </>
  );
};

export default HomeMenu;
