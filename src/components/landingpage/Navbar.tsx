"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-[#0F172A] border-b border-[#1F2937] sticky top-0 z-50 backdrop-blur-xl">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <Image
          src="/logo.jpg"
          alt="NexRate Logo"
          width={40}
          height={40}
          className="rounded-full"
        />
        <span className="text-2xl font-bold text-cyan-400">NexRate</span>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden md:flex space-x-6 items-center">
        <a href="#home" className="hover:text-cyan-400 transition-colors">
          Home
        </a>
        <a href="#features" className="hover:text-cyan-400 transition-colors">
          Features
        </a>
        <a href="#how" className="hover:text-cyan-400 transition-colors">
          How It Works
        </a>
        <a href="#roadmap" className="hover:text-cyan-400 transition-colors">
          Roadmap
        </a>
        <a
          href="#contact"
          className="ml-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity font-medium"
        >
          Join Waitlist
        </a>
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-cyan-400 text-2xl"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-16 left-0 w-full bg-[#0B0F19] flex flex-col items-center space-y-6 py-6 border-t border-[#1F2937] md:hidden shadow-xl"
          >
            <a
              href="#home"
              onClick={() => setOpen(false)}
              className="hover:text-cyan-400 transition-colors"
            >
              Home
            </a>
            <a
              href="#features"
              onClick={() => setOpen(false)}
              className="hover:text-cyan-400 transition-colors"
            >
              Features
            </a>
            <a
              href="#how"
              onClick={() => setOpen(false)}
              className="hover:text-cyan-400 transition-colors"
            >
              How It Works
            </a>
            <a
              href="#roadmap"
              onClick={() => setOpen(false)}
              className="hover:text-cyan-400 transition-colors"
            >
              Roadmap
            </a>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-3 rounded-lg hover:opacity-90 transition-opacity font-medium"
            >
              Join Waitlist
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
