"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "Is NexRate safe to use?",
      answer:
        "Yes. All transactions are secured with blockchain smart contracts and real-time AI fraud monitoring. We use the same security standards as major exchanges.",
    },
    {
      question: "When will NexRate launch?",
      answer:
        "We're targeting Q2 2026 for our core platform. Waitlist members get priority access 2 weeks before public launch.",
    },
    {
      question: "What cryptocurrencies do you support?",
      answer:
        "We'll support 20+ major cryptocurrencies at launch including Bitcoin, Ethereum, USDT, BNB, and more.",
    },
    {
      question: "How does the AI arbitrage work?",
      answer:
        "Our AI continuously scans 50+ exchanges in real-time to find the best rates. You automatically get the most profitable rate without manual comparison.",
    },
    {
      question: "What can I do with NXRT tokens?",
      answer:
        "NXRATE tokens have real utility: Earn them on every trade, stake for up to 50% fee discounts, use to pay for gift cards and bills, and vote on platform decisions.",
    },
    {
      question: "Is there a cost to join the waitlist?",
      answer:
        "No! It's completely free. Plus, you'll receive 500 NXR tokens just for being an early adopter.",
    },
    {
      question: "Which countries is NexRate available in?",
      answer:
        "We're initially launching in Nigeria, Kenya, Ghana, and South Africa. Join the waitlist to be notified when we launch in your country.",
    },
    {
      question: "How is NexRate different from other exchanges?",
      answer:
        "We're the only platform combining: (1) AI-optimized rates (save up to 15%), (2) Instant crypto-to-gift card conversion, (3) Direct bill payments with crypto. Plus, our token rewards mean you earn just for using the platform.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-[#1E293B]">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Common Questions
          </h2>
          <p className="text-lg text-[#CBD5E1]">
            Everything you need to know about joining NexRate
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-[#0F172A] border border-[#CBD5E1]/20 rounded-xl overflow-hidden transition-all duration-300 hover:border-[#06B6D4]/50"
              >
                {/* Question Button */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left transition-colors duration-200"
                >
                  <span className="text-lg font-bold text-white pr-8">
                    {faq.question}
                  </span>
                  <div className="flex-shrink-0">
                    {isOpen ? (
                      <Minus className="w-6 h-6 text-[#06B6D4]" />
                    ) : (
                      <Plus className="w-6 h-6 text-[#CBD5E1]" />
                    )}
                  </div>
                </button>

                {/* Answer */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-0">
                        <p className="text-[#CBD5E1] leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-[#CBD5E1] mb-4">Still have questions?</p>
          <a
            href="mailto:hello@nexrate.com"
            className="inline-flex items-center justify-center px-6 py-3 text-white bg-[#06B6D4] rounded-xl font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            Contact Us
          </a>
        </motion.div>
      </div>
    </section>
  );
}
