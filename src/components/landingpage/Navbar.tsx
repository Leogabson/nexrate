"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();

  const handleSignIn = () => {
    signIn("google", {
      callbackUrl: pathname === "/auth/signin" ? "/dashboard" : "/auth/signin",
    });
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-[#0B0F19] border-b border-[#1F2937] sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <Image
          src="/logo.png"
          alt="NexRate Logo"
          width={40}
          height={40}
          className="rounded-full"
        />
        <span className="text-2xl font-bold text-cyan-400">NexRate</span>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden md:flex space-x-6 items-center">
        <a href="#home" className="hover:text-cyan-400">
          Home
        </a>
        <a href="#features" className="hover:text-cyan-400">
          Features
        </a>
        <a href="#how" className="hover:text-cyan-400">
          How It Works
        </a>
        <a href="#contact" className="hover:text-cyan-400">
          Waitlist
        </a>

        {/* Auth Buttons */}
        {!session ? (
          <button
            onClick={handleSignIn}
            className="ml-4 bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition"
          >
            Sign In
          </button>
        ) : (
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-300">
              Hi, {session.user?.name?.split(" ")[0]}
            </span>
            <button
              onClick={() => signOut()}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
            >
              Sign Out
            </button>
          </div>
        )}
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-cyan-400 text-2xl"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-16 left-0 w-full bg-[#0B0F19] flex flex-col items-center space-y-6 py-6 border-t border-[#1F2937] md:hidden">
          <a
            href="#home"
            onClick={() => setOpen(false)}
            className="hover:text-cyan-400"
          >
            Home
          </a>
          <a
            href="#features"
            onClick={() => setOpen(false)}
            className="hover:text-cyan-400"
          >
            Features
          </a>
          <a
            href="#how"
            onClick={() => setOpen(false)}
            className="hover:text-cyan-400"
          >
            How It Works
          </a>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="hover:text-cyan-400"
          >
            Waitlist
          </a>

          {/* Auth in mobile menu */}
          {!session ? (
            <button
              onClick={handleSignIn}
              className="bg-cyan-500 text-white px-6 py-2 rounded-lg hover:bg-cyan-600 transition"
            >
              Sign In
            </button>
          ) : (
            <button
              onClick={() => signOut()}
              className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
            >
              Sign Out
            </button>
          )}
        </div>
      )}
    </header>
  );
}
