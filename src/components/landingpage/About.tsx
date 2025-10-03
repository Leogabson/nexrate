"use client";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-20 bg-[#0B0F19] text-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Why Choose NexRate?
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We're not just another exchange. We're building the future of
            digital trading with AI, Blockchain, and BlockDAG technology.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          {/* Left Side - Detailed Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold text-cyan-400 mb-3">
                The NexRate Vision
              </h3>
              <p className="text-gray-300 leading-relaxed">
                NexRate is a next-generation crypto and gift card exchange
                platform that combines
                <span className="text-cyan-400 font-semibold">
                  {" "}
                  artificial intelligence
                </span>
                ,
                <span className="text-purple-400 font-semibold">
                  {" "}
                  blockchain technology
                </span>
                , and
                <span className="text-cyan-400 font-semibold">
                  {" "}
                  BlockDAG infrastructure
                </span>{" "}
                to deliver the fastest, safest, and most profitable trading
                experience.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-purple-400 mb-3">
                Our Unique Approach
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Unlike traditional exchanges that rely on outdated
                infrastructure, NexRate leverages:
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 text-xl">🤖</span>
                  <div>
                    <strong className="text-cyan-400">
                      AI-Powered Intelligence:
                    </strong>{" "}
                    Our proprietary arbitrage engine scans multiple exchanges in
                    real-time to find you the best rates and profitable
                    opportunities automatically.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 text-xl">🔗</span>
                  <div>
                    <strong className="text-purple-400">
                      Blockchain Security:
                    </strong>{" "}
                    All transactions are secured with on-chain escrow and smart
                    contracts, ensuring transparency and eliminating fraud
                    risks.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 text-xl">⚡</span>
                  <div>
                    <strong className="text-cyan-400">BlockDAG Speed:</strong>{" "}
                    We're pioneering the first BlockDAG-powered exchange
                    infrastructure for parallel transaction processing — faster
                    than any traditional blockchain.
                  </div>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Right Side - Illustration */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <img
                src="/about-illustration.png"
                alt="Why NexRate Illustration"
                className="w-full max-w-md"
              />
              {/* Floating badge */}
              <motion.div
                className="absolute -top-4 -right-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-2 rounded-full shadow-lg text-sm font-bold"
                animate={{
                  y: [-5, 5, -5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                🚀 Innovation First
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* NexRate Token (NXRATE) Section */}
        <motion.div
          className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-2xl p-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text mb-3">
              Introducing NexRate Token (NXRATE) 💎
            </h3>
            <p className="text-gray-300 text-lg">
              More than just an exchange — we're building a complete token
              economy
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#0B0F19] p-6 rounded-xl border border-cyan-500/20">
              <div className="text-3xl mb-3">🎁</div>
              <h4 className="text-xl font-bold text-cyan-400 mb-2">
                Earn Rewards
              </h4>
              <p className="text-gray-400 text-sm">
                Get NXRATE tokens for every trade, referral, and platform
                activity. The more you use NexRate, the more you earn.
              </p>
            </div>

            <div className="bg-[#0B0F19] p-6 rounded-xl border border-purple-500/20">
              <div className="text-3xl mb-3">💰</div>
              <h4 className="text-xl font-bold text-purple-400 mb-2">
                Stake & Save
              </h4>
              <p className="text-gray-400 text-sm">
                Stake your NXRATE tokens to unlock reduced trading fees,
                priority support, and exclusive features.
              </p>
            </div>

            <div className="bg-[#0B0F19] p-6 rounded-xl border border-cyan-500/20">
              <div className="text-3xl mb-3">🗳️</div>
              <h4 className="text-xl font-bold text-cyan-400 mb-2">
                Governance Rights
              </h4>
              <p className="text-gray-400 text-sm">
                Participate in DAO-style voting to shape the future of NexRate.
                Your token, your voice.
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              <span className="text-cyan-400 font-semibold">Tokenomics:</span>{" "}
              Built with a buy-back & burn mechanism from platform fees to
              ensure long-term value.
            </p>
          </div>
        </motion.div>

        {/* Key Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-center mb-10 text-cyan-400">
            What Sets Us Apart
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "🔍",
                title: "AI Arbitrage Finder",
                desc: "Discover profitable trading opportunities across multiple exchanges automatically.",
              },
              {
                icon: "👥",
                title: "Group Swap Discounts",
                desc: "Pool swaps with friends or community to unlock better rates and maximize savings.",
              },
              {
                icon: "🔒",
                title: "Smart Rate Lock",
                desc: "Protect yourself from volatility by locking exchange rates for stable trading.",
              },
              {
                icon: "🎫",
                title: "Instant Crypto-to-Giftcard",
                desc: "Purchase Netflix, Spotify, Apple, and more directly with crypto — instant delivery.",
              },
              {
                icon: "💳",
                title: "Bill Payments",
                desc: "Pay utility bills, school fees, and subscriptions with your crypto balance seamlessly.",
              },
              {
                icon: "🛡️",
                title: "AI Fraud Detection",
                desc: "Stay safe with real-time AI fraud detection and trust scoring for every trade.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-[#111827] p-6 rounded-xl border border-gray-700 hover:border-cyan-500/50 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h4 className="text-xl font-bold text-cyan-400 mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust & Security Section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-purple-400 mb-6">
            Built on Trust, Security & Innovation
          </h3>
          <div className="flex flex-wrap justify-center gap-8 text-gray-400">
            <div className="flex items-center gap-2">
              <span className="text-cyan-400 text-xl">✓</span>
              <span>On-Chain Transparency</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-cyan-400 text-xl">✓</span>
              <span>Smart Contract Escrow</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-cyan-400 text-xl">✓</span>
              <span>AI-Powered Security</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-cyan-400 text-xl">✓</span>
              <span>Community-Driven</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
