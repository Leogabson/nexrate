"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface HeroProps {
  waitlistCount?: number;
}

export default function Hero({ waitlistCount = 0 }: HeroProps) {
  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen bg-[#0F172A] text-white overflow-hidden flex items-center">
      {/* Animated Gradient Orbs Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Headline */}
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
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
              className="text-lg sm:text-xl text-[#CBD5E1] mb-8 max-w-2xl mx-auto lg:mx-0"
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
              className="mb-8"
            >
              <button
                onClick={scrollToWaitlist}
                className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white bg-[#06B6D4] rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(6,182,212,0.4)]"
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
              <div className="flex items-center justify-center lg:justify-start gap-2 text-sm text-[#CBD5E1]">
                <span className="text-[#10B981]">🔒</span>
                <span>Secured by Blockchain Smart Contracts</span>
              </div>

              {/* Live Counter */}
              <div className="flex items-center justify-center lg:justify-start gap-2 text-sm">
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

          {/* Right Visual - Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full h-[500px] flex items-center justify-center">
              <div className="relative w-full h-full rounded-3xl border border-white/10 flex items-center justify-center overflow-hidden">
                <img
                  src="/hero-illustration.png"
                  alt="Crypto to Gift Card Flow Illustration"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Decorative floating elements */}
              <motion.div
                className="absolute top-10 left-10 w-20 h-20 rounded-2xl bg-gradient-to-br from-[#00D4FF] to-[#0EA5E9] flex items-center justify-center shadow-lg"
                animate={{
                  y: [-10, 10, -10],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span className="text-3xl">₿</span>
              </motion.div>

              <motion.div
                className="absolute bottom-10 right-10 w-20 h-20 rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#0EA5E9] flex items-center justify-center shadow-lg"
                animate={{
                  y: [10, -10, 10],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span className="text-3xl">🎁</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
