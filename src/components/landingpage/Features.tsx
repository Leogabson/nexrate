"use client";
import { motion } from "framer-motion";

export default function Features() {
  const features = [
    {
      title: "AI Arbitrage Finder",
      desc: "Get real-time profitable arbitrage opportunities across multiple exchanges, powered by AI insights.",
    },
    {
      title: "Swap & Save (Group Swaps)",
      desc: "Pool swaps with friends or the community to unlock better rates and maximize your savings.",
    },
    {
      title: "Smart Rate Lock",
      desc: "Avoid volatility by locking the exchange rate for a few minutes. A small fee applies for stability.",
    },
    {
      title: "Instant Crypto-to-Giftcard Checkout",
      desc: "Purchase Netflix, Spotify, Apple, and more directly with crypto. Enjoy instant digital delivery.",
    },
    {
      title: "Crypto-to-Bill Payment",
      desc: "Pay utility bills, school fees, and subscriptions with your crypto balance. Supports recurring payments.",
    },
    {
      title: "AI Fraud Detection & Trade Scoring",
      desc: "Stay safe with real-time AI fraud detection. Every trade comes with a trust score to prevent scams.",
    },
    {
      title: "NFT & Digital Asset Marketplace",
      desc: "Buy, sell, and trade NFTs or digital assets seamlessly. Wallets like MetaMask are fully supported.",
    },
  ];

  return (
    <section
      id="features"
      className="py-20 px-6 md:px-16 bg-[#0B0F19] text-white"
    >
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-6"
        >
          Powerful Features for Smarter Trading
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg text-gray-300 mb-12"
        >
          NexRate is more than just a swap platform. Explore the tools that make
          us fast, smarter, and safer.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#111827] p-6 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition"
            >
              <h3 className="text-xl font-semibold text-cyan-400 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
