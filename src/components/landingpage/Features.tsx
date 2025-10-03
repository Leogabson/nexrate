"use client";
import { motion } from "framer-motion";
import React, { JSX } from "react";

// Define interface for feature data
interface Feature {
  title: string;
  desc: string;
  details: string[];
  icon: string;
  color: "cyan" | "purple" | "blue" | "pink";
  badge?: string;
}

export default function Features(): JSX.Element {
  const features: Feature[] = [
    {
      title: "AI Arbitrage Finder",
      desc: "Let artificial intelligence discover profitable opportunities across exchanges automatically.",
      details: [
        "Real-time scanning of 50+ exchanges",
        "Profit margin calculations in seconds",
        "Auto-alert for best opportunities",
        "Historical data analysis & trends",
      ],
      icon: "🤖",
      color: "cyan",
      badge: "AI-Powered",
    },
    {
      title: "Group Swap Discounts",
      desc: "Pool your trades with friends or the community to unlock better rates and maximize savings.",
      details: [
        "Up to 15% discount on pooled swaps",
        "Create private or public swap groups",
        "Instant settlement for all participants",
        "Smart matching algorithm",
      ],
      icon: "👥",
      color: "purple",
      badge: "Community",
    },
    {
      title: "Smart Rate Lock",
      desc: "Protect yourself from market volatility by locking exchange rates for a secure trading window.",
      details: [
        "Lock rates for up to 15 minutes",
        "Small fee for stability guarantee",
        "Real-time rate comparison",
        "Cancel anytime before execution",
      ],
      icon: "🔒",
      color: "blue",
      badge: "Security",
    },
    {
      title: "Instant Crypto-to-Giftcard",
      desc: "Purchase gift cards from top brands directly with cryptocurrency for instant digital delivery.",
      details: [
        "Netflix, Spotify, Apple, Amazon & more",
        "Instant email delivery",
        "Support for 20+ cryptocurrencies",
        "Discounts up to 10% off retail",
      ],
      icon: "🎁",
      color: "pink",
      badge: "Popular",
    },
    {
      title: "Crypto Bill Payments",
      desc: "Pay your utility bills, school fees, and subscriptions seamlessly using your crypto balance.",
      details: [
        "Electricity, water, internet bills",
        "School fees & tuition payments",
        "Recurring payment automation",
        "Multi-currency support",
      ],
      icon: "💳",
      color: "cyan",
      badge: "Convenience",
    },
    {
      title: "AI Fraud Detection",
      desc: "Stay protected with real-time AI fraud detection and trust scoring for every transaction.",
      details: [
        "Machine learning fraud patterns",
        "Trust score for every trader",
        "Automatic suspicious activity flags",
        "24/7 transaction monitoring",
      ],
      icon: "🛡️",
      color: "purple",
      badge: "Security",
    },
    {
      title: "On-Chain Escrow",
      desc: "All transactions are secured with blockchain-based smart contract escrow for full transparency.",
      details: [
        "Zero-trust escrow system",
        "Smart contract automation",
        "Immutable transaction records",
        "Dispute resolution protocol",
      ],
      icon: "🔗",
      color: "blue",
      badge: "Blockchain",
    },
    {
      title: "BlockDAG Speed",
      desc: "Experience ultra-fast parallel transaction processing powered by BlockDAG infrastructure.",
      details: [
        "10x faster than traditional blockchains",
        "Parallel transaction confirmation",
        "Near-zero latency trades",
        "Scalable to millions of TPS",
      ],
      icon: "⚡",
      color: "cyan",
      badge: "Innovation",
    },
    {
      title: "NXRATE Token Rewards",
      desc: "Earn NexRate tokens on every trade, stake for benefits, and participate in governance.",
      details: [
        "Earn on trades, referrals & staking",
        "Reduced fees with token holdings",
        "DAO governance voting rights",
        "Buy-back & burn tokenomics",
      ],
      icon: "💎",
      color: "pink",
      badge: "Rewards",
    },
    {
      title: "Multi-Wallet Support",
      desc: "Connect and manage multiple crypto wallets seamlessly from a single dashboard.",
      details: [
        "MetaMask, Trust Wallet, Coinbase",
        "Hardware wallet integration",
        "Portfolio tracking & analytics",
        "One-click wallet switching",
      ],
      icon: "👛",
      color: "purple",
      badge: "Flexibility",
    },
    {
      title: "Cross-Chain Trading",
      desc: "Trade assets across different blockchain networks without leaving the platform.",
      details: [
        "Support for 15+ blockchain networks",
        "Automatic chain bridging",
        "Unified liquidity pools",
        "Lowest cross-chain fees",
      ],
      icon: "🌐",
      color: "blue",
      badge: "Web3",
    },
    {
      title: "NFT Marketplace",
      desc: "Buy, sell, and trade NFTs and digital assets with integrated marketplace features.",
      details: [
        "Create & mint NFTs easily",
        "Royalty management system",
        "Trending collections & analytics",
        "Low gas fee optimization",
      ],
      icon: "🎨",
      color: "cyan",
      badge: "Coming Soon",
    },
  ];

  const getColorClasses = (color: Feature["color"]) => {
    const colors = {
      cyan: {
        badge: "from-cyan-500 to-cyan-600",
        border: "border-cyan-500/30",
        glow: "shadow-cyan-500/10",
        text: "text-cyan-400",
        bg: "bg-cyan-500/5",
      },
      purple: {
        badge: "from-purple-500 to-purple-600",
        border: "border-purple-500/30",
        glow: "shadow-purple-500/10",
        text: "text-purple-400",
        bg: "bg-purple-500/5",
      },
      blue: {
        badge: "from-blue-500 to-blue-600",
        border: "border-blue-500/30",
        glow: "shadow-blue-500/10",
        text: "text-blue-400",
        bg: "bg-blue-500/5",
      },
      pink: {
        badge: "from-pink-500 to-pink-600",
        border: "border-pink-500/30",
        glow: "shadow-pink-500/10",
        text: "text-pink-400",
        bg: "bg-pink-500/5",
      },
    };
    return colors[color];
  };

  return (
    <section
      id="features"
      className="py-20 px-6 md:px-16 bg-[#0B0F19] text-white relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 right-20 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
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
              💡 Core Capabilities
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Powerful Features for Smarter Trading
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            NexRate combines cutting-edge AI, blockchain security, and BlockDAG
            speed to deliver the ultimate trading experience. Explore what makes
            us different.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => {
            const colorClasses = getColorClasses(feature.color);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="cursor-pointer"
              >
                <div
                  className={`bg-gradient-to-br from-[#111827] to-[#0B0F19] border ${colorClasses.border} rounded-2xl p-6 shadow-lg ${colorClasses.glow} hover:shadow-2xl transition-all duration-300 h-full relative overflow-hidden group`}
                >
                  {/* Background gradient on hover */}
                  <div
                    className={`absolute inset-0 ${colorClasses.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  ></div>

                  {/* Badge */}
                  {feature.badge && (
                    <motion.div
                      className={`absolute top-4 right-4 bg-gradient-to-r ${colorClasses.badge} text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg`}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 + 0.2 }}
                      viewport={{ once: true }}
                    >
                      {feature.badge}
                    </motion.div>
                  )}

                  {/* Icon */}
                  <motion.div
                    className="text-5xl mb-4 relative z-10"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.2,
                    }}
                  >
                    {feature.icon}
                  </motion.div>

                  {/* Content */}
                  <h3
                    className={`text-xl font-bold ${colorClasses.text} mb-2 relative z-10`}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 mb-4 text-sm relative z-10">
                    {feature.desc}
                  </p>

                  {/* Details List */}
                  <ul className="space-y-2 relative z-10">
                    {feature.details.map((detail, idx) => (
                      <motion.li
                        key={idx}
                        className="flex items-start gap-2 text-gray-300 text-xs"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                        viewport={{ once: true }}
                      >
                        <span className={`${colorClasses.text} text-sm mt-0.5`}>
                          ✓
                        </span>
                        <span>{detail}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Technology Stack Showcase */}
        <motion.div
          className="bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 border border-cyan-500/30 rounded-2xl p-8 mb-12"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Built on Cutting-Edge Technology
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "🤖",
                title: "Artificial Intelligence",
                desc: "Machine learning models for arbitrage, fraud detection, and rate optimization",
                features: [
                  "Neural networks",
                  "Predictive analytics",
                  "Auto-optimization",
                ],
              },
              {
                icon: "🔗",
                title: "Blockchain Security",
                desc: "Smart contracts and on-chain escrow for transparent, trustless transactions",
                features: [
                  "Immutable ledger",
                  "Zero-trust escrow",
                  "Multi-sig wallets",
                ],
              },
              {
                icon: "⚡",
                title: "BlockDAG Infrastructure",
                desc: "Next-gen parallel processing for ultra-fast, scalable transaction settlement",
                features: [
                  "Parallel confirmation",
                  "Sub-second finality",
                  "Infinite scalability",
                ],
              },
            ].map((tech, idx) => (
              <motion.div
                key={idx}
                className="bg-[#0B0F19] rounded-xl p-6 border border-gray-700 hover:border-cyan-500/50 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-3">{tech.icon}</div>
                <h4 className="text-xl font-bold text-cyan-400 mb-2">
                  {tech.title}
                </h4>
                <p className="text-gray-400 text-sm mb-4">{tech.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {tech.features.map((feat, i) => (
                    <span
                      key={i}
                      className="text-xs bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {[
            { value: "50+", label: "Supported Exchanges", icon: "🏦" },
            { value: "10x", label: "Faster Transactions", icon: "⚡" },
            { value: "99.9%", label: "Uptime Guarantee", icon: "🔒" },
            { value: "24/7", label: "AI Monitoring", icon: "👁️" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className="bg-gradient-to-br from-[#111827] to-[#0B0F19] border border-gray-700 rounded-xl p-6 text-center hover:border-cyan-500/50 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-cyan-400 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-2xl p-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
            Experience the Future of Trading
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Don't miss out on being part of the revolution. Join our waitlist
            today and be among the first to earn NXR tokens and enjoy exclusive
            early adopter benefits.
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
            Join the Waitlist →
          </motion.button>
          <p className="text-sm text-gray-400 mt-4">
            ✓ Early access to NXR rewards • ✓ Exclusive launch perks • ✓
            Priority support
          </p>
        </motion.div>
      </div>
    </section>
  );
}
