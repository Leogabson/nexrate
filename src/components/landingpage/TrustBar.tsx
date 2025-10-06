"use client";
import { motion } from "framer-motion";
import { Shield, Gem, Zap, ShieldCheck } from "lucide-react";

export default function TrustBar() {
  const trustIndicators = [
    {
      icon: Shield,
      text: "Bank-Grade Security",
      emoji: "🔐",
    },
    {
      icon: Gem,
      text: "20+ Supported Cryptos",
      emoji: "💎",
    },
    {
      icon: Zap,
      text: "Instant Delivery",
      emoji: "⚡",
    },
    {
      icon: ShieldCheck,
      text: "24/7 AI Monitoring",
      emoji: "🛡️",
    },
  ];

  return (
    <section className="relative py-12 bg-[#1E293B] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {trustIndicators.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left relative"
              >
                {/* Icon with gradient */}
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00D4FF]/20 to-[#8B5CF6]/20 flex items-center justify-center backdrop-blur-sm border border-white/10">
                    <Icon className="w-6 h-6 text-[#00D4FF]" />
                  </div>
                </div>

                {/* Text */}
                <div className="flex items-center gap-2">
                  <span className="text-xl">{item.emoji}</span>
                  <span className="text-white font-semibold text-sm sm:text-base whitespace-nowrap">
                    {item.text}
                  </span>
                </div>

                {/* Divider (hidden on last item and mobile) */}
                {index < trustIndicators.length - 1 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 w-px h-8 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
