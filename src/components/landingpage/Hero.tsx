"use client";

import React from "react";
import { motion, Variants, TargetAndTransition } from "framer-motion";

export default function Hero() {
  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const slideInFromLeft: Variants = {
    hidden: { opacity: 0, x: -100, scale: 0.8 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const slideInFromRight: Variants = {
    hidden: { opacity: 0, x: 100, scale: 0.8 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.3 },
    },
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const buttonVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // Properly typed animation objects
  const floatingAnimation: TargetAndTransition = {
    y: [-10, 10, -10],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
  };

  const glowAnimation: TargetAndTransition = {
    boxShadow: [
      "0 0 20px rgba(6, 182, 212, 0.3)",
      "0 0 40px rgba(6, 182, 212, 0.6)",
      "0 0 20px rgba(6, 182, 212, 0.3)",
    ],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  };

  const handleGetStartedClick = (): void => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLearnMoreClick = (): void => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.section
      className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-16"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Left Content */}
      <motion.div
        className="max-w-xl text-center md:text-left"
        variants={slideInFromLeft}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-bold leading-tight"
          variants={fadeInUp}
        >
          Swap, Buy & Sell{" "}
          <motion.span
            className="text-cyan-400"
            whileHover={{
              textShadow: "0 0 20px rgba(6, 182, 212, 0.8)",
              transition: { duration: 0.2 },
            }}
          >
            Crypto
          </motion.span>{" "}
          and Gift Cards Seamlessly
        </motion.h2>

        <motion.p className="mt-4 text-gray-400" variants={fadeInUp}>
          Fast, secure, and reliable platform for your digital transactions.
        </motion.p>

        <motion.div
          className="mt-6 flex gap-4 justify-center md:justify-start"
          variants={fadeInUp}
        >
          <motion.button
            onClick={handleGetStartedClick}
            className="bg-gradient-to-r from-cyan-400 to-purple-500 text-white px-6 py-3 rounded-lg hover:opacity-90 relative overflow-hidden"
            variants={buttonVariants}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 30px rgba(6, 182, 212, 0.3)",
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.95 }}
            animate={glowAnimation}
          >
            <motion.span
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              Get Started
            </motion.span>
          </motion.button>

          <motion.button
            onClick={handleLearnMoreClick}
            className="border border-cyan-400 text-cyan-400 px-6 py-3 rounded-lg hover:bg-cyan-400 hover:text-black transition-all duration-300"
            variants={buttonVariants}
            whileHover={{
              scale: 1.05,
              borderColor: "#22d3ee",
              boxShadow: "0 5px 20px rgba(6, 182, 212, 0.2)",
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              initial={{ x: 0 }}
              whileHover={{ x: 3 }}
              transition={{ duration: 0.2 }}
            >
              Learn More
            </motion.span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Right Content - Illustration */}
      <motion.div
        className="mt-8 md:mt-0 relative"
        variants={slideInFromRight}
        animate={floatingAnimation}
      >
        <motion.img
          src="/hero-illustration.png"
          alt="Trading Illustration"
          className="w-96"
          whileHover={{ scale: 1.05, rotate: 2, transition: { duration: 0.3 } }}
          drag
          dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }}
          dragElastic={0.1}
          whileDrag={{ scale: 1.1, cursor: "grabbing" }}
        />

        {/* Animated background glow */}
        <motion.div
          className="absolute -z-10 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-purple-500/10 rounded-full blur-3xl top-0 left-0"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Background Particles */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        {[...Array(20)].map((_, i) => {
          const leftPosition = (i * 17 + 23) % 100;
          const topPosition = (i * 31 + 47) % 100;
          const duration = 3 + (i % 3);
          const delay = i * 0.2;

          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
              style={{ left: `${leftPosition}%`, top: `${topPosition}%` }}
              animate={{ y: [-20, 20], opacity: [0, 1, 0] }}
              transition={{
                duration,
                repeat: Infinity,
                delay,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>
    </motion.section>
  );
}
