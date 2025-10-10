"use client";
import { motion } from "framer-motion";
import Image from "next/image";
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
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Textual content (header + pillars + note) */}
          <div>
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Built on Security, Transparency & Trust
              </h2>
              <p className="text-sm text-[#64748B] max-w-2xl">
                We combine cutting-edge blockchain security, AI-driven fraud
                detection and transparent operations to ensure your funds and
                trades are safe.
              </p>
            </motion.div>

            {/* Trust Pillars Grid */}
            <div className="grid grid-cols-1 gap-6 mb-6">
              {trustPillars.map((pillar, index) => {
                const Icon = pillar.icon;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.12 }}
                    viewport={{ once: true }}
                    className="bg-[#1E293B] border border-[#CBD5E1]/20 rounded-2xl p-6 text-left hover:border-[#CBD5E1]/40 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="flex-shrink-0 inline-flex items-center justify-center w-14 h-14 rounded-xl mt-1"
                        style={{ backgroundColor: `${pillar.color}15` }}
                      >
                        <Icon
                          className="w-7 h-7"
                          style={{ color: pillar.color }}
                        />
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">
                          {pillar.title}
                        </h3>
                        <p className="text-[#CBD5E1] mb-2 text-sm">
                          {pillar.description}
                        </p>
                        <ul className="text-sm text-[#CBD5E1] space-y-1">
                          {pillar.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span
                                className="text-base leading-none mt-0.5"
                                style={{ color: pillar.color }}
                              >
                                •
                              </span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Important Note */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-4"
            >
              <p className="text-sm text-[#64748B] italic">
                Note: Some features are in development. We&apos;re committed to
                transparency and will update you on our progress.
              </p>
            </motion.div>
          </div>

          {/* Right: Illustration */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-lg rounded-2xl overflow-hidden shadow-xl bg-[#0B1220]">
              <Image
                src="/image-test3.jpg"
                alt="Why trust us"
                width={1200}
                height={800}
                className="w-full h-auto object-cover block"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
