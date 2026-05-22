import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/home-page/home-menu";
import HotelList from "./pages/HotelList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/khach-san" element={<HotelList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;