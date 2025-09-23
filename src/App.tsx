import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Packages from './components/Packages';
import GroupPerks from './components/GroupPerks';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Newsletter from './components/Newsletter';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Blog from "./components/Blog";

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Packages />
        <GroupPerks />
        <Testimonials />
        <FAQ />
        <Blog />
        <Newsletter />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;