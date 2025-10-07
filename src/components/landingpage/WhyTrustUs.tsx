"use client";
import { motion } from "framer-motion";
import { Shield, ShieldAlert, BarChart3 } from "lucide-react";

export default function WhyTrust() {
  const trustPillars = [
    {
      icon: Shield,
      title: "Blockchain Security",
      description: "All trades secured with smart contract escrow",
      features: ["Immutable transaction records", "Zero-trust architecture"],
      color: "#06B6D4", // Cyan
    },
    {
      icon: ShieldAlert,
      title: "AI Fraud Detection",
      description: "Real-time monitoring of all transactions",
      features: [
        "Machine learning fraud patterns",
        "Trust score for every user",
      ],
      color: "#8B5CF6", // Purple
    },
    {
      icon: BarChart3,
      title: "Transparent Operations",
      description: "Open-source smart contracts (coming soon)",
      features: ["Regular security audits", "Community-driven roadmap"],
      color: "#0EA5E9", // Blue
    },
  ];

  return (
    <section className="py-20 bg-[#0F172A]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Built on Security, Transparency & Trust
          </h2>
        </motion.div>

        {/* Trust Pillars Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {trustPillars.map((pillar, index) => {
            const Icon = pillar.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="bg-[#1E293B] border border-[#CBD5E1]/20 rounded-2xl p-8 text-center hover:border-[#CBD5E1]/40 transition-all duration-300"
              >
                {/* Icon */}
                <div
                  className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6"
                  style={{ backgroundColor: `${pillar.color}15` }}
                >
                  <Icon className="w-10 h-10" style={{ color: pillar.color }} />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-4">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="text-[#CBD5E1] mb-6 leading-relaxed">
                  {pillar.description}
                </p>

                {/* Features */}
                <ul className="space-y-3">
                  {pillar.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm text-[#CBD5E1]"
                    >
                      <span
                        className="text-lg leading-none flex-shrink-0"
                        style={{ color: pillar.color }}
                      >
                        •
                      </span>
                      <span className="text-left">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Important Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 max-w-3xl mx-auto text-center"
        >
          <p className="text-sm text-[#64748B] italic">
            Note: Some features are in development. We&apos;re committed to
            transparency and will update you on our progress.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
