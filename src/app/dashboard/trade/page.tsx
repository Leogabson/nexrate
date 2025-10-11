"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/dashboardpage/DashboardLayout";
import { motion } from "framer-motion";
import {
  ArrowUpDown,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Info,
} from "lucide-react";

interface Swap {
  id: string;
  fromAsset: string;
  toAsset: string;
  fromAmount: number;
  toAmount: number;
  rate: number;
  fee: number;
  status: string;
  createdAt: string;
}

export default function TradePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [recentSwaps, setRecentSwaps] = useState<Swap[]>([]);

  const [swapData, setSwapData] = useState({
    fromAsset: "BTC",
    toAsset: "ETH",
    amount: "",
    slippage: "0.5",
  });

  const [currentRate, setCurrentRate] = useState<number | null>(null);
  const [isLoadingRate, setIsLoadingRate] = useState(false);

  const [estimatedOutput, setEstimatedOutput] = useState(0);
  const [estimatedFee, setEstimatedFee] = useState(0);

  const cryptoAssets = [
    { symbol: "BTC", name: "Bitcoin", logo: "₿" },
    { symbol: "ETH", name: "Ethereum", logo: "Ξ" },
    { symbol: "USDT", name: "Tether", logo: "₮" },
    { symbol: "BNB", name: "Binance Coin", logo: "Ⓑ" },
    { symbol: "USDC", name: "USD Coin", logo: "$" },
    { symbol: "SOL", name: "Solana", logo: "◎" },
  ];

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin");
    }
  }, [status, router]);

  // Fetch recent swaps
  useEffect(() => {
    if (status === "authenticated") {
      fetchRecentSwaps();
    }
  }, [status]);

  // Fetch live rate when assets change
  useEffect(() => {
    const fetchRate = async () => {
      setIsLoadingRate(true);
      try {
        const response = await fetch("/api/rates", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fromSymbol: swapData.fromAsset,
            toSymbol: swapData.toAsset,
          }),
        });

        const data = await response.json();
        if (response.ok && data.rate) {
          setCurrentRate(data.rate);
        } else {
          setCurrentRate(null);
        }
      } catch (error) {
        console.error("Failed to fetch rate:", error);
        setCurrentRate(null);
      } finally {
        setIsLoadingRate(false);
      }
    };

    fetchRate();
    const interval = setInterval(fetchRate, 30000); // refresh every 30s
    return () => clearInterval(interval);
  }, [swapData.fromAsset, swapData.toAsset]);

  // Calculate estimated output and fee
  useEffect(() => {
    const amount = parseFloat(swapData.amount) || 0;
    const fee = amount * 0.001; // 0.1% fee
    const output = currentRate ? (amount - fee) * currentRate : 0;

    setEstimatedFee(fee);
    setEstimatedOutput(output);
  }, [swapData.amount, currentRate]);

  const fetchRecentSwaps = async () => {
    try {
      const res = await fetch("/api/swap");
      const data = await res.json();
      if (res.ok) {
        setRecentSwaps(data.swaps || []);
      }
    } catch (error) {
      console.error("Failed to fetch recent swaps:", error);
    }
  };

  const handleSwap = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setMessageType("");

    if (!swapData.amount || parseFloat(swapData.amount) <= 0) {
      setMessage("Please enter a valid amount");
      setMessageType("error");
      setIsLoading(false);
      return;
    }

    try {
      if (!currentRate) {
        setMessage("Current rate unavailable. Please wait for rate to load.");
        setMessageType("error");
        setIsLoading(false);
        return;
      }

      const res = await fetch("/api/swap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fromAsset: swapData.fromAsset,
          toAsset: swapData.toAsset,
          amount: swapData.amount,
          slippage: swapData.slippage,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(
          `Swap initiated successfully! ${data.swap.fromAmount} ${
            data.swap.fromAsset
          } → ${data.swap.toAmount.toFixed(4)} ${data.swap.toAsset}`
        );
        setMessageType("success");
        setSwapData({ ...swapData, amount: "" });
        fetchRecentSwaps();
      } else {
        setMessage(data.error || "Failed to initiate swap");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Network error. Please try again.");
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFlipAssets = () => {
    setSwapData({
      ...swapData,
      fromAsset: swapData.toAsset,
      toAsset: swapData.fromAsset,
    });
  };

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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-white mb-2">Crypto Swap</h1>
          <p className="text-gray-400">
            Exchange cryptocurrencies instantly at the best rates
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="bg-[#0B0F19] border border-gray-700 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-cyan-500/20 rounded-lg">
                  <ArrowUpDown className="text-cyan-400" size={24} />
                </div>
                <h2 className="text-xl font-bold text-white">Swap Crypto</h2>
              </div>

              <form onSubmit={handleSwap} className="space-y-4">
                {/* From Asset */}
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    From
                  </label>
                  <div className="flex gap-3">
                    <select
                      value={swapData.fromAsset}
                      onChange={(e) =>
                        setSwapData({ ...swapData, fromAsset: e.target.value })
                      }
                      className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                    >
                      {cryptoAssets.map((asset) => (
                        <option key={asset.symbol} value={asset.symbol}>
                          {asset.logo} {asset.symbol} - {asset.name}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      step="0.0001"
                      value={swapData.amount}
                      onChange={(e) =>
                        setSwapData({ ...swapData, amount: e.target.value })
                      }
                      placeholder="0.00"
                      className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white text-right focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Flip Button */}
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={handleFlipAssets}
                    className="p-3 bg-cyan-500/20 border border-cyan-500/30 rounded-xl hover:bg-cyan-500/30 transition-all"
                  >
                    <ArrowUpDown className="text-cyan-400" size={24} />
                  </button>
                </div>

                {/* To Asset */}
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    To (Estimated)
                  </label>
                  <div className="flex gap-3">
                    <select
                      value={swapData.toAsset}
                      onChange={(e) =>
                        setSwapData({ ...swapData, toAsset: e.target.value })
                      }
                      className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                    >
                      {cryptoAssets.map((asset) => (
                        <option key={asset.symbol} value={asset.symbol}>
                          {asset.logo} {asset.symbol} - {asset.name}
                        </option>
                      ))}
                    </select>
                    <div className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white text-right">
                      {estimatedOutput.toFixed(4)}
                    </div>
                  </div>
                </div>

                {/* Rate & Slippage */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Exchange Rate
                    </label>
                    <div className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white flex items-center justify-between">
                      {isLoadingRate ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-cyan-400"></div>
                          <span className="text-gray-400">Loading...</span>
                        </div>
                      ) : currentRate ? (
                        <span>
                          1 {swapData.fromAsset} = {currentRate.toFixed(6)}{" "}
                          {swapData.toAsset}
                        </span>
                      ) : (
                        <span className="text-red-400">Rate unavailable</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Rates update periodically; final rate will be applied at
                      execution.
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Slippage Tolerance (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={swapData.slippage}
                      onChange={(e) =>
                        setSwapData({ ...swapData, slippage: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                    />
                  </div>
                </div>

                {/* Transaction Details */}
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Info size={16} className="text-purple-400" />
                    <span className="text-sm font-semibold text-purple-400">
                      Transaction Summary
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Fee (0.1%)</span>
                      <span className="text-white">
                        {estimatedFee.toFixed(4)} {swapData.fromAsset}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">You will receive</span>
                      <span className="text-white font-semibold">
                        {estimatedOutput.toFixed(4)} {swapData.toAsset}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-cyan-500 text-white rounded-xl font-bold text-lg hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                      Processing...
                    </span>
                  ) : (
                    "Swap Now"
                  )}
                </button>

                {/* Message */}
                {message && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg flex items-start gap-3 ${
                      messageType === "success"
                        ? "bg-green-500/20 border border-green-500/30 text-green-400"
                        : "bg-red-500/20 border border-red-500/30 text-red-400"
                    }`}
                  >
                    {messageType === "success" ? (
                      <CheckCircle size={20} />
                    ) : (
                      <AlertCircle size={20} />
                    )}
                    <p className="text-sm">{message}</p>
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {/* AI Rate Info */}
            <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="text-cyan-400" size={20} />
                <h3 className="font-semibold text-white">
                  AI Rate Optimization
                </h3>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                Our AI scans 50+ exchanges to find you the best rates in
                real-time.
              </p>
            </div>

            {/* Recent Swaps */}
            <div className="bg-[#0B0F19] border border-gray-700 rounded-2xl p-6">
              <h3 className="font-semibold text-white mb-4">Recent Swaps</h3>
              {recentSwaps.length === 0 ? (
                <p className="text-sm text-gray-400">No recent swaps</p>
              ) : (
                <div className="space-y-3">
                  {recentSwaps.slice(0, 5).map((swap) => (
                    <div
                      key={swap.id}
                      className="flex items-center justify-between text-sm"
                    >
                      <div>
                        <p className="text-white font-medium">
                          {swap.fromAsset} → {swap.toAsset}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(swap.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          swap.status === "completed"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {swap.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
