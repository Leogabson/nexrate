"use client";
import { motion, Variants } from "framer-motion";
import React, { JSX } from "react";

// Define interface for step data
interface Step {
  number: string;
  title: string;
  description: string;
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
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const numberVariants: Variants = {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.2,
      },
    },
  };

  const steps: Step[] = [
    {
      number: "1",
      title: "Sign Up",
      description: "Create your free NexRate account in minutes.",
    },
    {
      number: "2",
      title: "Choose Transaction",
      description: "Select crypto, gift cards, or bill payments.",
    },
    {
      number: "3",
      title: "Complete Trade",
      description: "Enjoy fast, secure, and reliable transactions.",
    },
  ];

  return (
    <section id="how" className="py-16 px-6 md:px-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h3 className="text-3xl font-bold text-center text-cyan-400">
          How It Works
        </h3>
        <p className="mt-2 text-center text-gray-400">
          Trade in just 3 easy steps
        </p>
      </motion.div>

      <motion.div
        className="mt-10 grid gap-10 md:grid-cols-3 text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {steps.map((step: Step, index: number) => (
          <motion.div
            key={step.number}
            variants={itemVariants}
            whileHover={{
              y: -5,
              transition: { duration: 0.2 },
            }}
            className="cursor-pointer"
          >
            <motion.div
              className="text-4xl font-bold text-purple-400"
              variants={numberVariants}
              whileHover={{
                scale: 1.1,
                color: "#a855f7",
              }}
            >
              {step.number}
            </motion.div>
            <h4 className="mt-2 text-xl font-semibold text-cyan-400">
              {step.title}
            </h4>
            <p className="mt-2 text-gray-400">{step.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
