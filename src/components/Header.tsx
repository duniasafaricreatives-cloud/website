import React, { useState, useEffect } from "react";
import { Menu, X, Globe, User, Users } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import AuthModal from "./AuthModal";

const Header = () => {
  const { t, i18n } = useTranslation();
  const { user, logout, loading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Determine if user is an affiliate based on user object properties
  const isAffiliate = user?.role === "affiliate" || user?.name || user?.affiliate_code;

  // Header shadow on scroll
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Disable body scroll when mobile menu open
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isMenuOpen);
    return () => document.body.classList.remove("overflow-hidden");
  }, [isMenuOpen]);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    i18n.changeLanguage(e.target.value);

  const navItems = [
    { name: t("header.home"), href: "#home" },
    { name: t("header.packages"), href: "/packages", isPage: true },
    { name: t("header.about"), href: "#about" },
    { name: t("header.blog"), href: "/blog", isPage: true },
    { name: t("header.aboutFounder"), href: "/about-founder", isPage: true },
    { name: t("header.becomeAffiliate"), href: "/affiliates", isPage: true },
    { name: t("header.contact"), href: "#contact" },
  ];

  const handleNavClick = (href: string) => {
    if (!href.startsWith("#")) return;
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate("/");
  };

  // Get dashboard route based on user type
  const getDashboardRoute = () => {
    return isAffiliate ? "/affiliate-dashboard" : "/user-dashboard";
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src="/favicon.png" alt="Logo" className="w-auto h-16" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden space-x-8 md:flex">
            {navItems.map((item) =>
              item.isPage ? (
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

          {/* Right side (Language + Auth + Mobile menu) */}
          <div className="flex items-center space-x-4">
            {/* Language selector */}
            <div className="items-center hidden space-x-2 md:flex">
              <Globe className={`w-4 h-4 ${isScrolled ? "text-gray-600" : "text-white"}`} />
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

            {/* Auth section */}
            {!loading && (
              <>
                {!user ? (
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      isScrolled
                        ? "bg-amber-600 text-white hover:bg-amber-700"
                        : "bg-white text-amber-600 hover:bg-gray-100"
                    }`}
                  >
                    Login
                  </button>
                ) : (
                  <div className="relative">
                    <button
                      onClick={toggleDropdown}
                      className={`flex items-center gap-2 font-medium transition-colors ${
                        isScrolled ? "text-gray-900" : "text-white"
                      }`}
                    >
                      {isAffiliate ? (
                        <Users className="w-5 h-5" />
                      ) : (
                        <User className="w-5 h-5" />
                      )}
                      <span className="hidden sm:inline">{user.name}</span>
                      {isAffiliate && (
                        <span className="hidden px-2 py-0.5 text-xs font-semibold text-amber-700 bg-amber-100 rounded-full sm:inline">
                          Affiliate
                        </span>
                      )}
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute right-0 z-50 min-w-[200px] py-2 mt-2 bg-white border rounded-lg shadow-lg">
                        {/* User Info */}
                        <div className="px-4 py-2 border-b">
                          <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                          {isAffiliate && (
                            <span className="inline-block px-2 py-0.5 mt-1 text-xs font-semibold text-amber-700 bg-amber-100 rounded-full">
                              Affiliate Partner
                            </span>
                          )}
                        </div>

                        {/* Dashboard Link */}
                        <Link
                          to={getDashboardRoute()}
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-100"
                        >
                          {isAffiliate ? (
                            <>
                              <Users className="w-4 h-4" />
                              <span>Affiliate Dashboard</span>
                            </>
                          ) : (
                            <>
                              <User className="w-4 h-4" />
                              <span>Dashboard</span>
                            </>
                          )}
                        </Link>

                        {/* Logout */}
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full gap-2 px-4 py-2 text-left text-red-600 transition-colors hover:bg-red-50"
                        >
                          <X className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}

            {/* Mobile Menu Toggle */}
            <button
              aria-label="Toggle menu"
              onClick={() => setIsMenuOpen((v) => !v)}
              className={`md:hidden p-2 ${isScrolled ? "text-gray-900" : "text-white"}`}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="bg-white border-t shadow-lg md:hidden">
          <nav className="px-4 py-4 space-y-2">
            {navItems.map((item) =>
              item.isPage ? (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 text-gray-900 transition-colors rounded-lg hover:bg-gray-100"
                >
                  {item.name}
                </Link>
              ) : (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="block w-full px-3 py-2 text-left text-gray-900 transition-colors rounded-lg hover:bg-gray-100"
                >
                  {item.name}
                </button>
              )
            )}

            {/* Language selector in mobile menu */}
            <div className="flex items-center gap-2 px-3 py-2">
              <Globe className="w-4 h-4 text-gray-600" />
              <select
                value={i18n.language}
                onChange={handleLanguageChange}
                className="flex-1 text-sm font-medium text-gray-900 bg-transparent border-none outline-none"
              >
                <option value="en">English</option>
                <option value="fr">Français</option>
              </select>
            </div>

            {/* Auth buttons in mobile menu */}
            {!loading && user && (
              <div className="pt-2 mt-2 border-t">
                <Link
                  to={getDashboardRoute()}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-gray-900 transition-colors rounded-lg hover:bg-gray-100"
                >
                  {isAffiliate ? <Users className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  <span>{isAffiliate ? "Affiliate Dashboard" : "Dashboard"}</span>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center w-full gap-2 px-3 py-2 text-left text-red-600 transition-colors rounded-lg hover:bg-red-50"
                >
                  <X className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </nav>
        </div>
      )}

      {/* Auth Modal */}
      {isAuthModalOpen && (
        <AuthModal isOpen={isAuthModalOpen} setIsOpen={setIsAuthModalOpen} />
      )}
    </header>
  );
};

export default Header;