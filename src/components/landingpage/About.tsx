"use client";
import { motion } from "framer-motion";
export default function About() {
  return (
    <section id="about" className="py-20 bg-[#0B0F19] text-[#E2E8F0]">
      <div className="max-w-6xl mx-auto px-6 text-center md:text-left">
        <h2 className="text-4xl font-bold mb-8 text-cyan-400">
          Why Choose NexRate?
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text */}
          <div>
            <p className="text-lg text-gray-300 mb-6">
              NexRate isn’t just another crypto and gift card platform. We’re
              building a secure, community-driven ecosystem that puts{" "}
              <span className="text-cyan-400 font-semibold">trust</span>,
              <span className="text-purple-400 font-semibold"> speed</span>, and
              <span className="text-cyan-400 font-semibold">
                {" "}
                innovation
              </span>{" "}
              at the core of digital transactions.
            </p>
            <ul className="space-y-4 text-gray-400">
              <li>
                ✅ AI-Powered Arbitrage Finder – spot profitable opportunities
              </li>
              <li>
                ✅ Group Swap Discounts – better rates when you trade with
                friends
              </li>
              <li>✅ Instant Crypto-to-Giftcard & Bill Payments</li>
              <li>✅ Smart Rate Lock – protect yourself from volatility</li>
              <li>✅ AI Fraud Detection for safer trading</li>
            </ul>
          </div>

          {/* Right Side - Illustration */}
          <div className="flex justify-center">
            <img
              src="/about-illustration.png"
              alt="Why NexRate Illustration"
              className="w-96"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
