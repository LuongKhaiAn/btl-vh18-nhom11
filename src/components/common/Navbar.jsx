import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Plane, Ticket } from "lucide-react";
import {
  NAV_ITEMS,
  ROUTES,
  isMyTicketsPath,
  isProductPath,
} from "../../config/pages";

const Navbar = () => {
  const { pathname } = useLocation();
  const isLightHeader = isProductPath(pathname) || isMyTicketsPath(pathname);

  return (
    <header className={`header-bar${isLightHeader ? " header-bar--light" : ""}`}>
      <div className="header-inner">
        <NavLink className="nav-logo" to={ROUTES.home}>
          <span className="nav-logo-icon" aria-hidden="true">
            <Plane />
          </span>
          <span className="nav-logo-text">TravelGo</span>
        </NavLink>

        <nav className="nav-menu">
          {NAV_ITEMS.map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              end={path === ROUTES.home}
              className={({ isActive }) =>
                `nav-item${isActive ? " active" : ""}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          <NavLink
            to={ROUTES.myTicketsPending}
            className={() =>
              `action-pill${isMyTicketsPath(pathname) ? " action-pill--active" : ""}`
            }
          >
            <Ticket size={16} />
            Vé của tôi
          </NavLink>
          <button className="action-button" type="button">
            Đăng nhập
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
