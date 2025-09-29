"use client";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-[#0B0F19] border-t border-[#1F2937] py-10 px-6 md:px-16">
      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-4 text-gray-400">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-cyan-400">NexRate</h2>
          <p className="mt-3 text-sm">
            The smarter way to swap, buy, and sell crypto & gift cards. 🚀
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold text-purple-400">Quick Links</h3>
          <ul className="mt-3 space-y-2">
            <li>
              <a href="#" className="hover:text-cyan-400">
                Home
              </a>
            </li>
            <li>
              <a href="#features" className="hover:text-cyan-400">
                Features
              </a>
            </li>
            <li>
              <a href="#how" className="hover:text-cyan-400">
                How It Works
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-cyan-400">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-lg font-semibold text-purple-400">Legal</h3>
          <ul className="mt-3 space-y-2">
            <li>
              <a href="#" className="hover:text-cyan-400">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-cyan-400">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-lg font-semibold text-purple-400">Follow Us</h3>
          <div className="flex mt-3 space-x-4 text-xl">
            <a href="https://x.com/Nexrate" className="hover:text-cyan-400">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://t.me/NexRates" className="hover:text-cyan-400">
              <i className="fab fa-telegram"></i>
            </a>
            <a href="#" className="hover:text-cyan-400">
              <i className="fab fa-discord"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="mt-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} NexRate. All rights reserved.
      </div>
    </footer>
  );
}
