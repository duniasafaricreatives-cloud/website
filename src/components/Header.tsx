import React, { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

    { name: "Home", href: "/#home" },
    { name: "Packages", href: "/#packages" },
    { name: "About", href: "/#about" },
    { name: "FAQ", href: "/#faq" },
    { name: "Blog", href: "/blog" }, // ✅ Blog is a full page
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img
                src="/duniasafaritourslogo.png"
                alt="Dunia Safari Tours"
                className="h-10 md:h-12 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`font-medium transition-colors duration-200 hover:text-amber-600 ${
                  isScrolled ? "text-gray-900" : "text-white"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Language Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <div className="flex items-center space-x-2">
              <Globe
                className={`w-4 h-4 ${
                  isScrolled ? "text-gray-600" : "text-white"
                }`}
              />
              <select
                className={`bg-transparent border-none text-sm font-medium cursor-pointer ${
                  isScrolled ? "text-gray-900" : "text-white"
                }`}
              >
                <option value="en">EN</option>
                <option value="fr">FR</option>
              </select>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 ${
                isScrolled ? "text-gray-900" : "text-white"
              }`}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-left px-3 py-2 text-gray-900 font-medium hover:bg-gray-50"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
