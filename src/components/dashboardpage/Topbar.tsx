"use client";

import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Search, Bell, Settings, Zap, Wallet, Menu } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface TopbarProps {
  onMenuClick: () => void;
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  const { data: session } = useSession();
  const [notifications] = useState(0);

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-30 flex items-center justify-between gap-4 px-4 md:px-6 py-3 md:py-4 bg-[#0B0F19]/95 backdrop-blur-xl border-b border-gray-800"
    >
      {/* Left Section - Mobile Menu + Search */}
      <div className="flex items-center gap-3 flex-1">
        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-colors"
        >
          <Menu size={20} />
        </motion.button>

        {/* Search Bar */}
        <div className="relative flex-1 max-w-xl">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            size={18}
          />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-9 pr-4 py-2 md:py-2.5 text-sm bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
          />
        </div>
      </div>

      {/* Right Section - Actions & Profile */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Quick Swap Button - Desktop Only */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hidden lg:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg font-medium text-sm shadow-lg hover:shadow-xl transition-all"
        >
          <Zap size={16} />
          <span>Quick Swap</span>
        </motion.button>

        {/* Wallet Balance - Tablet+ Only */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="hidden md:flex items-center gap-2 px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-xl cursor-pointer hover:border-cyan-500/50 transition-all"
        >
          <Wallet size={16} className="text-cyan-400" />
          <div className="text-left">
            <p className="text-xs text-gray-400 leading-tight">Balance</p>
            <p className="text-sm font-semibold text-white leading-tight">
              $0.00
            </p>
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-2 bg-gray-800/50 border border-gray-700 rounded-xl text-gray-400 hover:text-white hover:border-cyan-500/50 transition-all"
        >
          <Bell size={18} />
          {notifications > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold"
            >
              {notifications}
            </motion.span>
          )}
        </motion.button>

        {/* Settings - Desktop Only */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hidden md:block p-2 bg-gray-800/50 border border-gray-700 rounded-xl text-gray-400 hover:text-white hover:border-cyan-500/50 transition-all"
        >
          <Settings size={18} />
        </motion.button>

        {/* User Profile */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 md:gap-3 px-2 md:px-3 py-1.5 md:py-2 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-xl cursor-pointer hover:border-cyan-500/50 transition-all"
        >
          {session?.user?.image ? (
            <Image
              src={session.user.image}
              alt="User"
              width={32}
              height={32}
              className="rounded-full ring-2 ring-cyan-500/50"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {session?.user?.name?.charAt(0) || "U"}
              </span>
            </div>
          )}

          <div className="hidden sm:block text-left">
            <div className="text-sm font-medium text-white leading-tight">
              {session?.user?.name?.split(" ")[0] || "User"}
            </div>
            <div className="text-xs text-gray-400 leading-tight truncate max-w-[120px]">
              {session?.user?.email && session.user.email.length > 15
                ? session.user.email.substring(0, 15) + "..."
                : session?.user?.email}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
