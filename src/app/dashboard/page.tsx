"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/dashboardpage/DashboardLayout";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Gift,
  Users,
  Award,
} from "lucide-react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [portfolioValue, setPortfolioValue] = useState(0);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin");
    }
  }, [status, router]);

  // Animate portfolio value on load
  useEffect(() => {
    if (status === "authenticated") {
      let start = 0;
      const end = 0; // Will be dynamic when connected
      const duration = 1500;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setPortfolioValue(end);
          clearInterval(timer);
        } else {
          setPortfolioValue(start);
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [status]);

  if (status === "loading") {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  const stats = [
    {
      label: "Portfolio Value",
      value: "$0.00",
      change: "+0%",
      trend: "up",
      icon: Wallet,
      color: "cyan",
    },
    {
      label: "NXR Tokens",
      value: "0",
      change: "Coming Soon",
      trend: "neutral",
      icon: Award,
      color: "purple",
    },
    {
      label: "Total Trades",
      value: "0",
      change: "+0%",
      trend: "up",
      icon: TrendingUp,
      color: "pink",
    },
    {
      label: "Referrals",
      value: "0",
      change: "Earn NXR",
      trend: "neutral",
      icon: Users,
      color: "blue",
    },
  ];

  const quickActions = [
    {
      label: "Swap Crypto",
      icon: "🔄",
      gradient: "from-cyan-500 to-cyan-600",
      description: "Exchange cryptocurrencies instantly",
    },
    {
      label: "Buy Gift Cards",
      icon: "🎁",
      gradient: "from-purple-500 to-purple-600",
      description: "Netflix, Spotify, Apple & more",
    },
    {
      label: "Lock Rate",
      icon: "🔒",
      gradient: "from-pink-500 to-pink-600",
      description: "Protect from volatility",
    },
    {
      label: "Pay Bills",
      icon: "💳",
      gradient: "from-blue-500 to-blue-600",
      description: "Utilities, tuition & more",
    },
  ];

  const aiOpportunities = [
    {
      from: "Bitcoin",
      to: "Ethereum",
      fromIcon: "₿",
      toIcon: "Ξ",
      profit: "+2.3%",
      exchange: "Binance → Coinbase",
      confidence: 94,
    },
    {
      from: "Amazon GC",
      to: "USDT",
      fromIcon: "🎁",
      toIcon: "₮",
      profit: "+1.8%",
      exchange: "Local → Binance",
      confidence: 87,
    },
    {
      from: "USDC",
      to: "Spotify GC",
      fromIcon: "💵",
      toIcon: "🎵",
      profit: "+3.1%",
      exchange: "Coinbase → Direct",
      confidence: 91,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 border border-cyan-500/20 rounded-2xl p-8"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Welcome back, {session?.user?.name?.split(" ")[0] || "Trader"}
                  ! 👋
                </h1>
                <p className="text-gray-400">
                  Here's what's happening with your NexRate account today.
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  <Zap size={20} />
                  Quick Swap
                </span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const colors = {
              cyan: "from-cyan-500/20 to-cyan-600/20 border-cyan-500/30",
              purple:
                "from-purple-500/20 to-purple-600/20 border-purple-500/30",
              pink: "from-pink-500/20 to-pink-600/20 border-pink-500/30",
              blue: "from-blue-500/20 to-blue-600/20 border-blue-500/30",
            };

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`relative overflow-hidden bg-gradient-to-br ${
                  colors[stat.color as keyof typeof colors]
                } backdrop-blur-xl border rounded-2xl p-6 cursor-pointer group`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${
                      colors[stat.color as keyof typeof colors]
                    }`}
                  >
                    <Icon className="text-white" size={24} />
                  </div>
                  {stat.trend !== "neutral" && (
                    <div
                      className={`flex items-center gap-1 text-sm ${
                        stat.trend === "up" ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {stat.trend === "up" ? (
                        <ArrowUpRight size={16} />
                      ) : (
                        <ArrowDownRight size={16} />
                      )}
                      {stat.change}
                    </div>
                  )}
                  {stat.trend === "neutral" && (
                    <div className="text-sm text-gray-400">{stat.change}</div>
                  )}
                </div>

                <div>
                  <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>

                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className={`relative overflow-hidden bg-gradient-to-br ${action.gradient} rounded-xl p-6 text-left group shadow-lg hover:shadow-2xl transition-all duration-300`}
              >
                <div className="text-4xl mb-3">{action.icon}</div>
                <h3 className="text-white font-semibold text-lg mb-1">
                  {action.label}
                </h3>
                <p className="text-white/80 text-sm">{action.description}</p>

                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="text-white" size={20} />
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* AI Arbitrage Finder */}
        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="bg-[#0B0F19] border border-gray-700 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                    <Zap className="text-cyan-400" size={24} />
                    AI Arbitrage Finder
                  </h2>
                  <p className="text-gray-400 text-sm">
                    Top profitable opportunities right now
                  </p>
                </div>
                <span className="bg-cyan-500/20 text-cyan-400 text-xs px-3 py-1 rounded-full">
                  Live
                </span>
              </div>

              <div className="space-y-3">
                {aiOpportunities.map((opp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 cursor-pointer hover:border-cyan-500/50 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center text-xl">
                            {opp.fromIcon}
                          </div>
                          <ArrowUpRight className="text-gray-500" size={16} />
                          <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center text-xl">
                            {opp.toIcon}
                          </div>
                        </div>

                        <div>
                          <div className="font-semibold text-white">
                            {opp.from} → {opp.to}
                          </div>
                          <div className="text-sm text-gray-400">
                            {opp.exchange}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-green-400 font-bold text-lg">
                          {opp.profit}
                        </div>
                        <div className="text-xs text-gray-500">
                          {opp.confidence}% confidence
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-4 py-3 border border-cyan-500/30 text-cyan-400 rounded-lg hover:bg-cyan-500/10 transition-all"
              >
                View All Opportunities
              </motion.button>
            </div>
          </motion.div>

          {/* Wallet Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="space-y-6"
          >
            {/* Wallet Card */}
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Wallet size={20} className="text-purple-400" />
                Wallet Summary
              </h3>

              <div className="mb-6">
                <p className="text-gray-400 text-sm mb-1">Total Balance</p>
                <p className="text-3xl font-bold text-white">$0.00</p>
                <p className="text-sm text-gray-500 mt-1">
                  No wallet connected
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold shadow-lg"
              >
                Connect Wallet
              </motion.button>
            </div>

            {/* NXR Token Card */}
            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  💎 NXR Tokens
                </h3>
                <span className="bg-cyan-500/20 text-cyan-400 text-xs px-2 py-1 rounded-full">
                  Soon
                </span>
              </div>

              <div className="mb-4">
                <p className="text-3xl font-bold text-white mb-1">0 NXR</p>
                <p className="text-sm text-gray-400">
                  Token launch coming soon
                </p>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>Stake & earn APY</span>
                  <span className="text-green-400">Coming</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Governance voting</span>
                  <span className="text-green-400">Coming</span>
                </div>
              </div>
            </div>

            {/* Account Info */}
            <div className="bg-[#0B0F19] border border-gray-700 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">
                Account Info
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Email:</span>
                  <span className="text-white">{session?.user?.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Name:</span>
                  <span className="text-white">
                    {session?.user?.name || "Not set"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Member since:</span>
                  <span className="text-white">2025</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
