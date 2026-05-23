import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
<<<<<<< Updated upstream
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import PageTransition from "./components/common/PageTransition";
import ScrollToTop from "./components/common/ScrollToTop";
import HomePage from "./page/home-page/home-menu";
import MyTicketsPage from "./page/my-tickets/MyTicketsPage";
import HotelList from "./page/hotels/HotelList";
import TourList from "./page/tours/TourList";
import CarsPage from "./page/cars/CarsPage";
import FlightList from "./page/flights/FlightList";
import ProductDetailPage from "./components/product/ProductDetailPage";
import { ROUTES } from "./config/pages";

function AppContent() {
  const location = useLocation();
=======
import HomeNav from "./pages/home-page/home-nav";
>>>>>>> Stashed changes

  return (
<<<<<<< Updated upstream
    <div className="app-shell">
      <ScrollToTop />
      <Navbar />
      <div className="app-body">
        <PageTransition pageKey={location.pathname}>
          <Routes>
            <Route path={ROUTES.home} element={<HomePage />} />
            <Route path={ROUTES.hotels} element={<HotelList />} />
            <Route
              path={`${ROUTES.hotels}/:id`}
              element={<ProductDetailPage productKey="hotels" />}
            />
            <Route path={ROUTES.tours} element={<TourList />} />
            <Route
              path={`${ROUTES.tours}/:id`}
              element={<ProductDetailPage productKey="tours" />}
            />
            <Route path={ROUTES.cars} element={<CarsPage />} />
            <Route
              path={`${ROUTES.cars}/:id`}
              element={<ProductDetailPage productKey="cars" />}
            />
            <Route path={ROUTES.flights} element={<FlightList />} />
            <Route
              path={`${ROUTES.flights}/:id`}
              element={<ProductDetailPage productKey="flights" />}
            />
            <Route
              path={ROUTES.myTickets}
              element={<Navigate to={ROUTES.myTicketsPending} replace />}
            />
            <Route path={ROUTES.myTicketsPending} element={<MyTicketsPage />} />
            <Route path={ROUTES.myTicketsPaid} element={<MyTicketsPage />} />
            <Route path={ROUTES.myTicketsCancelled} element={<MyTicketsPage />} />
          </Routes>
        </PageTransition>
      </div>
      <Footer />
    </div>
=======
    <>
      <HomeNav/>
    </>
>>>>>>> Stashed changes
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
