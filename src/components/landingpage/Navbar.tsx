"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Navbar() {
  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-[#0F172A]/95 backdrop-blur-xl border-b border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo - Left */}
          <a href="#home" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg overflow-hidden transition-transform group-hover:scale-110">
              <Image
                src="/logo.jpg"
                alt="NexRate"
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            <span className="text-xl font-bold text-white">NexRate</span>
          </a>

          {/* Desktop Navigation - Center */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#how"
              className="text-gray-300 hover:text-[#06B6D4] transition-colors text-sm font-medium"
            >
              How It Works
            </a>
            <a
              href="#features"
              className="text-gray-300 hover:text-[#06B6D4] transition-colors text-sm font-medium"
            >
              Features
            </a>
            <a
              href="#roadmap"
              className="text-gray-300 hover:text-[#06B6D4] transition-colors text-sm font-medium"
            >
              Roadmap
            </a>
            <a
              href="#faq"
              className="text-gray-300 hover:text-[#06B6D4] transition-colors text-sm font-medium"
            >
              FAQ
            </a>
          </nav>

          {/* CTA Button - Right */}
          <button
            onClick={scrollToWaitlist}
            className="px-6 py-2.5 bg-[#06B6D4] text-white rounded-lg font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#06B6D4]/30"
          >
            Join Waitlist
          </button>
        </div>
      </div>
    </motion.header>
  );
}
