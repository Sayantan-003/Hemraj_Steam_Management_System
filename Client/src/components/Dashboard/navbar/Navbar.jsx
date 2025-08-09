import React, { useState, useEffect } from "react";
import { Menu, X, Bell, Search } from "lucide-react";

//import logos
import PrepIcon from "../../icons/PrepIcons";
import SolventIcon from "../../icons/SolventIcon";
import RefineryIcon from "../../icons/RefineryIcon";

// Logo Component
import Logo from "./Logo";


import ExpandableSearch from './ExpandableSearch'


// Main Navbar Component
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Prep");

  // Navigation configuration - easily maintainable
  const navItems = [
    {
      name: "Prep",
      icon: PrepIcon,
      href: "#prep-report",
      description: "Material Preparation & Processing",
      ariaLabel: "Navigate to preparation section",
    },
    {
      name: "Solvent",
      icon: SolventIcon,
      href: "#solvent-report",
      description: "Solvent Extraction Process",
      ariaLabel: "Navigate to solvent section",
    },
    {
      name: "Refinery",
      icon: RefineryIcon,
      href: "#refinery-report",
      description: "Oil Refining & Distillation",
      ariaLabel: "Navigate to refinery section",
    },
  ];

  // Event handlers
  const handleItemClick = (itemName) => {
    try {
      setActiveItem(itemName);
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error("Error handling item click:", error);
    }
  };

  const handleNavClick = (href, itemName) => {
    try {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
      handleItemClick(itemName);
    } catch (error) {
      console.error("Error navigating to section:", error);
      // Fallback: still update active item
      handleItemClick(itemName);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isMobileMenuOpen]);

  return (
    <nav
      className="w-full bg-gradient-to-r from-slate-50 to-blue-50 border-b border-gray-200 shadow-sm sticky top-0 z-50"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeItem === item.name;

              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href, item.name)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-700 hover:bg-white hover:text-blue-600 hover:shadow-sm"
                  }`}
                  title={item.description}
                  aria-label={item.ariaLabel}
                  aria-pressed={isActive}
                >
                  <IconComponent size={18} />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Search */}
            <div className="relative">
              <ExpandableSearch onSectionSelect={(section) => console.log('Selected:', section)} />

            </div>

            {/* Notifications */}
            <button
              className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-white rounded-lg transition-all duration-200 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
              aria-label="View notifications"
              title="3 new notifications"
            >
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                3
              </span>
              <span className="sr-only">3 unread notifications</span>
            </button>

            {/* User Avatar */}
            <button
              className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
              aria-label="User menu for John Doe"
              title="John Doe - Process Engineer"
            >
              JD
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
              aria-label={
                isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"
              }
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-sm"
            role="menu"
            aria-label="Mobile navigation menu"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeItem === item.name;

                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.href, item.name)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-gray-700 hover:bg-white hover:text-blue-600 hover:shadow-sm"
                    }`}
                    role="menuitem"
                    aria-label={item.ariaLabel}
                  >
                    <IconComponent size={20} />
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{item.name}</span>
                      <span className="text-xs opacity-75">
                        {item.description}
                      </span>
                    </div>
                  </button>
                );
              })}

              {/* Mobile Search */}
              <ExpandableSearch onSectionSelect={(section) => console.log('Selected:', section)} />


              {/* Mobile User Section */}
              <div className="px-3 py-4 border-t border-gray-200 mt-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                    JD
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      John Doe
                    </div>
                    <div className="text-xs text-blue-600">
                      Process Engineer
                    </div>
                  </div>
                  <div className="ml-auto relative">
                    <Bell size={20} className="text-gray-400" />
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
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
