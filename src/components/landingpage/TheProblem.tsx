"use client";
import { motion } from "framer-motion";
import Image from "next/image";
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
        {/* Two-column layout: text (left) and image (right) */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-8">
          {/* Left: headline + pain points */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-6 text-left"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Tired of Getting Bad Rates on Your Crypto?
              </h2>
              <p className="text-[#CBD5E1] max-w-xl">
                We aggregate the best markets so you keep more of your crypto —
                no hidden fees, no wasted time, and safer trades.
              </p>
            </motion.div>

            <div className="grid gap-6">
              {painPoints.map((point, index) => {
                const Icon = point.icon;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    viewport={{ once: true }}
                    className="bg-[#1E293B] border border-[#F59E0B]/30 rounded-2xl p-6 flex items-start gap-4"
                  >
                    <div className="flex-none w-12 h-12 rounded-lg bg-[#F59E0B]/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[#F59E0B]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {point.title}
                      </h3>
                      <p className="text-[#CBD5E1] text-sm leading-relaxed">
                        {point.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right: illustration */}
          <div className="flex justify-center md:justify-end">
            {/* Use a larger radius and match container bg to section so image corners blend */}
            <div className="w-full max-w-md md:max-w-lg rounded-[28px] overflow-hidden shadow-lg bg-[#0F172A] ring-1 ring-[#0F172A]">
              <Image
                src="/image-test2.jpg"
                alt="Problem illustration"
                width={900}
                height={600}
                className="w-full h-auto object-cover rounded-[28px]"
                priority={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
