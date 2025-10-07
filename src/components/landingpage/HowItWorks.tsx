"use client";
import { motion } from "framer-motion";
import { FileText, Wallet, Rocket } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      icon: FileText,
      title: "Create Account",
      description: "Sign up in under 2 minutes with email or Google",
      color: "#06B6D4", // Cyan
    },
    {
      number: "2",
      icon: Wallet,
      title: "Connect & Fund",
      description: "Link your wallet or deposit crypto/fiat currency",
      color: "#8B5CF6", // Purple
    },
    {
      number: "3",
      icon: Rocket,
      title: "Trade & Earn",
      description:
        "Swap crypto, buy gift cards, or pay bills. Earn NXRATE tokens",
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
            Start Trading in 3 Easy Steps
          </h2>
        </motion.div>

        {/* Steps Container */}
        <div className="relative">
          {/* Connecting Line (Desktop only) */}
          <div
            className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-[#CBD5E1]/20"
            style={{
              left: "calc(16.666% + 2rem)",
              right: "calc(16.666% + 2rem)",
            }}
          />

          {/* Steps Grid */}
          <div className="grid md:grid-cols-3 gap-12 lg:gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Number Circle */}
                  <div
                    className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white mb-6"
                    style={{ backgroundColor: step.color }}
                  >
                    {step.number}
                  </div>

                  {/* Icon Container */}
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: `${step.color}15` }}
                  >
                    <Icon className="w-10 h-10" style={{ color: step.color }} />
                  </div>

                  {/* Content */}
                  <h3
                    className="text-2xl font-bold mb-3"
                    style={{ color: step.color }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-[#CBD5E1] leading-relaxed max-w-xs">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
