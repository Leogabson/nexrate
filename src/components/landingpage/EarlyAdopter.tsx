"use client";
import { motion } from "framer-motion";
import {
  Gift,
  Unlock,
  DollarSign,
  Award,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function EarlyAdopterBenefits() {
  const [timeLeft, setTimeLeft] = useState({
    days: 45,
    hours: 12,
    minutes: 30,
    seconds: 0,
  });

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const benefits = [
    {
      icon: Gift,
      title: "Welcome Bonus",
      description: "Get 500 NXR tokens when you join early access",
      color: "#06B6D4",
    },
    {
      icon: Unlock,
      title: "Priority Access",
      description: "Be first to trade when we launch",
      color: "#8B5CF6",
    },
    {
      icon: DollarSign,
      title: "Lifetime Perks",
      description: "Lock in 25% fee discount forever",
      color: "#10B981",
    },
    {
      icon: Award,
      title: "Exclusive NFT",
      description: "Limited edition founder's NFT badge",
      color: "#F59E0B",
    },
    {
      icon: TrendingUp,
      title: "Referral Rewards",
      description: "Earn 10% of your referrals' trades",
      color: "#0EA5E9",
    },
    {
      icon: Users,
      title: "VIP Community",
      description: "Join our private Discord channel",
      color: "#8B5CF6",
    },
  ];

  return (
    <section className="py-20 bg-[#1E293B] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 bg-[#06B6D4] rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#8B5CF6] rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Join the Waitlist & Get Exclusive Rewards
          </h2>
          <p className="text-lg text-[#CBD5E1] max-w-2xl mx-auto">
            Limited spots - lock in benefits before we launch
          </p>
        </motion.div>

        {/* Urgency Elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-12"
        >
          {/* Countdown Timer */}
          <div className="bg-[#0F172A] border-2 border-[#F59E0B] rounded-2xl p-6 mb-6">
            <p className="text-center text-[#F59E0B] font-semibold mb-4">
              ⚡ Launch Countdown
            </p>
            <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Minutes", value: timeLeft.minutes },
                { label: "Seconds", value: timeLeft.seconds },
              ].map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="bg-[#1E293B] rounded-xl py-3 mb-2">
                    <span className="text-3xl font-bold text-white">
                      {String(item.value).padStart(2, "0")}
                    </span>
                  </div>
                  <span className="text-xs text-[#64748B] uppercase">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Scarcity Badge */}
          <div className="text-center">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center gap-2 bg-[#EF4444]/10 border border-[#EF4444]/30 px-6 py-3 rounded-full"
            >
              <span className="text-[#EF4444] font-bold">
                🔥 Only 2,847 spots remaining out of 5,000
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Benefits Grid - 3x2 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-[#0F172A] border border-[#CBD5E1]/20 rounded-2xl p-6 text-center transition-all duration-300 hover:border-[#06B6D4] hover:shadow-lg"
              >
                {/* Icon */}
                <motion.div
                  animate={{
                    y: [-2, 2, -2],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.2,
                  }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-xl mb-4"
                  style={{ backgroundColor: `${benefit.color}15` }}
                >
                  <Icon className="w-8 h-8" style={{ color: benefit.color }} />
                </motion.div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-2">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#CBD5E1]">{benefit.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <button
            onClick={() => {
              document
                .getElementById("waitlist")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white bg-[#06B6D4] rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(6,182,212,0.3)]"
          >
            Secure My Early Access Now
          </button>
        </motion.div>
      </div>
    </section>
  );
}
