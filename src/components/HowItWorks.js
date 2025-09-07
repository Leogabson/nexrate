"use client";
import { motion } from "framer-motion";

export default function HowItWorks() {
  return (
    <section id="how" className="py-16 px-6 md:px-16">
      <h3 className="text-3xl font-bold text-center text-cyan-400">
        How It Works
      </h3>
      <p className="mt-2 text-center text-gray-400">
        Trade in just 3 easy steps
      </p>

      <div className="mt-10 grid gap-10 md:grid-cols-3 text-center">
        <div>
          <div className="text-4xl font-bold text-purple-400">1</div>
          <h4 className="mt-2 text-xl font-semibold text-cyan-400">Sign Up</h4>
          <p className="mt-2 text-gray-400">
            Create your free NexRate account in minutes.
          </p>
        </div>
        <div>
          <div className="text-4xl font-bold text-purple-400">2</div>
          <h4 className="mt-2 text-xl font-semibold text-cyan-400">
            Choose Transaction
          </h4>
          <p className="mt-2 text-gray-400">
            Select crypto, gift cards, or bill payments.
          </p>
        </div>
        <div>
          <div className="text-4xl font-bold text-purple-400">3</div>
          <h4 className="mt-2 text-xl font-semibold text-cyan-400">
            Complete Trade
          </h4>
          <p className="mt-2 text-gray-400">
            Enjoy fast, secure, and reliable transactions.
          </p>
        </div>
      </div>
    </section>
  );
}
