import React, { useEffect } from "react";

const AboutFounderPage = () => {
  const travelImages = [
    { src: "/Akchour waterfalls.jpg", caption: "Akchour Waterfalls" },
    { src: "/Chefchaoun.jpg", caption: "Chefchaoun" },
    { src: "/Meknes.jpg", caption: "Meknes" },
    { src: "/Mr Zalagh_Fes.jpg", caption: "Mr Zalagh, Fes" },
    { src: "/Mt. Toubal.jpg", caption: "Mt. Toubal" },
    { src: "/Mt. Toubkal summit.jpg", caption: "Mt. Toubkal Summit" },
    { src: "/Oujoud waterfalls.jpg", caption: "Oujoud Waterfalls" },
    { src: "/Ourika.jpg", caption: "Ourika" },
    { src: "/Tinghir gorge.jpg", caption: "Tinghir Gorge" },
    { src: "/Ziz valley.jpg", caption: "Ziz Valley" },
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1) Initialize Swiper if available
    if (window.Swiper) {
      new window.Swiper(".swiper-container", {
        loop: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: { el: ".swiper-pagination", clickable: true },
        slidesPerView: 1,
        spaceBetween: 20,
        breakpoints: {
          768: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
        },
      });
    }

    // 2) Tiny guard to keep page from scrolling on horizontal swipes
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
      // If it's a horizontal swipe, prevent page scroll while Swiper handles it
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
            In September 2025, Mimi launched Dunia Safari to make travel accessible and inspire Africa’s youth to explore their own continent. She believes progress begins with seeing and experiencing Africa firsthand and invites collaborations, partnerships, and sponsorships to bring this vision to life. 
          </p>
        </section>

        {/* Vision Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-burgundy-900">
         
          </h2>
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

            {/* Pagination */}
            <div className="swiper-pagination"></div>

            {/* Navigation Arrows */}
            <div className="swiper-button-next"></div>
            <div className="swiper-button-prev"></div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AboutFounderPage;
