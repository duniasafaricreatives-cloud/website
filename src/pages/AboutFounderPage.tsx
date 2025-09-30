import React, { useEffect } from "react";
import { FaInstagram, FaYoutube } from "react-icons/fa";

const AboutFounderPage = () => {
  const travelImages = [
    { src: "/Akchour waterfalls.jpg", caption: "Akchour Waterfalls" },
    { src: "/Chefchaoun.jpg", caption: "Chefchaoun" },
    { src: "/Meknes.jpg", caption: "Meknes" },
    { src: "/Mr Zalagh_Fes.jpg", caption: "Mt Zalagh, Fes" },
    { src: "/Mt. Toubal.jpg", caption: "Mt. Toubal Trek" },
    { src: "/Mt. Toubkal summit.jpg", caption: "Mt. Toubkal Summit" },
    { src: "/Oujoud waterfalls.jpg", caption: "Oujoud Waterfalls" },
    { src: "/Ourika.jpg", caption: "Ourika" },
    { src: "/Tinghir gorge.jpg", caption: "Tinghir Gorge" },
    { src: "/Ziz valley.jpg", caption: "Ziz Valley" },
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
          About the Founder
        </h1>
        <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>

        {/* Founder Image + Intro */}
        <div className="flex flex-col items-center gap-8 mb-12">
          <img
            src="/Mimi-Babs.jpg"
            alt="Founder of Dunia Safari"
            className="w-48 h-48 rounded-full object-cover shadow-lg"
          />

          {/* Social Links */}
          <div className="flex gap-6 mt-4">
            <a
              href="https://www.instagram.com/mimi_babs?igsh=OWwwbmY1ZHh0Y2hi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:text-pink-600 transition-transform transform hover:scale-110"
              aria-label="Follow on Instagram"
            >
              <i className="fab fa-instagram text-2xl"></i>
            </a>

            <a
              href="https://www.youtube.com/@mimi_babs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 hover:text-red-700 transition-transform transform hover:scale-110"
              aria-label="Follow on YouTube"
            >
              <i className="fab fa-youtube text-2xl"></i>
            </a>
          </div>

          <div className="space-y-6">
            <p className="text-gray-700 leading-relaxed">
              Mimi Babs is an avid solo traveler who has explored over 20
              countries across the globe, from Dubai to the United States to
              South Korea. With more than a decade of experience in sales,
              marketing and business development, she has consistently acted as
              an intrapreneur, raising hundreds of thousand to multi-million-dollar
              financing for the organizations she has worked with.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Travel is more than a passion for Mimi, it’s a way of life. She
              has journeyed across nearly every country in West Africa, mostly
              by road and always on a budget. A lover of nature and outdoor
              adventure. She often says her only regret is not beginning her
              adventures in her early twenties.
            </p>
          </div>
        </div>

        {/* Story Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-burgundy-900">
            Travel Africa, Transform Africa
          </h2>
          <p className="text-gray-700 leading-relaxed">
            In September 2025, Mimi launched Dunia Safari to make travel accessible and inspire Africa’s youth to explore their own continent. She believes progress begins with seeing and experiencing Africa firsthand. 
          </p>
        </section>

                {/* Vision Section */}
        <section className="mb-6"> {/* Added a section wrapper for clarity */}
          <p className="text-gray-700 leading-relaxed">
            Mimi invites collaborations, partnerships, and sponsorships to help
            realize this dream within her lifetime.
          </p>
        </section>
        
        {/* Travel Memories Slider */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center text-burgundy-900">
            Travel Memories
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
                      alt={img.caption}
                      className="w-full h-80 object-cover rounded-2xl"
                    />
                    <p className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-4 py-1 rounded-full text-sm">
                      {img.caption}
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
