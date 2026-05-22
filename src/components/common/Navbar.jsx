import React from "react";
import { Plane, Ticket } from "lucide-react";
import { NAV_ITEMS, getNavLabelByPage } from "../../config/pages";

const LIGHT_HEADER_PAGES = ["hotels", "tours", "cars", "flights", "my-tickets"];

const Navbar = ({ currentPage = "home", onNavigate }) => {
  const activeNavItem = getNavLabelByPage(currentPage);
  const isLightHeader = LIGHT_HEADER_PAGES.includes(currentPage);

  return (
    <header className={`header-bar ${isLightHeader ? "header-bar--light" : ""}`}>
      <div className="header-inner">
        <button
          className="nav-logo"
          type="button"
          onClick={() => onNavigate?.("home")}
        >
          <span className="nav-logo-icon" aria-hidden="true">
            <Plane />
          </span>
          <span className="nav-logo-text">TravelGo</span>
        </button>

        <nav className="nav-menu">
          {NAV_ITEMS.map(({ label, page }) => (
            <button
              key={page}
              className={`nav-item ${activeNavItem === label ? "active" : ""}`}
              type="button"
              onClick={() => onNavigate?.(page)}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="nav-actions">
          <button
            className={`action-pill ${currentPage === "my-tickets" ? "action-pill--active" : ""}`}
            type="button"
            onClick={() => onNavigate?.("my-tickets")}
          >
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
