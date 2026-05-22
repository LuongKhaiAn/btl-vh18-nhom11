import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/home-page/home-menu";
import HotelList from "./pages/Hotels/HotelList";
import TourList from "./pages/Tours/TourList";
import CarList from "./pages/Cars/CarList";
import FlightList from "./pages/Flights/FlightList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/khach-san" element={<HotelList />} />
        <Route path="/du-lich" element={<TourList />} />
        <Route path="/xe-tu-lai" element={<CarList />} />
        <Route path="/may-bay" element={<FlightList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;