"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AlertCircle, Lightbulb, TrendingUp } from "lucide-react";

interface Insight {
  id: string;
  type: "market_trend" | "price_alert" | "general_tip" | "news";
  title: string;
  message: string;
  sentiment: "positive" | "negative" | "neutral";
  icon: string;
  createdAt: string;
}

interface InsightsResponse {
  insights: Insight[];
  disclaimer: string;
  lastUpdated: string;
}

export default function InsightsWidget() {
  const [data, setData] = useState<InsightsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const response = await fetch("/api/ai-insights");
        if (!response.ok) throw new Error("Failed to fetch insights");
        const data: InsightsResponse = await response.json();
        setData(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load insights"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
    // Refresh insights every 5 minutes
    const interval = setInterval(fetchInsights, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "text-green-400";
      case "negative":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "market_trend":
        return <TrendingUp className="w-4 h-4" />;
      case "general_tip":
        return <Lightbulb className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="bg-[#0B0F19] border border-gray-700 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-white">AI Insights</h3>
          <div className="animate-pulse bg-cyan-500/20 rounded-full h-4 w-16"></div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-6 bg-gray-700/50 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-700/30 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#0B0F19] border border-gray-700 rounded-2xl p-6">
        <div className="text-center text-red-400">
          <AlertCircle className="w-8 h-8 mx-auto mb-2" />
          <p>Failed to load insights</p>
        </div>
      </div>
    );
  }

  if (!data?.insights.length) {
    return null;
  }

  return (
    <div className="bg-[#0B0F19] border border-gray-700 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span role="img" aria-label="robot">
              🤖
            </span>{" "}
            AI Insights
          </h3>
          <p className="text-sm text-gray-400">
            Market analysis & opportunities
          </p>
        </div>
        <span className="bg-cyan-500/20 text-cyan-400 text-xs px-3 py-1 rounded-full">
          Live
        </span>
      </div>

      <div className="space-y-4">
        {data.insights.map((insight, index) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="border border-gray-700/50 rounded-xl p-4 hover:bg-gray-800/20 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-gray-700/30">
                {insight.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-white">{insight.title}</h4>
                  <span
                    className={`text-xs ${getSentimentColor(
                      insight.sentiment
                    )}`}
                  >
                    {insight.type.replace("_", " ")}
                  </span>
                </div>
                <p className="text-sm text-gray-400">{insight.message}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {data.disclaimer && (
        <p className="mt-4 text-xs text-gray-500 italic">{data.disclaimer}</p>
      )}
    </div>
  );
}
