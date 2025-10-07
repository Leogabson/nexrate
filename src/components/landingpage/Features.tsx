"use client";
import { motion } from "framer-motion";
import { Bot, Gift, Lightbulb, CheckCircle } from "lucide-react";
import React, { JSX } from "react";

export default function CoreFeatures() {
  const features = [
    {
      icon: Bot,
      title: "Always Get The Best Rate",
      description:
        "Our AI scans 50+ exchanges in real-time to automatically find you the most profitable rates. No manual comparison needed.",
      benefits: [
        "Save up to 15% on every trade",
        "Real-time rate comparison",
        "Instant arbitrage opportunities",
      ],
      accentColor: "#06B6D4", // Cyan
    },
    {
      icon: Gift,
      title: "Gift Cards in 60 Seconds",
      description:
        "Trade your crypto for Netflix, Spotify, Amazon, Apple, and 50+ more brands. Instant email delivery, no waiting.",
      benefits: [
        "20+ cryptocurrencies accepted",
        "Instant digital delivery",
        "Up to 10% discount vs retail",
      ],
      accentColor: "#8B5CF6", // Purple
    },
    {
      icon: Lightbulb,
      title: "Pay Bills With Crypto",
      description:
        "Use your crypto balance to pay electricity, internet, school fees, and subscriptions. Set up recurring payments and never miss a due date.",
      benefits: [
        "Utilities, subscriptions & school fees",
        "Automatic recurring payments",
        "Multi-currency support",
      ],
      accentColor: "#0EA5E9", // Blue
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
            Three Ways NexRate Saves You Money
          </h2>
          <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
            Powered by AI, secured by blockchain, designed for you.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="group bg-white border-2 border-[#E2E8F0] rounded-2xl p-8 transition-all duration-300 hover:border-[#06B6D4] hover:shadow-xl"
              >
                {/* Icon Container */}
                <div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-xl mb-6"
                  style={{ backgroundColor: `${feature.accentColor}15` }}
                >
                  <Icon
                    className="w-8 h-8"
                    style={{ color: feature.accentColor }}
                  />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-[#0F172A] mb-4">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-[#64748B] mb-6 leading-relaxed">
                  {feature.description}
                </p>

                {/* Benefits List */}
                <ul className="space-y-3">
                  {feature.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle
                        className="w-5 h-5 flex-shrink-0 mt-0.5"
                        style={{ color: feature.accentColor }}
                      />
                      <span className="text-sm text-[#64748B]">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
