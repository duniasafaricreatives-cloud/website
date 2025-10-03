import React, { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: t("header.home"), href: "#home" },
    { name: t("header.packages"), href: "/packages", isPage: true },
    { name: t("header.about"), href: "#about" },
    { name: t("header.faq"), href: "#faq" },
    { name: t("header.blog"), href: "/blog", isPage: true },
    { name: t("header.aboutFounder"), href: "/about-founder", isPage: true },
    { name: t("header.becomeAffiliate"), href: "/affiliates", isPage: true },
    { name: t("header.contact"), href: "#contact" },
  ];

  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      // Section link
      if (location.pathname !== "/") {
        // If not on homepage → navigate home first
        navigate("/");

        // Delay to allow homepage to load before scrolling
        setTimeout(() => {
          const el = document.querySelector(href);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 300);
      } else {
        // Already on homepage → just scroll
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
      setIsMenuOpen(false);
    }
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
  };
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
                src="/duniasafaritourlogo.png"
                alt="Dunia Safari Tours"
                className="h-16 md:h-16 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) =>
              item.isPage ? (
                // ✅ Blog → goes to /blog
                <Link
                  key={item.name}
                  to={item.href}
                  className={`font-medium transition-colors duration-200 hover:text-amber-600 ${
                    isScrolled ? "text-gray-900" : "text-white"
                  }`}
                >
                  {item.name}
                </Link>
              ) : (
                // ✅ Scroll sections (Home, About, etc.)
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className={`font-medium transition-colors duration-200 hover:text-amber-600 ${
                    isScrolled ? "text-gray-900" : "text-white"
                  }`}
                >
                  {item.name}
                </button>
              )
            )}
          </nav>

          {/* Language Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Globe
                className={`w-4 h-4 ${
                  isScrolled ? "text-gray-600" : "text-white"
                }`}
              />
              <select
                value={i18n.language}
                onChange={handleLanguageChange}
                className={`bg-transparent border-none text-sm font-medium cursor-pointer outline-none ${
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
          <div className="md:hidden absolute right-0 top-16 w-3/4 max-w-xs h-screen overflow-y-auto bg-white border-t border-gray-200 shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) =>
                item.isPage ? (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block w-full text-left px-3 py-2 text-gray-900 font-medium hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    className="block w-full text-left px-3 py-2 text-gray-900 font-medium hover:bg-gray-50"
                  >
                    {item.name}
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
