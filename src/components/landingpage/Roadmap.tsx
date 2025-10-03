"use client";
import { motion } from "framer-motion";
import React, { JSX } from "react";

// Define interface for roadmap phase
interface Phase {
  number: string;
  title: string;
  subtitle: string;
  status: "completed" | "current" | "upcoming" | "future";
  features: string[];
  icon: string;
  highlight?: string;
  color: "cyan" | "purple" | "blue" | "pink" | "green";
}

export default function Roadmap(): JSX.Element {
  const phases: Phase[] = [
    {
      number: "01",
      title: "Launch Waitlist + MVP",
      subtitle: "Foundation & Community Building",
      status: "completed",
      features: [
        "Launch landing page & waitlist system",
        "Early adopter community engagement",
        "Authentication & dashboard foundation",
        "Initial user feedback collection",
      ],
      icon: "🚀",
      color: "green",
    },
    {
      number: "02",
      title: "Core Exchange Features",
      subtitle: "Building the Trading Engine",
      status: "current",
      features: [
        "Enable crypto ↔ gift card swapping",
        "Fiat deposits & withdrawals integration",
        "Secure user wallet infrastructure",
        "Blockchain-ready transaction logging",
      ],
      icon: "⚙️",
      highlight: "Currently Building",
      color: "cyan",
    },
    {
      number: "03",
      title: "AI Arbitrage + Group Swaps",
      subtitle: "Intelligent Trading Features",
      status: "upcoming",
      features: [
        "AI-powered arbitrage engine deployment",
        "Community pooling for group swaps",
        "NexRate Rewards System (off-chain)",
        "Real-time rate optimization algorithm",
      ],
      icon: "🤖",
      color: "purple",
    },
    {
      number: "04",
      title: "AI Fraud Detection + Blockchain Settlement",
      subtitle: "Security & Transparency Layer",
      status: "upcoming",
      features: [
        "Real-time AI fraud detection system",
        "Smart rate lock for secure trades",
        "On-chain escrow & trade confirmations",
        "BlockDAG testnet integration begins",
      ],
      icon: "🛡️",
      highlight: "Blockchain Bridge Phase",
      color: "blue",
    },
    {
      number: "05",
      title: "NexRate Utility Token (NXRATE)",
      subtitle: "Token Economy Launch",
      status: "future",
      features: [
        "Official launch of NXRATE utility token",
        "On-chain rewards & loyalty system",
        "Stake NXR for reduced fees & benefits",
        "DAO-style governance voting rights",
        "Buy-back & burn tokenomics live",
      ],
      icon: "💎",
      highlight: "GAME CHANGER 🚀",
      color: "pink",
    },
    {
      number: "06",
      title: "BlockDAG-Powered Exchange Layer",
      subtitle: "Next-Gen Infrastructure",
      status: "future",
      features: [
        "Full BlockDAG network migration",
        "Ultra-fast parallel settlement (10x speed)",
        "First African exchange on BlockDAG",
        "Cross-chain interoperability support",
      ],
      icon: "⚡",
      highlight: "FUTURE-DEFINING STEP",
      color: "cyan",
    },
    {
      number: "07",
      title: "NFT Marketplace + Utility Payments",
      subtitle: "Ecosystem Expansion",
      status: "future",
      features: [
        "NFT & digital asset trading platform",
        "Bill payments with NXRATE token",
        "Decentralized identity (Web3 login)",
        "Complete digital economy integration",
      ],
      icon: "🎨",
      color: "purple",
    },
  ];

  const getStatusColor = (status: Phase["status"]) => {
    const colors = {
      completed: "text-green-400 border-green-500/30 bg-green-500/10",
      current: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
      upcoming: "text-purple-400 border-purple-500/30 bg-purple-500/10",
      future: "text-blue-400 border-blue-500/30 bg-blue-500/10",
    };
    return colors[status];
  };

  const getStatusLabel = (status: Phase["status"]) => {
    const labels = {
      completed: "✓ Completed",
      current: "⚡ In Progress",
      upcoming: "📅 Coming Soon",
      future: "🔮 Planned",
    };
    return labels[status];
  };

  const getPhaseColors = (color: Phase["color"]) => {
    const colors = {
      cyan: {
        gradient: "from-cyan-500 to-cyan-600",
        border: "border-cyan-500/30",
        glow: "shadow-cyan-500/10",
        text: "text-cyan-400",
        bg: "bg-cyan-500/5",
      },
      purple: {
        gradient: "from-purple-500 to-purple-600",
        border: "border-purple-500/30",
        glow: "shadow-purple-500/10",
        text: "text-purple-400",
        bg: "bg-purple-500/5",
      },
      blue: {
        gradient: "from-blue-500 to-blue-600",
        border: "border-blue-500/30",
        glow: "shadow-blue-500/10",
        text: "text-blue-400",
        bg: "bg-blue-500/5",
      },
      pink: {
        gradient: "from-pink-500 to-pink-600",
        border: "border-pink-500/30",
        glow: "shadow-pink-500/10",
        text: "text-pink-400",
        bg: "bg-pink-500/5",
      },
      green: {
        gradient: "from-green-500 to-green-600",
        border: "border-green-500/30",
        glow: "shadow-green-500/10",
        text: "text-green-400",
        bg: "bg-green-500/5",
      },
    };
    return colors[color];
  };

  return (
    <section
      id="roadmap"
      className="py-20 px-6 md:px-16 bg-gradient-to-b from-[#0B0F19] to-[#050810] text-white relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-block mb-4"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-cyan-400 px-6 py-2 rounded-full text-sm font-semibold">
              🗺️ Our Journey
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            The NexRate Roadmap
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From MVP to the first BlockDAG-powered exchange. Here's how we're
            building the future of AI + Blockchain + BlockDAG trading.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Timeline Line (Desktop) */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500/50 via-purple-500/50 to-pink-500/50"></div>

          {/* Phases */}
          <div className="space-y-12 lg:space-y-24">
            {phases.map((phase, index) => {
              const isEven = index % 2 === 0;
              const colors = getPhaseColors(phase.color);

              return (
                <motion.div
                  key={index}
                  className={`relative flex flex-col lg:flex-row items-center gap-8 ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  {/* Phase Card */}
                  <motion.div
                    className={`lg:w-[45%] bg-gradient-to-br from-[#111827] to-[#0B0F19] border ${colors.border} rounded-2xl p-6 shadow-lg ${colors.glow} hover:shadow-2xl transition-all duration-300 relative overflow-hidden group`}
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    {/* Background gradient on hover */}
                    <div
                      className={`absolute inset-0 ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    ></div>

                    {/* Status Badge */}
                    <div
                      className={`inline-flex items-center gap-2 ${getStatusColor(
                        phase.status
                      )} border rounded-full px-4 py-1.5 text-xs font-bold mb-4 relative z-10`}
                    >
                      {getStatusLabel(phase.status)}
                    </div>

                    {/* Highlight Badge */}
                    {phase.highlight && (
                      <div
                        className={`absolute top-6 right-6 bg-gradient-to-r ${colors.gradient} text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-lg animate-pulse`}
                      >
                        {phase.highlight}
                      </div>
                    )}

                    {/* Icon & Title */}
                    <div className="flex items-start gap-4 mb-4 relative z-10">
                      <motion.div
                        className="text-5xl"
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
                        {phase.icon}
                      </motion.div>
                      <div>
                        <h3
                          className={`text-2xl font-bold ${colors.text} mb-1`}
                        >
                          {phase.title}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {phase.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Features List */}
                    <ul className="space-y-2.5 relative z-10">
                      {phase.features.map((feature, idx) => (
                        <motion.li
                          key={idx}
                          className="flex items-start gap-3 text-gray-300 text-sm"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: idx * 0.05 }}
                          viewport={{ once: true }}
                        >
                          <span className={`${colors.text} text-base mt-0.5`}>
                            ✓
                          </span>
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Center Circle (Desktop) */}
                  <motion.div
                    className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-[#111827] to-[#0B0F19] border-4 border-cyan-500 rounded-full items-center justify-center shadow-lg z-20"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <span className="text-cyan-400 font-bold text-sm">
                      {phase.number}
                    </span>
                  </motion.div>

                  {/* Empty space for alternating layout (Desktop) */}
                  <div className="hidden lg:block lg:w-[45%]"></div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Vision Statement */}
        <motion.div
          className="mt-20 text-center bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 border border-cyan-500/30 rounded-2xl p-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            More Than Just an Exchange
          </h3>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-6">
            NexRate isn't just building another trading platform. We're creating
            an
            <span className="text-cyan-400 font-semibold"> AI-powered</span>,
            <span className="text-purple-400 font-semibold">
              {" "}
              blockchain-secured
            </span>
            ,
            <span className="text-pink-400 font-semibold">
              {" "}
              BlockDAG-accelerated
            </span>{" "}
            ecosystem that revolutionizes how people trade, earn, and
            participate in the digital economy.
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <span className="text-cyan-400 text-lg">✓</span>
              <span>First BlockDAG Exchange in Africa</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-purple-400 text-lg">✓</span>
              <span>AI + Blockchain Synergy</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-pink-400 text-lg">✓</span>
              <span>Community-Driven Token Economy</span>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 mb-6 text-lg">
            Be part of this revolutionary journey from day one
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
            Join Early Adopters →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
