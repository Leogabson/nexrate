"use client";
import { motion, Variants } from "framer-motion";
import React, { JSX } from "react";

// Define interface for step data
interface Step {
  number: string;
  title: string;
  description: string;
  details: string[];
  icon: string;
  color: string;
}

export default function HowItWorks(): JSX.Element {
  // Animation variants with proper typing
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      rotateY: -20,
    },
    visible: {
      opacity: 1,
      rotateY: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  const steps: Step[] = [
    {
      number: "1",
      title: "Create Your Account",
      description:
        "Get started in under 2 minutes with our seamless onboarding",
      details: [
        "Sign up with email or Google",
        "Complete quick KYC verification",
        "Set up 2FA security",
        "Get your welcome bonus",
      ],
      icon: "👤",
      color: "cyan",
    },
    {
      number: "2",
      title: "Connect & Fund",
      description: "Link your wallet and deposit your preferred assets",
      details: [
        "Connect MetaMask or other wallets",
        "Deposit crypto or fiat currency",
        "View real-time portfolio balance",
        "Enable auto-funding options",
      ],
      icon: "💰",
      color: "purple",
    },
    {
      number: "3",
      title: "Trade Smartly",
      description: "Let AI find the best opportunities while you trade",
      details: [
        "AI suggests profitable arbitrage",
        "Lock rates to avoid volatility",
        "Join group swaps for discounts",
        "Trade crypto, gift cards & more",
      ],
      icon: "🔄",
      color: "cyan",
    },
    {
      number: "4",
      title: "Earn & Grow",
      description: "Maximize your returns with NXR token rewards",
      details: [
        "Earn NXRATE tokens on every trade",
        "Stake tokens for reduced fees",
        "Get referral bonuses",
        "Participate in governance voting",
      ],
      icon: "📈",
      color: "purple",
    },
  ];

  return (
    <section
      id="how"
      className="py-20 px-6 md:px-16 bg-gradient-to-b from-[#0B0F19] to-[#050810] relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-block mb-4"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-cyan-400 px-6 py-2 rounded-full text-sm font-semibold">
              ⚡ Simple Process
            </span>
          </motion.div>

          <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            How NexRate Works
          </h3>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Start trading in 4 easy steps. From signup to earning rewards, we've
            made it seamless.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          className="grid lg:grid-cols-2 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {steps.map((step: Step, index: number) => {
            const isEven = index % 2 === 0;
            const borderColor =
              step.color === "cyan"
                ? "border-cyan-500/30"
                : "border-purple-500/30";
            const glowColor =
              step.color === "cyan"
                ? "shadow-cyan-500/10"
                : "shadow-purple-500/10";
            const textColor =
              step.color === "cyan" ? "text-cyan-400" : "text-purple-400";

            return (
              <motion.div
                key={step.number}
                variants={itemVariants}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3 },
                }}
                className="cursor-pointer"
              >
                <motion.div
                  variants={cardVariants}
                  className={`bg-gradient-to-br from-[#111827] to-[#0B0F19] border ${borderColor} rounded-2xl p-8 shadow-xl ${glowColor} hover:shadow-2xl transition-all duration-300 relative overflow-hidden`}
                >
                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-full blur-2xl"></div>

                  {/* Step Number Badge */}
                  <motion.div
                    className={`absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br ${
                      step.color === "cyan"
                        ? "from-cyan-500 to-cyan-600"
                        : "from-purple-500 to-purple-600"
                    } rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg`}
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 200,
                    }}
                    viewport={{ once: true }}
                  >
                    {step.number}
                  </motion.div>

                  {/* Icon */}
                  <motion.div
                    className="text-6xl mb-4"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.3,
                    }}
                  >
                    {step.icon}
                  </motion.div>

                  {/* Content */}
                  <h4 className={`text-2xl font-bold ${textColor} mb-2`}>
                    {step.title}
                  </h4>
                  <p className="text-gray-400 mb-6 text-lg">
                    {step.description}
                  </p>

                  {/* Details List */}
                  <ul className="space-y-3">
                    {step.details.map((detail, idx) => (
                      <motion.li
                        key={idx}
                        className="flex items-start gap-3 text-gray-300"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <span className={`${textColor} text-lg mt-0.5`}>✓</span>
                        <span className="text-sm">{detail}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Visual Flow Diagram */}
        <motion.div
          className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-2xl p-8 mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h4 className="text-2xl font-bold text-center text-cyan-400 mb-8">
            Your Trading Journey
          </h4>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative">
            {/* Connection Lines (desktop only) */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500/50 via-purple-500/50 to-cyan-500/50"></div>

            {[
              { icon: "👤", label: "Sign Up", color: "cyan" },
              { icon: "💰", label: "Fund", color: "purple" },
              { icon: "🔄", label: "Trade", color: "cyan" },
              { icon: "💎", label: "Earn NXRATE", color: "purple" },
              { icon: "🚀", label: "Grow", color: "cyan" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="relative z-10 flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1 }}
              >
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-br ${
                    item.color === "cyan"
                      ? "from-cyan-500 to-cyan-600"
                      : "from-purple-500 to-purple-600"
                  } flex items-center justify-center text-3xl shadow-lg mb-2`}
                >
                  {item.icon}
                </div>
                <span className="text-sm font-semibold text-gray-300">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h4 className="text-2xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h4>
          <p className="text-gray-400 mb-6">
            Join thousands of early adopters who are already earning with
            NexRate
          </p>
          <motion.button
            onClick={() => {
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Join Waitlist Now →
          </motion.button>

          <p className="text-sm text-gray-500 mt-4">
            ✓ No credit card required • ✓ Early access rewards • ✓ Free to join
          </p>
        </motion.div>
      </div>
    </section>
  );
}
