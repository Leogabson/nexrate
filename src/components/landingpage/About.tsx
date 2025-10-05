"use client";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      className="py-20 bg-[#0B0F19] text-[#E2E8F0] relative overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
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
              💡 About NexRate
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Why Choose NexRate?
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We&apos;re not just another exchange. We&apos;re building the future
            of digital trading.
          </p>
        </motion.div>

        {/* Main Vision Cards */}
        <div className="grid lg:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: "🤖",
              title: "AI-Powered Intelligence",
              desc: "Our proprietary arbitrage engine scans exchanges in real-time to find you the best rates automatically.",
              color: "cyan",
              features: [
                "Real-time scanning",
                "Profit calculations",
                "Auto-alerts",
                "Pattern analysis",
              ],
            },
            {
              icon: "🔗",
              title: "Blockchain Security",
              desc: "All transactions secured with on-chain escrow and smart contracts for complete transparency.",
              color: "purple",
              features: [
                "Smart contracts",
                "On-chain escrow",
                "Zero fraud risk",
                "Immutable records",
              ],
            },
            {
              icon: "⚡",
              title: "BlockDAG Speed",
              desc: "First exchange with BlockDAG infrastructure for parallel transaction processing — 10x faster.",
              color: "blue",
              features: [
                "Parallel processing",
                "Sub-second finality",
                "Infinite scalability",
                "Ultra-low fees",
              ],
            },
          ].map((item, index) => {
            const colors = {
              cyan: "from-cyan-500/10 to-cyan-600/10 border-cyan-500/30",
              purple:
                "from-purple-500/10 to-purple-600/10 border-purple-500/30",
              blue: "from-blue-500/10 to-blue-600/10 border-blue-500/30",
            };

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`bg-gradient-to-br ${
                  colors[item.color as keyof typeof colors]
                } backdrop-blur-xl border rounded-2xl p-8 relative overflow-hidden group cursor-pointer`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative z-10">
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {item.desc}
                  </p>

                  <div className="space-y-2">
                    {item.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-sm text-gray-400"
                      >
                        <span className="text-cyan-400">✓</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* NXR Token Highlight */}
        <motion.div
          className="bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 border border-cyan-500/30 rounded-3xl p-8 md:p-12 mb-16 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl"></div>

          <div className="relative z-10 text-center mb-8">
            <div className="text-6xl mb-4">💎</div>
            <h3 className="text-3xl md:text-4xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text mb-3">
              Introducing NexRate Token (NXRATE)
            </h3>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              More than just an exchange — we&apos;re building a complete token
              economy
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 relative z-10">
            {[
              {
                icon: "🎁",
                title: "Earn Rewards",
                desc: "Get NXRATE tokens for every trade, referral, and platform activity.",
                color: "cyan",
              },
              {
                icon: "💰",
                title: "Stake & Save",
                desc: "Stake your tokens to unlock reduced fees and exclusive features.",
                color: "purple",
              },
              {
                icon: "🗳️",
                title: "Governance Rights",
                desc: "Vote on platform decisions and shape the future of NexRate.",
                color: "pink",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="bg-[#0B0F19] rounded-xl p-6 border border-gray-700 hover:border-cyan-500/50 transition-all"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h4 className="text-xl font-bold text-white mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-center mb-10 text-cyan-400">
            What Sets Us Apart
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "🔍",
                title: "AI Arbitrage Finder",
                desc: "Discover profitable opportunities across exchanges automatically.",
              },
              {
                icon: "👥",
                title: "Group Swap Discounts",
                desc: "Pool swaps with friends to unlock better rates and savings.",
              },
              {
                icon: "🔒",
                title: "Smart Rate Lock",
                desc: "Protect yourself from volatility by locking exchange rates.",
              },
              {
                icon: "🎫",
                title: "Instant Gift Cards",
                desc: "Buy Netflix, Spotify, Apple with crypto — instant delivery.",
              },
              {
                icon: "💳",
                title: "Bill Payments",
                desc: "Pay utilities and subscriptions seamlessly with crypto.",
              },
              {
                icon: "🛡️",
                title: "AI Fraud Detection",
                desc: "Stay safe with real-time fraud detection and trust scoring.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-[#111827] border border-gray-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold text-cyan-400 mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          className="text-center bg-gradient-to-br from-gray-800/30 to-gray-900/30 border border-gray-700 rounded-2xl p-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-purple-400 mb-6">
            Built on Trust, Security & Innovation
          </h3>
          <div className="flex flex-wrap justify-center gap-6 text-gray-400">
            <div className="flex items-center gap-2 bg-[#0B0F19] px-4 py-2 rounded-lg">
              <span className="text-cyan-400 text-xl">✓</span>
              <span>On-Chain Transparency</span>
            </div>
            <div className="flex items-center gap-2 bg-[#0B0F19] px-4 py-2 rounded-lg">
              <span className="text-cyan-400 text-xl">✓</span>
              <span>Smart Contract Escrow</span>
            </div>
            <div className="flex items-center gap-2 bg-[#0B0F19] px-4 py-2 rounded-lg">
              <span className="text-cyan-400 text-xl">✓</span>
              <span>AI-Powered Security</span>
            </div>
            <div className="flex items-center gap-2 bg-[#0B0F19] px-4 py-2 rounded-lg">
              <span className="text-cyan-400 text-xl">✓</span>
              <span>Community-Driven</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
