import React from "react";
import { Routes, Route } from "react-router-dom";

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
import Blog from "./components/Blog";
import BlogPage from "./pages/BlogPage"; // ✅ New file for full blog

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Routes>
          {/* Landing Page */}
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
                <Blog /> {/* ✅ Shows blog preview */}
                <Newsletter />
                <Contact />
              </>
            }
          />

          {/* Full Blog Page */}
          <Route path="/blog" element={<BlogPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
