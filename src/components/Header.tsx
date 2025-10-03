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

  // header shadow on scroll
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll when menu is open
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isMenuOpen);
    return () => document.body.classList.remove("overflow-hidden");
  }, [isMenuOpen]);

  const navItems = [
    { name: t("header.home"), href: "#home" },
    { name: t("header.packages"), href: "/packages", isPage: true },
    { name: t("header.about"), href: "#about" },
    // { name: t("header.faq"), href: "#faq" },    // ❌ removed FAQ
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

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    i18n.changeLanguage(e.target.value);

  const isActive = (href: string) =>
    href.startsWith("/") && location.pathname.startsWith(href);

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

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
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

          {/* Language (desktop) + Mobile toggle */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2">
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

            <button
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((v) => !v)}
              className={`md:hidden p-2 ${isScrolled ? "text-gray-900" : "text-white"}`}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sheet (right) */}
      <div
        className={`md:hidden fixed inset-0 z-[60] transition ${
          isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!isMenuOpen}
      >
        {/* dim backdrop */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMenuOpen(false)}
        />

        {/* sliding panel */}
        <aside
          className={`absolute right-0 top-0 h-full w-[86%] max-w-sm bg-white shadow-xl
                      transition-transform duration-300 ease-out
                      ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
          role="dialog"
          aria-label="Mobile navigation"
        >
          {/* cover header — safari image (no logo, no about text) */}
          <div className="relative h-40 w-full overflow-hidden">
            <div
              className="absolute inset-0 bg-center bg-cover"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D.jpeg')",
              }}
            />
            {/* close button */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/90 hover:bg-white text-gray-900 shadow"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* language selector (mobile) */}
          <div className="px-5 py-3 border-b border-gray-200 flex items-center gap-2">
            <Globe className="w-4 h-4 text-gray-600" />
            <select
              value={i18n.language}
              onChange={handleLanguageChange}
              className="bg-transparent border-none text-sm font-medium text-gray-900 outline-none"
            >
              <option value="en">EN</option>
              <option value="fr">FR</option>
            </select>
          </div>

          {/* menu items */}
          <nav className="h-[calc(100vh-160px-56px)] overflow-y-auto">
            <ul className="px-3 py-2 space-y-1">
              {navItems.map((item) => {
                const active = isActive(item.href);
                const common =
                  "block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition";
                const activeCls = active
                  ? "bg-violet-100 text-violet-700"
                  : "text-gray-900 hover:bg-gray-50";
                return item.isPage ? (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`${common} ${activeCls}`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ) : (
                  <li key={item.name}>
                    <button
                      onClick={() => handleNavClick(item.href)}
                      className={`${common} text-gray-900 hover:bg-gray-50`}
                    >
                      {item.name}
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* bottom meta */}
            <div className="mt-2 pt-3 border-t border-gray-200 px-5 pb-6 text-sm text-gray-500">
              <p>© {new Date().getFullYear()} Dunia Safari Tours</p>
              <p className="mt-1">All rights reserved.</p>
            </div>
          </nav>
        </aside>
      </div>
    </header>
  );
};

export default Header;
