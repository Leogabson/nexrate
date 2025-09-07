"use client";
import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-[#0B0F19] border-b border-[#1F2937] sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <Image
          src="/logo.png"
          alt="NexRate Logo"
          width={40}
          height={40}
          className="rounded-full"
        />
        <span className="text-2xl font-bold text-cyan-400">NexRate</span>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden md:flex space-x-6">
        <a href="#home" className="hover:text-cyan-400">
          Home
        </a>
        <a href="#features" className="hover:text-cyan-400">
          Features
        </a>
        <a href="#how" className="hover:text-cyan-400">
          How It Works
        </a>
        <a href="#contact" className="hover:text-cyan-400">
          Contact
        </a>
      </nav>

      {/* Mobile Button */}
      <button
        className="md:hidden text-cyan-400 text-2xl"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-16 left-0 w-full bg-[#0B0F19] flex flex-col items-center space-y-6 py-6 border-t border-[#1F2937] md:hidden">
          <a
            href="#home"
            onClick={() => setOpen(false)}
            className="hover:text-cyan-400"
          >
            Home
          </a>
          <a
            href="#features"
            onClick={() => setOpen(false)}
            className="hover:text-cyan-400"
          >
            Features
          </a>
          <a
            href="#how"
            onClick={() => setOpen(false)}
            className="hover:text-cyan-400"
          >
            How It Works
          </a>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="hover:text-cyan-400"
          >
            Contact
          </a>
        </div>
      )}
    </header>
  );
}
