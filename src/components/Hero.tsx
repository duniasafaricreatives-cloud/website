import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section
      className="relative h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1648179587771-b31e9eb33ecf?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
          {/* Mobile: show the full title on one line */}
          <span className="block md:hidden">{t("hero.title")}</span>

          {/* Desktop: split into two lines, with a safe space before the break */}
          <span className="hidden md:block">
            {t("hero.titleFirst")}
            {" "}
            <br />
            {t("hero.titleSecond")}
          </span>
        </h1>

        <p className="text-lg text-gray-200 mb-8 max-w-xl mx-auto">
          {t("hero.subtitle")}
        </p>

        <div className="flex flex-col md:flex-row gap-4">
          <Link
            to="/itinerary/eagles-over-the-atlas"
            className="px-8 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-green-600 to-green-700 hover:scale-105 transform transition"
          >
            {t("hero.superEagles")}
          </Link>

          <Link
            to="/itinerary/elephants-in-the-atlas"
            className="px-8 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:scale-105 transform transition"
          >
            {t("hero.elephants")}
          </Link>

          <Link
            to="/itinerary/stars-in-the-atlas"
            className="px-8 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-blue-400 to-blue-600 hover:scale-105 transform transition"
          >
            {t("hero.taifaStars")}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
