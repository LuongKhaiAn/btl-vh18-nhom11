import React, { useState } from "react";
import { Plane, Ticket } from "lucide-react";

const navItems = ["Trang chủ", "Khách sạn", "Du lịch", "Xe tự lái", "Máy bay"];

const Navbar = () => {
  const [activeItem, setActiveItem] = useState("Trang chủ");

  return (
    <header className="header-bar">
      <div className="header-inner">
        <a className="nav-logo" href="#">
          <span className="nav-logo-icon" aria-hidden="true">
            <Plane />
          </span>
          <span className="nav-logo-text">TravelGo</span>
        </a>

        <nav className="nav-menu">
          {navItems.map((item) => (
            <button
              key={item}
              className={`nav-item ${activeItem === item ? "active" : ""}`}
              type="button"
              onClick={() => setActiveItem(item)}
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="nav-actions">
          <button className="action-pill" type="button">
            <Ticket size={16} />
            Vé của tôi
          </button>
          <button className="action-button" type="button">
            Đăng nhập
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;