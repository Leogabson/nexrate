"use client";
import { motion } from "framer-motion";
import { Rocket, Target, Zap, Globe } from "lucide-react";

export default function Roadmap() {
  const phases = [
    {
      quarter: "Q4 2025",
      status: "current",
      icon: Rocket,
      title: "Foundation",
      description: "Building the core infrastructure",
      milestones: [
        "Waitlist launch",
        "Community building",
        "Beta testing begins",
      ],
      color: "#10B981", // Green (current)
    },
    {
      quarter: "Q1 2026",
      status: "target",
      icon: Target,
      title: "Core Launch",
      description: "Main platform goes live",
      milestones: [
        "Crypto ↔ Gift card trading",
        "AI rate optimization",
        "NXRATE token launch",
      ],
      color: "#06B6D4", // Cyan (target)
    },
    {
      quarter: "Q2 2026",
      status: "upcoming",
      icon: Zap,
      title: "Advanced Features",
      description: "Expanding capabilities",
      milestones: [
        "Bill payments integration",
        "Group swap discounts",
        "Staking rewards live",
      ],
      color: "#8B5CF6", // Purple
    },
    {
      quarter: "Q3 2026",
      status: "upcoming",
      icon: Globe,
      title: "Ecosystem Expansion",
      description: "Global scale & new technology",
      milestones: [
        "BlockDAG migration",
        "Cross-chain support",
        "Mobile app launch",
      ],
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
            Our Journey to Launch
          </h2>
          <p className="text-lg text-[#CBD5E1] max-w-2xl mx-auto">
            Transparent progress from MVP to full ecosystem
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-20 left-0 right-0 h-1 bg-[#CBD5E1]/20" />

          {/* Progress Line (shows current progress) */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "25%" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: true }}
            className="hidden lg:block absolute top-20 left-0 h-1 bg-[#10B981]"
          />

          {/* Phases Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {phases.map((phase, index) => {
              const Icon = phase.icon;
              const isCurrent = phase.status === "current";
              const isTarget = phase.status === "target";

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {/* Phase Card */}
                  <div
                    className={`relative z-10 bg-[#1E293B] border-2 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 ${
                      isCurrent
                        ? "border-[#10B981] shadow-lg shadow-[#10B981]/20"
                        : isTarget
                        ? "border-[#06B6D4]"
                        : "border-[#CBD5E1]/20"
                    }`}
                  >
                    {/* Status Badge */}
                    {isCurrent && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="inline-flex items-center gap-1 bg-[#10B981] text-white text-xs font-bold px-3 py-1 rounded-full">
                          <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                          Current Phase
                        </span>
                      </div>
                    )}

                    {isTarget && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="inline-flex items-center gap-1 bg-[#06B6D4] text-white text-xs font-bold px-3 py-1 rounded-full">
                          🎯 Target Launch
                        </span>
                      </div>
                    )}

                    {/* Quarter Badge */}
                    <div className="text-center mb-4">
                      <span
                        className="inline-block px-4 py-1 rounded-full text-sm font-bold"
                        style={{
                          backgroundColor: `${phase.color}15`,
                          color: phase.color,
                        }}
                      >
                        {phase.quarter}
                      </span>
                    </div>

                    {/* Icon Circle */}
                    <div className="flex justify-center mb-4">
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${phase.color}15` }}
                      >
                        <Icon
                          className="w-8 h-8"
                          style={{ color: phase.color }}
                        />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white text-center mb-2">
                      {phase.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-[#CBD5E1] text-center mb-4">
                      {phase.description}
                    </p>

                    {/* Milestones */}
                    <ul className="space-y-2">
                      {phase.milestones.map((milestone, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm text-[#CBD5E1]"
                        >
                          <span
                            className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                              isCurrent
                                ? "bg-[#10B981] text-white"
                                : "bg-[#CBD5E1]/20 text-[#CBD5E1]"
                            }`}
                          >
                            {isCurrent ? "✓" : idx + 1}
                          </span>
                          <span>{milestone}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Timeline Dot (Desktop) */}
                  <div
                    className="hidden lg:flex absolute top-16 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-[#0F172A] z-20"
                    style={{ backgroundColor: phase.color }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Progress Bar Summary (Mobile) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 max-w-2xl mx-auto"
        >
          <div className="bg-[#1E293B] rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#CBD5E1]">Overall Progress</span>
              <span className="text-sm font-bold text-[#10B981]">
                25% Complete
              </span>
            </div>
            <div className="h-2 bg-[#CBD5E1]/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "25%" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                viewport={{ once: true }}
                className="h-full bg-[#10B981] rounded-full"
              />
            </div>
            <p className="text-xs text-[#64748B] mt-2 text-center">
              Q4 2025 Foundation phase in progress • Q2 2026 target launch
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
