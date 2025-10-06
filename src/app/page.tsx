// src/app/page.tsx - Updated Landing Page

import Navbar from "@/components/landingpage/Navbar";
import TrustBar from "@/components/landingpage/TrustBar";
import Hero from "@/components/landingpage/Hero";
import About from "@/components/landingpage/About";
import Features from "@/components/landingpage/Features";
import HowItWorks from "@/components/landingpage/HowItWorks";
import Roadmap from "@/components/landingpage/Roadmap";
import TokenTeaser from "@/components/landingpage/TokenTeaser";
import Waitlist from "@/components/landingpage/Waitlist";
import Footer from "@/components/landingpage/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-x-hidden">
      <div className="w-full max-w-[100vw] overflow-x-hidden">
        <Navbar />
        <main className="w-full overflow-x-hidden">
          <Hero waitlistCount={1247} />
          <TrustBar />
          <About />
          <Features />
          <HowItWorks />
          <Roadmap />
          <TokenTeaser />
          <Waitlist />
        </main>
        <Footer />
      </div>
    </div>
  );
}
