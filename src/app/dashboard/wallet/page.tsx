"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/dashboardpage/DashboardLayout";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wallet as WalletIcon,
  Plus,
  Trash2,
  Check,
  X,
  Copy,
  AlertCircle,
} from "lucide-react";

interface Wallet {
  id: string;
  address: string;
  blockchain: string;
  balance: number;
  currency: string;
  isDefault: boolean;
  createdAt: string;
}

export default function WalletPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  const [newWallet, setNewWallet] = useState({
    address: "",
    blockchain: "ethereum",
    currency: "ETH",
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin");
    }
  }, [status, router]);

  // Fetch wallets
  useEffect(() => {
    if (status === "authenticated") {
      fetchWallets();
    }
  }, [status]);

  const fetchWallets = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/user/wallet");
      const data = await res.json();

      if (res.ok) {
        setWallets(data.wallets || []);
        setTotalBalance(data.totalBalance || 0);
      }
    } catch (error) {
      console.error("Failed to fetch wallets:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddWallet = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    setMessageType("");

    try {
      const res = await fetch("/api/user/wallet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newWallet),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Wallet connected successfully!");
        setMessageType("success");
        setShowAddModal(false);
        setNewWallet({ address: "", blockchain: "ethereum", currency: "ETH" });
        fetchWallets();
      } else {
        setMessage(data.error || "Failed to connect wallet");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Network error. Please try again.");
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteWallet = async (walletId: string) => {
    if (!confirm("Are you sure you want to disconnect this wallet?")) return;

    try {
      const res = await fetch(`/api/user/wallet?id=${walletId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Wallet disconnected successfully!");
        setMessageType("success");
        fetchWallets();
      } else {
        setMessage(data.error || "Failed to disconnect wallet");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Network error. Please try again.");
      setMessageType("error");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setMessage("Address copied to clipboard!");
    setMessageType("success");
    setTimeout(() => setMessage(""), 2000);
  };

  const getBlockchainColor = (blockchain: string) => {
    const colors: { [key: string]: string } = {
      ethereum: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      bitcoin: "bg-orange-500/20 text-orange-400 border-orange-500/30",
      binance: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      polygon: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    };
    return (
      colors[blockchain.toLowerCase()] ||
      "bg-gray-500/20 text-gray-400 border-gray-500/30"
    );
  };

  if (status === "loading" || isLoading) {
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
          className="flex justify-between items-start"
        >
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Wallet</h1>
            <p className="text-gray-400">
              Manage your connected crypto wallets
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-cyan-500 text-white rounded-lg font-semibold hover:bg-cyan-600 transition-all"
          >
            <Plus size={20} />
            Connect Wallet
          </button>
        </motion.div>

        {/* Total Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-cyan-500/20 rounded-xl">
              <WalletIcon className="text-cyan-400" size={32} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total Portfolio Value</p>
              <h2 className="text-4xl font-bold text-white">
                ${totalBalance.toFixed(2)}
              </h2>
            </div>
          </div>
          <p className="text-sm text-gray-400">
            Across {wallets.length} connected wallet
            {wallets.length !== 1 ? "s" : ""}
          </p>
        </motion.div>

        {/* Message */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`p-4 rounded-lg flex items-center gap-3 ${
                messageType === "success"
                  ? "bg-green-500/20 border border-green-500/30 text-green-400"
                  : "bg-red-500/20 border border-red-500/30 text-red-400"
              }`}
            >
              {messageType === "success" ? (
                <Check size={20} />
              ) : (
                <AlertCircle size={20} />
              )}
              {message}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Wallets List */}
        {wallets.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#0B0F19] border border-gray-700 rounded-2xl p-12 text-center"
          >
            <div className="inline-flex p-6 bg-gray-800/50 rounded-full mb-4">
              <WalletIcon className="text-gray-500" size={48} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No Wallets Connected
            </h3>
            <p className="text-gray-400 mb-6">
              Connect your first crypto wallet to start trading
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 text-white rounded-lg font-semibold hover:bg-cyan-600 transition-all"
            >
              <Plus size={20} />
              Connect Your First Wallet
            </button>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {wallets.map((wallet, index) => (
              <motion.div
                key={wallet.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                className="bg-[#0B0F19] border border-gray-700 rounded-2xl p-6 hover:border-cyan-500/50 transition-all relative"
              >
                {wallet.isDefault && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-cyan-500/20 text-cyan-400 text-xs px-3 py-1 rounded-full font-semibold">
                      Default
                    </span>
                  </div>
                )}

                <div className="mb-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getBlockchainColor(
                      wallet.blockchain
                    )}`}
                  >
                    {wallet.blockchain.toUpperCase()}
                  </span>
                </div>

                <div className="mb-4">
                  <p className="text-gray-400 text-sm mb-1">Wallet Address</p>
                  <div className="flex items-center gap-2">
                    <code className="text-white font-mono text-sm bg-gray-800/50 px-3 py-2 rounded-lg flex-1 overflow-hidden text-ellipsis">
                      {wallet.address.slice(0, 8)}...{wallet.address.slice(-6)}
                    </code>
                    <button
                      onClick={() => copyToClipboard(wallet.address)}
                      className="p-2 bg-gray-800/50 border border-gray-700 rounded-lg hover:bg-gray-700 transition-all"
                    >
                      <Copy size={16} className="text-gray-400" />
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-gray-400 text-sm mb-1">Balance</p>
                  <p className="text-2xl font-bold text-white">
                    {wallet.balance.toFixed(4)} {wallet.currency}
                  </p>
                  <p className="text-sm text-gray-400">
                    ≈ ${wallet.balance.toFixed(2)} USD
                  </p>
                </div>

                <div className="flex gap-2 pt-4 border-t border-gray-700">
                  <button
                    onClick={() => handleDeleteWallet(wallet.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-all text-sm font-medium"
                  >
                    <Trash2 size={16} />
                    Disconnect
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Add Wallet Modal */}
        <AnimatePresence>
          {showAddModal && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowAddModal(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              />

              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
              >
                <div className="bg-[#0B0F19] border border-gray-700 rounded-2xl p-8 max-w-md w-full">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-white">
                      Connect Wallet
                    </h3>
                    <button
                      onClick={() => setShowAddModal(false)}
                      className="p-2 hover:bg-gray-800 rounded-lg transition-all"
                    >
                      <X className="text-gray-400" size={20} />
                    </button>
                  </div>

                  <form onSubmit={handleAddWallet} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Blockchain Network
                      </label>
                      <select
                        value={newWallet.blockchain}
                        onChange={(e) => {
                          const blockchain = e.target.value;
                          const currencyMap: { [key: string]: string } = {
                            ethereum: "ETH",
                            bitcoin: "BTC",
                            binance: "BNB",
                            polygon: "MATIC",
                          };
                          setNewWallet({
                            ...newWallet,
                            blockchain,
                            currency: currencyMap[blockchain] || "ETH",
                          });
                        }}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                      >
                        <option value="ethereum">Ethereum (ETH)</option>
                        <option value="bitcoin">Bitcoin (BTC)</option>
                        <option value="binance">
                          Binance Smart Chain (BNB)
                        </option>
                        <option value="polygon">Polygon (MATIC)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Wallet Address
                      </label>
                      <input
                        type="text"
                        value={newWallet.address}
                        onChange={(e) =>
                          setNewWallet({
                            ...newWallet,
                            address: e.target.value,
                          })
                        }
                        placeholder="0x..."
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all font-mono"
                        required
                      />
                    </div>

                    <div className="pt-4 flex gap-3">
                      <button
                        type="button"
                        onClick={() => setShowAddModal(false)}
                        className="flex-1 px-4 py-3 border border-gray-700 text-gray-400 rounded-lg hover:bg-gray-800 transition-all"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 px-4 py-3 bg-cyan-500 text-white rounded-lg font-semibold hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      >
                        {isSubmitting ? "Connecting..." : "Connect"}
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}
