import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import HomepageCarousel from "./components/HomepageCarousel";
import GroupPerks from "./components/GroupPerks";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Newsletter from "./components/Newsletter";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Apps from "./userDashBorad/Apps";
import PrivateRoute from "./PrivateRoute";

// ✅ Import Affiliate Dashboard
import AffiliateDashboard from "./affiliateDashboard/AffiliateDashboard";

// ✅ Import Admin Components
import AdminLogin from "./adminDashboard/AdminLogin";
import AdminDashboard from "./adminDashboard/AdminDashboard";

import BlogListingPage from "./pages/BlogListingPage"; 
import BlogPostPage from "./pages/BlogPostPage";       
import AboutFounderPage from "./pages/AboutFounderPage";
import PackagesPage from "./pages/PackagesPage";
import AffiliatesPage from "./pages/AffiliatesPage";

// ✅ Import separate itineraries
import ItineraryEagles from "./pages/ItineraryEagles";
import ItineraryElephants from "./pages/ItineraryElephants";
import ItineraryStars from "./pages/ItineraryStars";

function App() {
  const location = useLocation();

  // ✅ Check if current route is admin route
  const isAdminRoute = location.pathname.startsWith('/admin');

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
      {/* ✅ Conditionally render Header only for non-admin routes */}
      {!isAdminRoute && <Header />}
      
      <main>
        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <About />
                <HomepageCarousel />
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

          {/* Affiliates Page */}
          <Route path="/affiliates" element={<AffiliatesPage />} />

          {/* Individual Blog Post Page */}
          <Route path="/blog/:id" element={<BlogPostPage />} />

          {/* ✅ Separate Itinerary Pages */}
          <Route path="/itinerary/eagles-over-the-atlas" element={<ItineraryEagles />} />
          <Route path="/itinerary/elephants-in-the-atlas" element={<ItineraryElephants />} />
          <Route path="/itinerary/stars-in-the-atlas" element={<ItineraryStars />} />

          {/* ✅ Admin Routes (No Header/Footer) */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route element={<PrivateRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>

          {/* ✅ Protected Routes */}
          <Route element={<PrivateRoute />}>
            {/* User Dashboard */}
            <Route path="/user-dashboard" element={<Apps />} />
            
            {/* ✅ Affiliate Dashboard */}
            <Route path="/affiliate-dashboard" element={<AffiliateDashboard />} />
          </Route>
        </Routes>
      </main>
      
      {/* ✅ Conditionally render Footer only for non-admin routes */}
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;