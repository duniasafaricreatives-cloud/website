import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Packages from "./components/Packages";
import GroupPerks from "./components/GroupPerks";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Newsletter from "./components/Newsletter";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import BlogListingPage from "./pages/BlogListingPage"; 
import BlogPostPage from "./pages/BlogPostPage";       
import AboutFounderPage from "./pages/AboutFounderPage";
import PackagesPage from "./pages/PackagesPage";

// ✅ Import separate itineraries
import ItineraryEagles from "./pages/ItineraryEagles";
import ItineraryElephants from "./pages/ItineraryElephants";
import ItineraryStars from "./pages/ItineraryStars";

function App() {
  const location = useLocation();

  // Smooth scroll when hash links are clicked
  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const el = document.querySelector(location.hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [location]);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <About />
                <GroupPerks />
                <Testimonials />
                <FAQ />
                <Newsletter />
                <Contact />
              </>
            }
          />

          {/* Blog Listing Page */}
          <Route path="/blog" element={<BlogListingPage />} />

          {/* Packages Page */}
          <Route path="/packages" element={<PackagesPage />} />

          {/* About Founder Page */}
          <Route path="/about-founder" element={<AboutFounderPage />} />

          {/* Individual Blog Post Page */}
          <Route path="/blog/:id" element={<BlogPostPage />} />

          {/* ✅ Separate Itinerary Pages */}
          <Route path="/itinerary/eagles-over-the-atlas" element={<ItineraryEagles />} />
          <Route path="/itinerary/elephants-in-the-atlas" element={<ItineraryElephants />} />
          <Route path="/itinerary/stars-in-the-atlas" element={<ItineraryStars />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
