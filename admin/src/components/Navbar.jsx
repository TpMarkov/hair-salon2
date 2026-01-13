import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext.jsx";
import { assets } from "../assets/assets.js";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarCheck,
  Briefcase,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ServerIcon,
} from "lucide-react";

const Navbar = () => {
  const { adminToken, setAdminToken, sideBarCollapsed, setSideBarCollapsed } =
    useContext(AdminContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
    adminToken && setAdminToken("");
    adminToken && localStorage.removeItem("adminToken");
  };

  const navItems = [
    { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/appointments", icon: CalendarCheck, label: "Appointments" },
    { path: "/services-list", icon: Briefcase, label: "Add Service" },
    { path: "/services", icon: ServerIcon, label: "Manage Services" },
  ];

  return (
    <>
      {/* Burger Button (Mobile Only) */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 right-4 z-[60] p-2 bg-white rounded-lg shadow-md border border-gray-100 active:scale-90 transition-transform flex items-center justify-center"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6 text-gray-600" />
        ) : (
          <Menu className="w-6 h-6 text-gray-600" />
        )}
      </button>

      {/* Backdrop for Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-[55]"
        ></div>
      )}

      <nav
        className={`admin-nav ${sideBarCollapsed ? "collapsed" : ""} ${
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="admin-nav-inner flex flex-col h-full">
          {/* Logo Section */}
          <div className="admin-logo-container relative mb-4">
            <img
              className="w-12 md:w-24 cursor-pointer"
              src={"/images/logo.png"}
              alt="admin-logo"
              onClick={() => navigate("/")}
            />
            {!sideBarCollapsed && (
              <span className="admin-badge">Admin Panel</span>
            )}

            {/* Collapse Toggle (Desktop) */}
            <button
              onClick={() => setSideBarCollapsed(!sideBarCollapsed)}
              className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border border-gray-200 rounded-full items-center justify-center shadow-sm cursor-pointer hover:bg-gray-50 z-10"
            >
              <ChevronLeft
                className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
                  sideBarCollapsed ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {/* Navigation Items */}
          <div className="admin-nav-items flex-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `nav-item ${isActive ? "active" : ""}`
                }
              >
                <item.icon className="nav-icon" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>

          {/* Logout Button */}
          <button onClick={logout} className="btn-logout mt-auto mb-6 md:mb-8">
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
