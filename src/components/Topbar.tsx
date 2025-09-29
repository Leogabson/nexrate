"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Topbar() {
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-[#0f1724] bg-[#06111b]">
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-lg bg-white/3 text-white">
          {/* optionally menu toggle for mobile */}☰
        </button>
        <div>
          <div className="text-xs text-gray-400">Dashboard</div>
          <div className="text-sm font-semibold text-white">Overview</div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {session?.user?.image ? (
          <Image
            src={session.user.image}
            alt="avatar"
            width={36}
            height={36}
            className="rounded-full"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center text-white">
            U
          </div>
        )}

        <div className="hidden sm:block text-right">
          <div className="text-sm text-white">
            {session?.user?.name || session?.user?.email}
          </div>
          <div className="text-xs text-gray-400">USER</div>
        </div>

        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-md text-sm"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
