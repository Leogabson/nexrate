"use client";
import { motion } from "framer-motion";
import { DollarSign, Clock, AlertTriangle } from "lucide-react";

export default function TheProblem() {
  const painPoints = [
    {
      icon: DollarSign,
      title: "Poor Exchange Rates",
      description: "Lose money on hidden fees and unfavorable exchange rates",
    },
    {
      icon: Clock,
      title: "Time-Consuming",
      description: "Waste hours comparing prices across multiple platforms",
    },
    {
      icon: AlertTriangle,
      title: "High Risk",
      description: "Risk scams and fraud on peer-to-peer platforms",
    },
  ];

  return (
    <section className="py-20 bg-[#0F172A]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Tired of Getting Bad Rates on Your Crypto?
          </h2>
        </motion.div>

        {/* Pain Points Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {painPoints.map((point, index) => {
            const Icon = point.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#1E293B] border border-[#F59E0B]/30 rounded-2xl p-8 text-center"
              >
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-[#F59E0B]/10 mb-6">
                  <Icon className="w-8 h-8 text-[#F59E0B]" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3">
                  {point.title}
                </h3>
                <p className="text-[#CBD5E1] text-sm leading-relaxed">
                  {point.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
