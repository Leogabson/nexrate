"use client";

import React, { useEffect, JSX } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout";

export default function DashboardPage(): JSX.Element {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      // Redirect to NextAuth's default sign-in page
      router.push("/api/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <DashboardLayout>
        <div className="py-20 text-center text-gray-300">
          Loading your dashboard…
        </div>
      </DashboardLayout>
    );
  }

  if (status === "unauthenticated") {
    return (
      <DashboardLayout>
        <div className="py-20 text-center text-gray-300">
          Redirecting to sign in…
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2">
          <div className="bg-[#07101a] p-6 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold">
              Welcome back,{" "}
              {session?.user?.name
                ? session.user.name.split(" ")[0]
                : session?.user?.email}
            </h2>
            <p className="text-gray-400 mt-2">
              Your NexRate dashboard is live – this is the place to manage
              swaps, wallets, and pools.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button className="bg-gradient-to-r from-cyan-400 to-purple-500 px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
                Swap
              </button>
              <button className="border border-cyan-500 text-cyan-400 px-4 py-2 rounded-lg hover:bg-cyan-500/10 transition-colors">
                Buy Giftcard
              </button>
              <button className="bg-black/70 text-white px-4 py-2 rounded-lg hover:bg-black/90 transition-colors">
                Lock Rate
              </button>
              <button className="border border-gray-700 text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-700/30 transition-colors">
                Pay Bills
              </button>
            </div>
          </div>

          <div className="mt-6">
            {/* Placeholder for future charts / arbitrage results */}
            <div className="bg-[#07101a] p-6 rounded-2xl shadow-md">
              <h3 className="text-lg font-semibold">AI Arbitrage Finder</h3>
              <p className="text-gray-400 mt-2">
                Top opportunities and market insights will appear here.
              </p>

              {/* Demo content to show it's working */}
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-xs font-bold">
                      ₿
                    </div>
                    <div>
                      <div className="font-medium">Bitcoin → Ethereum</div>
                      <div className="text-sm text-gray-400">
                        Binance → Coinbase
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 font-medium">+2.3%</div>
                    <div className="text-xs text-gray-400">Profit</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold">
                      ₳
                    </div>
                    <div>
                      <div className="font-medium">Amazon Gift Card → USDT</div>
                      <div className="text-sm text-gray-400">
                        Local → Binance
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 font-medium">+1.8%</div>
                    <div className="text-xs text-gray-400">Profit</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <aside>
          <div className="bg-[#07101a] p-6 rounded-2xl shadow-md">
            <h4 className="font-semibold">Wallet Summary</h4>
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-400">Total Balance</div>
                  <div className="text-xl font-bold">–</div>
                </div>
              </div>

              <div className="mt-4 text-sm text-gray-400">
                No wallet connected yet.
              </div>

              <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
                Connect Wallet
              </button>
            </div>

            {/* User Info Section */}
            <div className="mt-6 pt-6 border-t border-gray-700">
              <h4 className="font-semibold mb-3">Account Info</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Email:</span>
                  <span className="text-gray-300">{session?.user?.email}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Name:</span>
                  <span className="text-gray-300">
                    {session?.user?.name || "Not set"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">User ID:</span>
                  <span className="text-gray-300 font-mono text-xs">
                    {session?.user?.id || "Loading..."}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </DashboardLayout>
  );
}
