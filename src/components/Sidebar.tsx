"use client";

import React, { useState, JSX } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home,
  Wallet,
  CreditCard,
  ArrowLeftRight,
  Settings,
  Menu,
  X,
} from "lucide-react";

// Define the component type for Lucide icons
type LucideIcon = React.ComponentType<React.SVGProps<SVGSVGElement>>;

type NavItem = {
  id: number;
  label: string;
  href: string;
  icon: LucideIcon;
};

const navItems: NavItem[] = [
  { id: 1, label: "Overview", href: "/dashboard", icon: Home },
  { id: 2, label: "Wallet", href: "/dashboard/wallet", icon: Wallet },
  {
    id: 3,
    label: "Gift Cards",
    href: "/dashboard/giftcards",
    icon: CreditCard,
  },
  {
    id: 4,
    label: "Trade",
    href: "/dashboard/trade",
    icon: ArrowLeftRight,
  },
  {
    id: 5,
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function Sidebar(): JSX.Element {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const NavLinks = (): JSX.Element => (
    <nav className="flex flex-col gap-2 mt-6">
      {navItems.map((item: NavItem) => {
        const active =
          pathname === item.href || pathname?.startsWith(item.href + "/");

        return (
          <Link
            key={item.id}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              active
                ? "bg-gradient-to-r from-cyan-400/20 to-purple-500/20 text-cyan-400"
                : "text-gray-400 hover:text-cyan-300 hover:bg-[#1F2937]"
            }`}
            onClick={() => setIsOpen(false)} // close drawer on mobile click
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );

  const handleToggleOpen = (): void => {
    setIsOpen(true);
  };

  const handleClose = (): void => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-[#0B0F19] border-r border-[#1F2937] h-screen p-6 hidden md:flex flex-col">
        <h1 className="text-2xl font-bold text-cyan-400 mb-8">NexRate</h1>
        <NavLinks />
      </aside>

      {/* Mobile Topbar with Hamburger */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-[#0B0F19] border-b border-[#1F2937]">
        <h1 className="text-xl font-bold text-cyan-400">NexRate</h1>
        <button onClick={handleToggleOpen}>
          <Menu className="h-6 w-6 text-cyan-400" />
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div className="fixed inset-0 bg-black/50" onClick={handleClose} />

          {/* Drawer */}
          <aside className="w-64 bg-[#0B0F19] h-full p-6 flex flex-col z-50">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-cyan-400">NexRate</h1>
              <button onClick={handleClose}>
                <X className="h-6 w-6 text-cyan-400" />
              </button>
            </div>
            <NavLinks />
          </aside>
        </div>
      )}
    </>
  );
}
