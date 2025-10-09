"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    const original =
      typeof document !== "undefined" ? document.body.style.overflow : "";
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = original;
    }
    return () => {
      if (typeof document !== "undefined")
        document.body.style.overflow = original;
    };
  }, [isOpen]);

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

          {/* CTA / Auth Buttons - Right */}
          <div className="flex items-center gap-3">
            {/* Desktop auth links (hidden on mobile) */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/auth/signin"
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
              >
                Sign In
              </Link>

              <Link href="/auth/signup" className="inline-block">
                <button className="px-4 py-2 bg-transparent border border-[#06B6D4] text-[#06B6D4] rounded-lg font-semibold text-sm hover:bg-[#06B6D4] hover:text-white transition-all">
                  Sign Up
                </button>
              </Link>
            </div>

            {/* Mobile hamburger - visible on small screens */}
            <button
              onClick={() => setIsOpen((s) => !s)}
              className="md:hidden p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800 transition"
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-6 h-6"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>

            {/* Join Waitlist button stays prominent */}
            <button
              onClick={() => {
                setIsOpen(false);
                scrollToWaitlist();
              }}
              className="px-6 py-2.5 bg-[#06B6D4] text-white rounded-lg font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#06B6D4]/30"
            >
              Join Waitlist
            </button>
          </div>
        </div>
      </div>
      {/* Slide-in side drawer for mobile */}
      {isOpen && (
        <>
          {/* Backdrop (below header) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 z-30 md:hidden"
          />

          {/* Drawer (full-screen on mobile). Header remains sticky above it (header z-50). */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.22 }}
            className="sticky top-0 right-0 bottom-0 w-full bg-[#0F172A] z-40 md:hidden shadow-2xl"
          >
            <div className="h-full max-w-none px-6 py-6 overflow-auto pt-[64px]">
              <div className="flex flex-col gap-4">
                <a
                  href="#how"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-300 hover:text-[#06B6D4] transition-colors text-base font-medium"
                >
                  How It Works
                </a>
                <a
                  href="#features"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-300 hover:text-[#06B6D4] transition-colors text-base font-medium"
                >
                  Features
                </a>
                <a
                  href="#roadmap"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-300 hover:text-[#06B6D4] transition-colors text-base font-medium"
                >
                  Roadmap
                </a>
                <a
                  href="#faq"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-300 hover:text-[#06B6D4] transition-colors text-base font-medium"
                >
                  FAQ
                </a>

                <Link
                  href="/auth/signin"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-300 hover:text-white transition-colors text-base font-medium"
                >
                  Sign In
                </Link>

                <Link
                  href="/auth/signup"
                  onClick={() => setIsOpen(false)}
                  className="inline-block"
                >
                  <button className="w-full px-4 py-2 bg-transparent border border-[#06B6D4] text-[#06B6D4] rounded-lg font-semibold text-sm hover:bg-[#06B6D4] hover:text-white transition-all">
                    Sign Up
                  </button>
                </Link>

                <button
                  onClick={() => {
                    setIsOpen(false);
                    scrollToWaitlist();
                  }}
                  className="w-full px-4 py-2 bg-[#06B6D4] text-white rounded-lg font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#06B6D4]/30"
                >
                  Join Waitlist
                </button>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </motion.header>
  );
}
