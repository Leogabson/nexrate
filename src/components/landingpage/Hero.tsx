"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { JSX } from "react";

interface HeroProps {
  waitlistCount?: number;
}

export default function Hero({ waitlistCount = 0 }: HeroProps): JSX.Element {
  const scrollToWaitlist = (): void => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen bg-[#0F172A] text-white overflow-hidden flex items-center">
      {/* Hero Illustration as Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 from-transparent via-[#0F172A]/60 to-[#0F172A] z-10" />
        <img
          src="/image-test.png"
          alt="Background Illustration"
          className="absolute inset-0 w-full h-full object-cover opacity-30 scale-110"
        />
      </div>

      {/* Animated Gradient Orbs Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
        <motion.div
          className="absolute top-20 left-10 w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #00D4FF 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-40 right-10 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)",
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/3 w-[400px] h-[400px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #0EA5E9 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-30 w-full max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col items-center text-center">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            {/* Headline */}
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Turn Your Crypto Into{" "}
              <span className="bg-gradient-to-r from-[#00D4FF] via-[#0EA5E9] to-[#8B5CF6] bg-clip-text text-transparent">
                Netflix, Spotify & Bills
              </span>{" "}
              - At Guaranteed Best Rates
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              className="text-lg sm:text-xl lg:text-2xl text-[#CBD5E1] mb-10 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Join Africa&apos;s first AI-powered exchange combining crypto
              trading, instant gift cards, and smart bill payments. Earn NXRATE
              tokens on every transaction.
            </motion.p>

            {/* Primary CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-10"
            >
              <button
                onClick={scrollToWaitlist}
                className="group relative inline-flex items-center justify-center px-12 py-6 text-xl font-bold text-white bg-[#06B6D4] rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(6,182,212,0.5)]"
              >
                <span className="relative z-10">
                  Join Early Access Waitlist
                </span>
                <motion.div className="absolute inset-0 bg-gradient-to-r from-[#00D4FF] via-[#0EA5E9] to-[#8B5CF6] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </motion.div>

            {/* Supporting Elements */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {/* Trust Badge */}
              <div className="flex items-center justify-center gap-2 text-sm text-[#CBD5E1]">
                <span className="text-[#10B981]">🔒</span>
                <span>Secured by Blockchain Smart Contracts</span>
              </div>

              {/* Live Counter */}
              <div className="flex items-center justify-center gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse" />
                  <span className="text-[#CBD5E1]">
                    Join{" "}
                    <span className="font-bold text-white">
                      {waitlistCount.toLocaleString()}
                    </span>{" "}
                    traders on the waitlist
                  </span>
                </div>
              </div>

              {/* Scarcity */}
              <div className="inline-flex items-center gap-2 bg-[#F59E0B]/10 border border-[#F59E0B]/30 px-4 py-2 rounded-full">
                <span className="text-[#F59E0B] text-sm font-semibold">
                  ⚡ Limited to first 5,000 early access members
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
