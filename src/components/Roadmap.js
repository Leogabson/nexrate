"use client";
import Image from "next/image";

export default function Roadmap() {
  const roadmap = [
    {
      phase: "Phase 1",
      title: "Launch Waitlist + MVP",
      desc: "Open NexRate waitlist, launch landing page, and connect MongoDB for early adopters.",
      status: "✅",
    },
    {
      phase: "Phase 2",
      title: "Core Exchange Features",
      desc: "Enable crypto & gift card swapping, fiat deposits, and secure user wallets.",
      status: "🚀",
    },
    {
      phase: "Phase 3",
      title: "AI Arbitrage + Group Swaps",
      desc: "Introduce AI-powered arbitrage finder and community pooling for better rates.",
      status: "🌍",
    },
    {
      phase: "Phase 4",
      title: "AI Fraud Detection + Rate Lock",
      desc: "Deploy real-time fraud scoring engine and smart rate lock for secure trades.",
      status: "🔐",
    },
    {
      phase: "Phase 5",
      title: "NFT Marketplace + Bill Payments",
      desc: "Expand platform with NFT & digital assets trading plus utility bill payments.",
      status: "💳",
    },
  ];

  return (
    <section id="roadmap" className="py-20 bg-[#0B0F19] text-[#E2E8F0]">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-12 text-cyan-400">Our Roadmap</h2>

        {/* Roadmap Illustration */}
        <div className="flex justify-center mb-12">
          <Image
            src="/roadmap.png"
            alt="NexRate Roadmap Illustration"
            width={900}
            height={500}
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Roadmap Timeline */}
        <div className="relative border-l border-cyan-500 md:border-l-0 md:border-t md:flex md:justify-between md:gap-6">
          {roadmap.map((item, index) => (
            <div
              key={index}
              className="mb-10 md:mb-0 md:w-1/5 flex flex-col items-start md:items-center relative"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-3 md:-top-3 md:left-auto bg-cyan-500 w-6 h-6 rounded-full flex items-center justify-center text-black font-bold shadow-md">
                {item.status}
              </div>

              {/* Card */}
              <div className="bg-[#111827] p-6 rounded-lg shadow-md mt-4 md:mt-8 hover:shadow-cyan-500/20 transition text-left md:text-center">
                <h4 className="text-lg font-semibold text-purple-400">
                  {item.phase}
                </h4>
                <h3 className="text-xl font-bold text-cyan-400 mt-1">
                  {item.title}
                </h3>
                <p className="text-gray-400 mt-2">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
