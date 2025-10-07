"use client";
import { motion } from "framer-motion";
import React, { JSX } from "react";

// Define interface for token benefit
interface TokenBenefit {
  icon: string;
  title: string;
  description: string;
  features: string[];
  color: "cyan" | "purple" | "pink";
}

export default function TokenTeaser(): JSX.Element {
  const benefits: TokenBenefit[] = [
    {
      icon: "🎁",
      title: "Earn Rewards",
      description: "Get NXR tokens for every activity on the platform",
      features: [
        "Trade rewards on every swap",
        "Referral bonuses for invites",
        "Activity multipliers",
        "Loyalty tier benefits",
      ],
      color: "cyan",
    },
    {
      icon: "💰",
      title: "Stake & Save",
      description: "Lock your tokens to unlock premium benefits",
      features: [
        "Up to 50% reduced trading fees",
        "Priority customer support",
        "Early access to new features",
        "Higher transaction limits",
      ],
      color: "purple",
    },
    {
      icon: "🔄",
      title: "Redeem & Spend",
      description: "Use NXR tokens across the entire ecosystem",
      features: [
        "Pay for gift cards with NXR",
        "Cover trading fees instantly",
        "Access premium swap pools",
        "Bill payments with tokens",
      ],
      color: "pink",
    },
    {
      icon: "🗳️",
      title: "Govern & Influence",
      description: "Shape the future with DAO-style voting rights",
      features: [
        "Vote on new features",
        "Propose platform changes",
        "Decide on token burns",
        "Community-driven development",
      ],
      color: "cyan",
    },
  ];

  const getColorClasses = (color: TokenBenefit["color"]) => {
    const colors = {
      cyan: {
        gradient: "from-cyan-500 to-cyan-600",
        border: "border-cyan-500/30",
        glow: "shadow-cyan-500/20",
        text: "text-cyan-400",
        bg: "bg-cyan-500/10",
      },
      purple: {
        gradient: "from-purple-500 to-purple-600",
        border: "border-purple-500/30",
        glow: "shadow-purple-500/20",
        text: "text-purple-400",
        bg: "bg-purple-500/10",
      },
      pink: {
        gradient: "from-pink-500 to-pink-600",
        border: "border-pink-500/30",
        glow: "shadow-pink-500/20",
        text: "text-pink-400",
        bg: "bg-pink-500/10",
      },
    };
    return colors[color];
  };

  return (
    <section className="py-20 px-6 md:px-16 bg-[#1E293B] text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-block mb-6"
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-xl opacity-50"></div>
              <span className="relative bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg inline-block">
                💎 Coming Soon
              </span>
            </div>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Introducing NexRate Token
            </span>
            <br />
            <span className="text-white text-4xl md:text-5xl">(NXRATE)</span>
          </motion.h2>

          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            More than just a token — it's your key to the entire NexRate
            ecosystem. Earn, stake, redeem, and govern the future of digital
            trading.
          </motion.p>
        </motion.div>

        {/* Token Visual Centerpiece */}
        <motion.div
          className="flex justify-center mb-16"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="relative"
            animate={{
              y: [-10, 10, -10],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Token Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full blur-2xl opacity-30"></div>

            {/* Token Circle */}
            <div className="relative w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl">
              <div className="w-44 h-44 md:w-60 md:h-60 bg-[#0B0F19] rounded-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl md:text-6xl mb-2">💎</div>
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    NXRATE
                  </div>
                </div>
              </div>
            </div>

            {/* Orbiting Icons */}
            {["🎁", "💰", "🔄", "🗳️"].map((icon, index) => {
              const angle = index * 90 * (Math.PI / 180);
              const radius = 140;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <motion.div
                  key={index}
                  className="absolute w-12 h-12 bg-gradient-to-br from-[#111827] to-[#0B0F19] border-2 border-cyan-500 rounded-full flex items-center justify-center text-2xl shadow-lg"
                  style={{
                    left: "50%",
                    top: "50%",
                  }}
                  animate={{
                    x: [x, x * 1.1, x],
                    y: [y, y * 1.1, y],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                    delay: index * 0.5,
                  }}
                >
                  {icon}
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {benefits.map((benefit, index) => {
            const colors = getColorClasses(benefit.color);

            return (
              <motion.div
                key={index}
                className={`bg-gradient-to-br from-[#111827] to-[#0B0F19] border ${colors.border} rounded-2xl p-8 ${colors.glow} hover:shadow-2xl transition-all duration-300 relative overflow-hidden group`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                {/* Background gradient on hover */}
                <div
                  className={`absolute inset-0 ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                ></div>

                {/* Icon */}
                <motion.div
                  className="text-6xl mb-4 relative z-10"
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
                  {benefit.icon}
                </motion.div>

                {/* Content */}
                <h3
                  className={`text-2xl font-bold ${colors.text} mb-2 relative z-10`}
                >
                  {benefit.title}
                </h3>
                <p className="text-gray-400 mb-4 relative z-10">
                  {benefit.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 relative z-10">
                  {benefit.features.map((feature, idx) => (
                    <motion.li
                      key={idx}
                      className="flex items-start gap-2 text-gray-300 text-sm"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
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
            );
          })}
        </div>

        {/* Tokenomics Section */}
        <motion.div
          className="bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 border border-cyan-500/30 rounded-2xl p-8 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Smart Tokenomics Built for Growth
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "🔥",
                title: "Buy-Back & Burn",
                desc: "Platform fees fund token buy-backs and burns, reducing supply and increasing value over time.",
              },
              {
                icon: "🔒",
                title: "Staking Rewards",
                desc: "Lock your NXR tokens to earn APY rewards while enjoying reduced fees and premium features.",
              },
              {
                icon: "🌐",
                title: "Cross-Platform Utility",
                desc: "Use NXR across trading, gift cards, bill payments, NFTs, and the entire NexRate ecosystem.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-5xl mb-3">{item.icon}</div>
                <h4 className="text-xl font-bold text-cyan-400 mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technology Integration */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-white mb-6">
            Powered by Blockchain & BlockDAG
          </h3>
          <div className="flex flex-wrap justify-center gap-6 text-gray-400">
            <div className="flex items-center gap-2">
              <span className="text-cyan-400 text-xl">⚡</span>
              <span>Ultra-fast BlockDAG transactions</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-purple-400 text-xl">🔗</span>
              <span>Secure blockchain infrastructure</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-pink-400 text-xl">🌍</span>
              <span>Cross-chain compatibility</span>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center bg-gradient-to-br from-[#111827] to-[#0B0F19] border border-cyan-500/30 rounded-2xl p-10 shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold mb-4 text-white">
            Be First to Earn NXRATE Tokens
          </h3>
          <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
            Join our waitlist now and get early access to NXR token rewards when
            we launch. Early adopters receive exclusive bonuses and multipliers.
          </p>

          <motion.button
            onClick={() => {
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white px-10 py-4 rounded-lg font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">
              Join Waitlist & Earn Rewards →
            </span>
            <motion.div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </motion.button>

          <p className="text-sm text-gray-400 mt-6">
            ✓ Early adopter bonuses • ✓ Token airdrop eligibility • ✓ Exclusive
            perks
          </p>
        </motion.div>
      </div>
    </section>
  );
}
