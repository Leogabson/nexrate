"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/dashboardpage/DashboardLayout";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Gift,
  CreditCard,
  Lock,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";

interface Transaction {
  id: string;
  type: string;
  status: string;
  amount: number;
  currency: string;
  fromAsset: string | null;
  toAsset: string | null;
  rate: number | null;
  fee: number;
  createdAt: string;
  completedAt: string | null;
  details: any;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function TransactionsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: "",
    status: "",
    search: "",
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin");
    }
  }, [status, router]);

  // Fetch transactions
  useEffect(() => {
    if (status === "authenticated") {
      fetchTransactions();
    }
  }, [status, pagination.page, filters.type, filters.status]);

  const fetchTransactions = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      });

      if (filters.type) params.append("type", filters.type);
      if (filters.status) params.append("status", filters.status);

      const res = await fetch(`/api/user/transactions?${params}`);
      const data = await res.json();

      if (res.ok) {
        setTransactions(data.transactions || []);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getTypeIcon = (type: string) => {
    const icons: { [key: string]: any } = {
      swap: ArrowUpRight,
      giftcard: Gift,
      bill: CreditCard,
      rate_lock: Lock,
    };
    return icons[type] || ArrowUpRight;
  };

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      swap: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
      giftcard: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      bill: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      rate_lock: "bg-pink-500/20 text-pink-400 border-pink-500/30",
    };
    return colors[type] || "bg-gray-500/20 text-gray-400 border-gray-500/30";
  };

  const getStatusBadge = (status: string) => {
    const badges: {
      [key: string]: { icon: any; color: string; label: string };
    } = {
      pending: {
        icon: Clock,
        color: "bg-yellow-500/20 text-yellow-400",
        label: "Pending",
      },
      completed: {
        icon: CheckCircle,
        color: "bg-green-500/20 text-green-400",
        label: "Completed",
      },
      failed: {
        icon: XCircle,
        color: "bg-red-500/20 text-red-400",
        label: "Failed",
      },
    };
    return badges[status] || badges.pending;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination({ ...pagination, page: newPage });
    }
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
        >
          <h1 className="text-3xl font-bold text-white mb-2">Transactions</h1>
          <p className="text-gray-400">
            View and manage your transaction history
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-[#0B0F19] border border-gray-700 rounded-2xl p-6"
        >
          <div className="grid md:grid-cols-3 gap-4">
            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Transaction Type
              </label>
              <select
                value={filters.type}
                onChange={(e) => {
                  setFilters({ ...filters, type: e.target.value });
                  setPagination({ ...pagination, page: 1 });
                }}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
              >
                <option value="">All Types</option>
                <option value="swap">Crypto Swap</option>
                <option value="giftcard">Gift Card</option>
                <option value="bill">Bill Payment</option>
                <option value="rate_lock">Rate Lock</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => {
                  setFilters({ ...filters, status: e.target.value });
                  setPagination({ ...pagination, page: 1 });
                }}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
              </select>
            </div>

            {/* Search (Placeholder for future) */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Search
              </label>
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={filters.search}
                  onChange={(e) =>
                    setFilters({ ...filters, search: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Transactions Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-[#0B0F19] border border-gray-700 rounded-2xl overflow-hidden"
        >
          {transactions.length === 0 ? (
            <div className="p-12 text-center">
              <div className="inline-flex p-6 bg-gray-800/50 rounded-full mb-4">
                <ArrowUpRight className="text-gray-500" size={48} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                No Transactions Yet
              </h3>
              <p className="text-gray-400">
                Your transaction history will appear here once you start trading
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800/50 border-b border-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">
                      Type
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">
                      Assets
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {transactions.map((tx, index) => {
                    const TypeIcon = getTypeIcon(tx.type);
                    const statusBadge = getStatusBadge(tx.status);
                    const StatusIcon = statusBadge.icon;

                    return (
                      <motion.tr
                        key={tx.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="hover:bg-gray-800/30 transition-colors"
                      >
                        {/* Type */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`p-2 rounded-lg border ${getTypeColor(
                                tx.type
                              )}`}
                            >
                              <TypeIcon size={20} />
                            </div>
                            <span className="text-white font-medium capitalize">
                              {tx.type.replace("_", " ")}
                            </span>
                          </div>
                        </td>

                        {/* Assets */}
                        <td className="px-6 py-4">
                          {tx.fromAsset && tx.toAsset ? (
                            <div className="flex items-center gap-2 text-sm">
                              <span className="text-gray-400">
                                {tx.fromAsset}
                              </span>
                              <ArrowUpRight
                                size={16}
                                className="text-gray-500"
                              />
                              <span className="text-white font-medium">
                                {tx.toAsset}
                              </span>
                            </div>
                          ) : (
                            <span className="text-gray-400 text-sm">—</span>
                          )}
                        </td>

                        {/* Amount */}
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-white font-semibold">
                              {tx.amount.toFixed(4)} {tx.currency}
                            </p>
                            {tx.fee > 0 && (
                              <p className="text-xs text-gray-500">
                                Fee: ${tx.fee.toFixed(2)}
                              </p>
                            )}
                          </div>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${statusBadge.color}`}
                          >
                            <StatusIcon size={14} />
                            {statusBadge.label}
                          </span>
                        </td>

                        {/* Date */}
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-400">
                            {formatDate(tx.createdAt)}
                          </p>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {transactions.length > 0 && pagination.totalPages > 1 && (
            <div className="border-t border-gray-700 px-6 py-4 flex items-center justify-between">
              <p className="text-sm text-gray-400">
                Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
                {Math.min(pagination.page * pagination.limit, pagination.total)}{" "}
                of {pagination.total} transactions
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className="p-2 border border-gray-700 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft className="text-gray-400" size={20} />
                </button>
                <span className="text-sm text-white px-4">
                  Page {pagination.page} of {pagination.totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.totalPages}
                  className="p-2 border border-gray-700 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight className="text-gray-400" size={20} />
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
