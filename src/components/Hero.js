"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-16">
      <div className="max-w-xl text-center md:text-left">
        <h2 className="text-4xl md:text-5xl font-bold leading-tight">
          Swap, Buy & Sell <span className="text-cyan-400">Crypto</span> and
          Gift Cards Seamlessly
        </h2>

        <p className="mt-4 text-gray-400">
          Fast, secure, and reliable platform for your digital transactions.
        </p>

        <div className="mt-6 flex gap-4 justify-center md:justify-start">
          <button
            onClick={() => {
              document
                .getElementById("contact")
                .scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-gradient-to-r from-cyan-400 to-purple-500 text-white px-6 py-3 rounded-lg hover:opacity-90"
          >
            Get Started
          </button>
          <button
            onClick={() => {
              document
                .getElementById("about")
                .scrollIntoView({ behavior: "smooth" });
            }}
            className="border border-cyan-400 text-cyan-400 px-6 py-3 rounded-lg hover:bg-cyan-400 hover:text-black"
          >
            Learn More
          </button>
        </div>
      </div>

      <div className="mt-8 md:mt-0">
        <img
          src="/hero-illustration.png"
          alt="Trading Illustration"
          className="w-96"
        />
      </div>
    </section>
  );
}
