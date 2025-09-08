"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Roadmap() {
  const roadmap = [
    {
      phase: "Phase 1",
      title: "Launch Waitlist + MVP",
      desc: "Open NexRate waitlist, launch landing page for early adopters.",
      status: "✅",
    },
    {
      phase: "Phase 2",
      title: "Core Exchange Features",
      desc: "Enable crypto & gift card swapping, fiat deposits, and secure user wallets.",
      status: "🚀",
    },
    {
      phase: "Phase 3",
      title: "AI Arbitrage + Group Swaps",
      desc: "Introduce AI-powered arbitrage finder and community pooling for better rates.",
      status: "🌍",
    },
    {
      phase: "Phase 4",
      title: "AI Fraud Detection + Rate Lock",
      desc: "Deploy real-time fraud scoring engine and smart rate lock for secure trades.",
      status: "🔒",
    },
    {
      phase: "Phase 5",
      title: "NFT Marketplace + Bill Payments",
      desc: "Expand platform with NFT & digital assets trading plus utility bill payments.",
      status: "💳",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: -50,
      scale: 0.8,
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

  const dotVariants = {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
        delay: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      rotateX: -15,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: 0.1,
      },
    },
  };

  const lineVariants = {
    hidden: {
      scaleX: 0,
      scaleY: 0,
    },
    visible: {
      scaleX: 1,
      scaleY: 1,
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        delay: 0.5,
      },
    },
  };

  return (
    <section id="roadmap" className="py-20 bg-[#0B0F19] text-[#E2E8F0]">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          className="text-4xl font-bold mb-12 text-cyan-400"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Our Roadmap
        </motion.h2>

        {/* Roadmap Illustration */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <Image
            src="/roadmap.png"
            alt="NexRate Roadmap Illustration"
            width={900}
            height={500}
            className="rounded-lg shadow-lg"
          />
        </motion.div>

        {/* Roadmap Timeline */}
        <div className="relative md:flex md:justify-between md:gap-6">
          {/* Animated Timeline Line */}
          <motion.div
            className="absolute left-3 top-0 bottom-0 w-0.5 bg-cyan-500 md:hidden"
            variants={lineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ transformOrigin: "top" }}
          />
          <motion.div
            className="hidden md:block absolute top-3 left-0 right-0 h-0.5 bg-cyan-500"
            variants={lineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ transformOrigin: "left" }}
          />

          <motion.div
            className="relative md:flex md:justify-between md:gap-6 w-full"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {roadmap.map((item, index) => (
              <motion.div
                key={index}
                className="mb-10 md:mb-0 md:w-1/5 flex flex-col items-start md:items-center relative"
                variants={itemVariants}
              >
                {/* Timeline Dot */}
                <motion.div
                  className="absolute -left-3 md:-top-3 md:left-auto bg-cyan-500 w-6 h-6 rounded-full flex items-center justify-center text-black font-bold shadow-md z-10"
                  variants={dotVariants}
                  whileHover={{
                    scale: 1.2,
                    boxShadow: "0 0 20px rgba(6, 182, 212, 0.6)",
                    transition: { duration: 0.2 },
                  }}
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.3, duration: 0.3 }}
                  >
                    {item.status}
                  </motion.span>
                </motion.div>

                {/* Card */}
                <motion.div
                  className="bg-[#111827] p-6 rounded-lg shadow-md mt-4 md:mt-8 text-left md:text-center w-full"
                  variants={cardVariants}
                  whileHover={{
                    y: -5,
                    scale: 1.02,
                    boxShadow: "0 20px 40px rgba(6, 182, 212, 0.15)",
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.h4
                    className="text-lg font-semibold text-purple-400"
                    whileHover={{
                      color: "#a855f7",
                      transition: { duration: 0.2 },
                    }}
                  >
                    {item.phase}
                  </motion.h4>
                  <h3 className="text-xl font-bold text-cyan-400 mt-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 mt-2">{item.desc}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
