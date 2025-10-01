import React, { useEffect } from "react";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const AboutFounderPage = () => {
  const { t } = useTranslation();
  
  const travelImages = [
    { src: "/Akchour waterfalls.jpg", captionKey: "akchourWaterfalls" },
    { src: "/Chefchaoun.jpg", captionKey: "chefchaouen" },
    { src: "/Meknes.jpg", captionKey: "meknes" },
    { src: "/Mr Zalagh_Fes.jpg", captionKey: "mtZalagh" },
    { src: "/Mt. Toubal.jpg", captionKey: "mtToubkal" },
    { src: "/Mt. Toubkal summit.jpg", captionKey: "mtToubkalSummit" },
    { src: "/Oujoud waterfalls.jpg", captionKey: "oujoudWaterfalls" },
    { src: "/Ourika.jpg", captionKey: "ourika" },
    { src: "/Tinghir gorge.jpg", captionKey: "tinghirGorge" },
    { src: "/Ziz valley.jpg", captionKey: "zizValley" },
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;

    const initSwiper = () => {
      if (!window.Swiper) return;
      new window.Swiper(".swiper-container", {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 20,
        breakpoints: {
          768: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
        },
      });
    };

    if (window.Swiper) {
      initSwiper();
    } else {
      const cssId = "swiper-cdn-css";
      if (!document.getElementById(cssId)) {
        const link = document.createElement("link");
        link.id = cssId;
        link.rel = "stylesheet";
        link.href =
          "https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.css";
        document.head.appendChild(link);
      }

      const jsId = "swiper-cdn-js";
      const loadJs = () =>
        new Promise((resolve, reject) => {
          if (document.getElementById(jsId)) return resolve();
          const script = document.createElement("script");
          script.id = jsId;
          script.src =
            "https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.js";
          script.async = true;
          script.onload = () => resolve();
          script.onerror = () => reject(new Error("Failed to load Swiper"));
          document.body.appendChild(script);
        });

      loadJs().then(() => {
        requestAnimationFrame(initSwiper);
      });
    }

    const el = document.querySelector(".swiper-container");
    if (!el) return;

    let startX = 0;
    let startY = 0;

    const onStart = (e) => {
      const t = e.touches?.[0];
      if (!t) return;
      startX = t.clientX;
      startY = t.clientY;
    };

    const onMove = (e) => {
      const t = e.touches?.[0];
      if (!t) return;
      const dx = Math.abs(t.clientX - startX);
      const dy = Math.abs(t.clientY - startY);
      if (dx > dy) e.preventDefault();
    };

    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: false });

    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
    };
  }, []);

  return (
    <main className="py-20 bg-gray-50 overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-6">
        {/* Page Title */}
        <h1 className="text-4xl font-bold mb-12 text-center text-burgundy-900">
          {t('aboutFounderPage.title')}
        </h1>
        <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>

        {/* Founder Image + Intro */}
        <div className="flex flex-col items-center gap-8 mb-12">
          <img
            src="/Mimi-Babs.jpg"
            alt={t('aboutFounderPage.founderName')}
            className="w-48 h-48 rounded-full object-cover shadow-lg"
          />

          {/* Social Links */}
          <div className="flex gap-6 mt-4">
  <a
    href="https://www.instagram.com/mimi_babs?igsh=OWwwbmY1ZHh0Y2hi"
    target="_blank"
    rel="noopener noreferrer"
    className="text-pink-500 hover:text-pink-600 transition-transform transform hover:scale-110"
    aria-label={t('aboutFounderPage.socialLinks.instagram')}
  >
    <FaInstagram className="text-2xl" />
  </a>

  <a
    href="https://www.youtube.com/@mimi_babs"
    target="_blank"
    rel="noopener noreferrer"
    className="text-red-600 hover:text-red-700 transition-transform transform hover:scale-110"
    aria-label={t('aboutFounderPage.socialLinks.youtube')}
  >
    <FaYoutube className="text-2xl" />
  </a>
</div>

          <div className="space-y-6">
            <p className="text-gray-700 leading-relaxed">
              {t('aboutFounderPage.biography.paragraph1')}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {t('aboutFounderPage.biography.paragraph2')}
            </p>
          </div>
        </div>

        {/* Story Section */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-burgundy-900">
            {t('aboutFounderPage.mission.title')}
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {t('aboutFounderPage.mission.description')}
          </p>
        </section>

                {/* Vision Section */}
        <section className="mb-6"> {/* Added a section wrapper for clarity */}
          <p className="text-gray-700 leading-relaxed">
            {t('aboutFounderPage.mission.collaboration')}
          </p>
        </section>
        
        {/* Travel Memories Slider */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center text-burgundy-900">
            {t('aboutFounderPage.travelMemories.title')}
          </h2>

          {/* Horizontal Swiper Slider */}
          <div className="swiper-container rounded-2xl shadow-lg touch-pan-y overscroll-contain">
            <div className="swiper-wrapper flex">
              {travelImages.map((img, idx) => (
                <div
                  className="swiper-slide flex-shrink-0 w-[calc(100%/1.05)] md:w-[calc(50%-10px)] lg:w-[calc(33.33%-15px)] mx-2"
                  key={idx}
                >
                  <div className="relative">
                    <img
                      src={img.src}
                      alt={t(`aboutFounderPage.imageCaptions.${img.captionKey}`)}
                      className="w-full h-80 object-cover rounded-2xl"
                    />
                    <p className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-4 py-1 rounded-full text-sm">
                      {t(`aboutFounderPage.imageCaptions.${img.captionKey}`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AboutFounderPage;
