"use client";
import { motion } from "framer-motion";

export default function Features() {
  return (
    <section id="features" className="py-20 bg-[#0B0F19] text-[#E2E8F0]">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-12 text-cyan-400">Features</h2>

        <div className="grid md:grid-cols-3 gap-12">
          <div className="bg-[#111827] p-6 rounded-lg shadow-md hover:shadow-cyan-500/20 transition">
            <h3 className="text-xl font-semibold text-purple-400 mb-2">
              AI Arbitrage Finder
            </h3>
            <p className="text-gray-400">
              Get real-time profitable arbitrage opportunities across multiple
              exchanges.
            </p>
          </div>

          <div className="bg-[#111827] p-6 rounded-lg shadow-md hover:shadow-cyan-500/20 transition">
            <h3 className="text-xl font-semibold text-purple-400 mb-2">
              Swap & Save
            </h3>
            <p className="text-gray-400">
              Pool swaps with friends and unlock better exchange rates together.
            </p>
          </div>

          <div className="bg-[#111827] p-6 rounded-lg shadow-md hover:shadow-cyan-500/20 transition">
            <h3 className="text-xl font-semibold text-purple-400 mb-2">
              Rate Lock
            </h3>
            <p className="text-gray-400">
              Lock your exchange rate for a few minutes to avoid market
              volatility.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
