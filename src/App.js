import { useState } from "react";
import "./App.css";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import HomePage from "./page/home-page/home-menu";
import MyTicketsPage from "./page/my-tickets/MyTicketsPage";
import HotelsPage from "./page/hotels/HotelsPage";
import ToursPage from "./page/tours/ToursPage";
import CarsPage from "./page/cars/CarsPage";
import FlightsPage from "./page/flights/FlightsPage";

const PAGE_COMPONENTS = {
  home: HomePage,
  hotels: HotelsPage,
  tours: ToursPage,
  cars: CarsPage,
  flights: FlightsPage,
  "my-tickets": MyTicketsPage,
};

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const PageContent = PAGE_COMPONENTS[currentPage] ?? HomePage;

  return (
    <div className="app-shell">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      <div className="app-body">
        {currentPage === "home" ? (
          <HomePage onNavigate={setCurrentPage} />
        ) : (
          <PageContent />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
