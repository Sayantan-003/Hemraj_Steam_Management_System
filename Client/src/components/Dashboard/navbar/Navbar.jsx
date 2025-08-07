import React, { useState } from "react";
import {
  Menu,
  X,
  Settings,
  BarChart3,
  Gauge,
  Bell,
  Search,
} from "lucide-react";
import Logo from "./Logo";
import { Link } from "react-router-dom";

// Main Navbar Component
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Dashboard");

  const navItems = [
    { name: "Prep", icon: BarChart3, href: "#prep-report" },
    { name: "Solvent", icon: Gauge, href: "#solvent-report" },
    { name: "Refinery", icon: Settings, href: "#refinery-report" },
  ];

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="w-full bg-gradient-to-r from-slate-50 to-blue-50 border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.querySelector(item.href);
                  if (target) {
                    target.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }
                  handleItemClick(item.name);
                }}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 ${
                  activeItem === item.name
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-white hover:text-blue-600 hover:shadow-sm"
                }`}
              >
                <IconComponent size={18} />
                <span>{item.name}</span>
              </Link>
            );
          })}

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
              />
            </div>

            {/* Notifications */}
            <button className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-white rounded-lg transition-all duration-200 hover:shadow-sm">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            {/* User Avatar */}
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-110">
              JD
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-white transition-all duration-200"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => handleItemClick(item.name)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 ${
                      activeItem === item.name
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-gray-700 hover:bg-white hover:text-blue-600 hover:shadow-sm"
                    }`}
                  >
                    <IconComponent size={18} />
                    <span>{item.name}</span>
                  </a>
                );
              })}

              {/* Mobile Search */}
              <div className="px-3 py-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Mobile User Section */}
              <div className="px-3 py-2 border-t border-gray-200 mt-2">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                    JD
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      John Doe
                    </div>
                    <div className="text-xs text-gray-500">
                      System Administrator
                    </div>
                  </div>
                  <div className="ml-auto">
                    <Bell size={18} className="text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
