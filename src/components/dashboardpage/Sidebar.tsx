"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Wallet,
  CreditCard,
  ArrowLeftRight,
  Settings,
  X,
  TrendingUp,
  Gift,
  Award,
  Users,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

type NavItem = {
  id: number;
  label: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  badge?: string;
  color?: string;
};

const navItems: NavItem[] = [
  { id: 1, label: "Overview", href: "/dashboard", icon: Home, color: "cyan" },
  {
    id: 2,
    label: "Wallet",
    href: "/dashboard/wallet",
    icon: Wallet,
    color: "purple",
  },
  {
    id: 3,
    label: "Trade",
    href: "/dashboard/trade",
    icon: ArrowLeftRight,
    color: "blue",
  },
  {
    id: 4,
    label: "Gift Cards",
    href: "/dashboard/giftcards",
    icon: Gift,
    color: "pink",
  },
  {
    id: 5,
    label: "AI Arbitrage",
    href: "/dashboard/arbitrage",
    icon: TrendingUp,
    badge: "AI",
    color: "cyan",
  },
  {
    id: 6,
    label: "NXRT Rewards",
    href: "/dashboard/rewards",
    icon: Award,
    badge: "New",
    color: "purple",
  },
  {
    id: 7,
    label: "Referrals",
    href: "/dashboard/referrals",
    icon: Users,
    color: "blue",
  },
];

const bottomNavItems: NavItem[] = [
  {
    id: 8,
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    color: "gray",
  },
  {
    id: 9,
    label: "Help & Support",
    href: "/dashboard/help",
    icon: HelpCircle,
    color: "gray",
  },
];

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();

  const NavLink = ({
    item,
    isMobile = false,
  }: {
    item: NavItem;
    isMobile?: boolean;
  }) => {
    const active =
      pathname === item.href || pathname?.startsWith(item.href + "/");
    const Icon = item.icon;

    const colors = {
      cyan: "from-cyan-400/20 to-cyan-500/20 border-cyan-500/50 text-cyan-400",
      purple:
        "from-purple-400/20 to-purple-500/20 border-purple-500/50 text-purple-400",
      blue: "from-blue-400/20 to-blue-500/20 border-blue-500/50 text-blue-400",
      pink: "from-pink-400/20 to-pink-500/20 border-pink-500/50 text-pink-400",
      gray: "from-gray-400/20 to-gray-500/20 border-gray-500/50 text-gray-400",
    };

    return (
      <Link href={item.href} onClick={() => isMobile && setIsOpen(false)}>
        <motion.div
          whileHover={{ scale: 1.02, x: 5 }}
          whileTap={{ scale: 0.98 }}
          className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
            active
              ? `bg-gradient-to-r ${
                  colors[item.color as keyof typeof colors]
                } border backdrop-blur-xl shadow-lg`
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <Icon
            className={`h-5 w-5 ${
              active ? "" : "group-hover:scale-110 transition-transform"
            }`}
          />
          <span className="font-medium">{item.label}</span>

          {item.badge && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="ml-auto bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-xs px-2 py-0.5 rounded-full font-bold"
            >
              {item.badge}
            </motion.span>
          )}

          {active && (
            <motion.div
              layoutId={isMobile ? "mobile-active-pill" : "active-pill"}
              className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-500/10 rounded-xl -z-10"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </motion.div>
      </Link>
    );
  };

  return (
    <>
      {/* Desktop Sidebar - Fixed Position */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="hidden md:flex flex-col w-72 bg-[#0B0F19] border-r border-gray-800 h-screen fixed top-0 left-0 z-40"
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-800">
          <Link href="/dashboard">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 cursor-pointer"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg blur-lg opacity-50"></div>
                <div className="relative w-10 h-10 rounded-lg overflow-hidden">
                  <Image
                    src="/logo.jpg"
                    alt="NexRate"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  NexRate
                </h1>
                <p className="text-xs text-gray-500">Trading Dashboard</p>
              </div>
            </motion.div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
          <div className="space-y-1">
            {navItems.map((item) => (
              <NavLink key={item.id} item={item} />
            ))}
          </div>

          <div className="pt-6 mt-6 border-t border-gray-800 space-y-1">
            {bottomNavItems.map((item) => (
              <NavLink key={item.id} item={item} />
            ))}
          </div>
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-gray-800">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700 rounded-xl p-4"
          >
            <div className="flex items-center gap-3 mb-3">
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  alt="User"
                  width={40}
                  height={40}
                  className="rounded-full ring-2 ring-cyan-500/50"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                  <span className="text-white font-bold">
                    {session?.user?.name?.charAt(0) || "U"}
                  </span>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-sm truncate">
                  {session?.user?.name || "User"}
                </p>
                <p className="text-gray-400 text-xs truncate">
                  {session?.user?.email}
                </p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => signOut({ callbackUrl: "/" })}
              className="w-full flex items-center justify-center gap-2 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-sm font-medium transition-colors"
            >
              <LogOut size={16} />
              Sign Out
            </motion.button>
          </motion.div>
        </div>
      </motion.aside>

      {/* Mobile Drawer - Slide from Left */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay - Only on small screens */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-72 bg-[#0B0F19] border-r border-gray-800 z-50 md:hidden flex flex-col overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-800 sticky top-0 bg-[#0B0F19] z-10">
                <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden">
                      <Image
                        src="/logo.jpg"
                        alt="NexRate"
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h1 className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                        NexRate
                      </h1>
                      <p className="text-xs text-gray-500">Dashboard</p>
                    </div>
                  </div>
                </Link>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white"
                >
                  <X size={20} />
                </motion.button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 px-4 py-6 space-y-2">
                <div className="space-y-1">
                  {navItems.map((item) => (
                    <NavLink key={item.id} item={item} isMobile />
                  ))}
                </div>

                <div className="pt-6 mt-6 border-t border-gray-800 space-y-1">
                  {bottomNavItems.map((item) => (
                    <NavLink key={item.id} item={item} isMobile />
                  ))}
                </div>
              </nav>

              {/* User Section */}
              <div className="p-4 border-t border-gray-800 sticky bottom-0 bg-[#0B0F19]">
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    {session?.user?.image ? (
                      <Image
                        src={session.user.image}
                        alt="User"
                        width={40}
                        height={40}
                        className="rounded-full ring-2 ring-cyan-500/50"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                        <span className="text-white font-bold">
                          {session?.user?.name?.charAt(0) || "U"}
                        </span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium text-sm truncate">
                        {session?.user?.name || "User"}
                      </p>
                      <p className="text-gray-400 text-xs truncate">
                        {session?.user?.email}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsOpen(false);
                      signOut({ callbackUrl: "/" });
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-sm font-medium transition-colors"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
