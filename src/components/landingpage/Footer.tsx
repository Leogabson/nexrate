"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] border-t border-gray-800 py-12 px-6 md:px-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#06B6D4] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#8B5CF6] rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Footer Grid - 5 Columns */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 text-gray-400 mb-8">
          {/* Column 1: Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="#about"
                  className="hover:text-cyan-400 transition-colors text-sm"
                >
                  About NexRate
                </a>
              </li>
              <li>
                <a
                  href="#roadmap"
                  className="hover:text-cyan-400 transition-colors text-sm"
                >
                  Roadmap
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-cyan-400 transition-colors text-sm"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-cyan-400 transition-colors text-sm"
                >
                  Press Kit
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Column 2: Product */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="#how"
                  className="hover:text-cyan-400 transition-colors text-sm"
                >
                  How it Works
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="hover:text-cyan-400 transition-colors text-sm"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#nxr-token"
                  className="hover:text-cyan-400 transition-colors text-sm"
                >
                  Token (NXRT)
                </a>
              </li>
              <li>
                <a
                  href="#trust"
                  className="hover:text-cyan-400 transition-colors text-sm"
                >
                  Security
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="hover:text-cyan-400 transition-colors text-sm"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Column 3: Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="#"
                  className="hover:text-cyan-400 transition-colors text-sm"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-cyan-400 transition-colors text-sm"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-cyan-400 transition-colors text-sm"
                >
                  API Docs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-cyan-400 transition-colors text-sm"
                >
                  System Status
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Column 4: Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="/terms-of-service"
                  className="hover:text-cyan-400 transition-colors text-sm"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="/privacy-policy"
                  className="hover:text-cyan-400 transition-colors text-sm"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-cyan-400 transition-colors text-sm"
                >
                  Cookie Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-cyan-400 transition-colors text-sm"
                >
                  Risk Disclaimer
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Column 5: Community */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">Community</h3>
            <ul className="space-y-2.5 mb-4">
              <li>
                <a
                  href="https://x.com/nexrate_app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors text-sm"
                >
                  Twitter/X
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/NexRates"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors text-sm"
                >
                  Telegram
                </a>
              </li>
              <li>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors text-sm"
                >
                  Discord
                </a>
              </li>
              <li>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors text-sm"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
            <div className="text-sm">
              <p className="text-gray-500 mb-1">Contact:</p>
              <a
                href="mailto:hello@nexrate.com"
                className="text-cyan-400 hover:underline"
              >
                hello@nexrate.com
              </a>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row items-center justify-between gap-6"
        >
          {/* Logo & Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg overflow-hidden opacity-70">
                <Image
                  src="/logo.jpg"
                  alt="NexRate"
                  width={32}
                  height={32}
                  className="object-cover grayscale"
                />
              </div>
              <span className="text-sm text-gray-500">
                © {new Date().getFullYear()} NexRate. All rights reserved.
              </span>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-3">
            <span className="text-xs bg-[#06B6D4]/10 text-[#06B6D4] px-3 py-1.5 rounded-full font-semibold">
              🚀 Phase 1: Waitlist Open
            </span>
          </div>
        </motion.div>

        {/* Critical Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-8 pt-6 border-t border-gray-800/50"
        >
          <p className="text-xs text-gray-500 text-center leading-relaxed max-w-4xl mx-auto">
            <strong className="text-gray-400">Risk Disclaimer:</strong> NexRate
            is not a licensed financial institution. Cryptocurrency trading
            carries significant risk and may not be suitable for all investors.
            Past performance is not indicative of future results. Please trade
            responsibly.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
