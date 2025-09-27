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
import ItineraryPage from "./pages/ItineraryPage";   // ✅ new import

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
                <Packages />
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

          {/* About Founder Page */}
          <Route path="/about-founder" element={<AboutFounderPage />} />

          {/* Individual Blog Post Page */}
          <Route path="/blog/:id" element={<BlogPostPage />} />

          {/* Itinerary Page ✅ */}
          <Route path="/itinerary" element={<ItineraryPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
