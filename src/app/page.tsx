"use client";
import Navbar from "@/components/landingpage/Navbar";
import Footer from "@/components/landingpage/Footer";
import HowItWorks from "@/components/landingpage/HowItWorks";
import Features from "@/components/landingpage/Features";
import Hero from "@/components/landingpage/Hero";
import About from "@/components/landingpage/About";
import Roadmap from "@/components/landingpage/Roadmap";
import Waitlist from "@/components/landingpage/Waitlist";
import TokenTeaser from "@/components/landingpage/TokenTeaser";
// import image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-[#E2E8F0]">
      <Navbar />

      <Hero />

      <About />

      <HowItWorks />

      <Features />

      <Roadmap />

      <TokenTeaser />

      <Waitlist />

      <Footer />
    </div>
  );
}
