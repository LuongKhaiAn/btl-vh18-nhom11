import React from "react";
import { NavLink } from "react-router-dom";
import { Plane, Ticket, User } from "lucide-react";
// Đi lùi 3 tầng: common -> components -> src -> data
import database from "../../data/database.json";

const iconMap = {
  plane: <Plane />,
  ticket: <Ticket size={16} />,
  user: <User size={16} />,
};

const Navbar = () => {
  const { logo, links = [], actions = [] } = database.navigation || {};

  return (
    <header className="header-bar">
      <div className="header-inner">
        {/* Logo click quay về Trang chủ */}
        <NavLink className="nav-logo" to="/">
          <span className="nav-logo-icon" aria-hidden="true">
            {iconMap.plane}
          </span>
          <span className="nav-logo-text">{logo || "TravelGo"}</span>
        </NavLink>

        {/* Menu điều hướng chính */}
        <nav className="nav-menu">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Khối chức năng phụ */}
        <div className="nav-actions">
          {actions.map((action, index) => {
            const isPill = action.icon === "ticket";
            const btnClass = isPill ? "action-pill" : "action-button";

            return (
              <NavLink
                key={action.path || index}
                to={action.path}
                className={btnClass}
              >
                {action.icon && iconMap[action.icon]}
                <span>{action.label}</span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default Navbar;