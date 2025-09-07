"use client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HowItWorks from "../components/HowItWorks";
import Features from "../components/Features";
import Hero from "../components/Hero";
import About from "../components/About";
import Roadmap from "../components/Roadmap";
import Waitlist from "../components/Waitlist";
import image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-[#E2E8F0]">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Hero />
      {/* About Section */}
      <About />
      {/* How It Works Section */}
      <HowItWorks />
      {/* Waitlis section */}
      <Waitlist />

      <Roadmap />

      <Footer />
      {/* Footer */}
    </div>
  );
}
