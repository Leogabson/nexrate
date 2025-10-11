// src/app/api/ai-insights/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

async function getAuthSession() {
  return await getServerSession();
}

export async function GET() {
  try {
    const session = await getAuthSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("nexrate");
    const insights = db.collection("ai_insights");

    // Get latest active insights (you'll update these periodically via cron/admin)
    const latestInsights = await insights
      .find({
        active: true,
        expiresAt: { $gt: new Date() },
      })
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray();

    // If no insights in DB, return default/fallback insights
    if (latestInsights.length === 0) {
      return NextResponse.json({
        insights: [
          {
            id: "default-1",
            type: "market_trend",
            title: "Bitcoin Momentum",
            message:
              "Bitcoin showing consolidation pattern near key support levels",
            sentiment: "neutral",
            icon: "📊",
            createdAt: new Date(),
          },
          {
            id: "default-2",
            type: "market_trend",
            title: "Ethereum Activity",
            message:
              "Ethereum network activity increasing with upcoming upgrades",
            sentiment: "positive",
            icon: "⚡",
            createdAt: new Date(),
          },
          {
            id: "default-3",
            type: "general_tip",
            title: "Trading Tip",
            message:
              "Consider dollar-cost averaging (DCA) for long-term positions",
            sentiment: "neutral",
            icon: "💡",
            createdAt: new Date(),
          },
        ],
        disclaimer:
          "AI-generated insights are not financial advice. Always do your own research (DYOR) before making investment decisions.",
        lastUpdated: new Date(),
      });
    }

    return NextResponse.json({
      insights: latestInsights.map((insight) => ({
        id: insight._id.toString(),
        type: insight.type,
        title: insight.title,
        message: insight.message,
        sentiment: insight.sentiment,
        icon: insight.icon,
        createdAt: insight.createdAt,
      })),
      disclaimer:
        "AI-generated insights are not financial advice. Always do your own research (DYOR) before making investment decisions.",
      lastUpdated: latestInsights[0]?.createdAt || new Date(),
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Get AI insights error:", error);
    }
    return NextResponse.json(
      { error: "Failed to fetch AI insights" },
      { status: 500 }
    );
  }
}

// Admin endpoint to create/update insights (you'll secure this later)
export async function POST(request: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { type, title, message, sentiment, icon, expiresIn } =
      await request.json();

    if (!type || !title || !message) {
      return NextResponse.json(
        { error: "Type, title, and message are required" },
        { status: 400 }
      );
    }

    const validTypes = ["market_trend", "price_alert", "general_tip", "news"];
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { error: "Invalid insight type" },
        { status: 400 }
      );
    }

    const validSentiments = ["positive", "negative", "neutral"];
    if (sentiment && !validSentiments.includes(sentiment)) {
      return NextResponse.json({ error: "Invalid sentiment" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("nexrate");
    const insights = db.collection("ai_insights");

    // Calculate expiry (default 24 hours)
    const hoursToExpire = expiresIn || 24;
    const expiresAt = new Date(Date.now() + hoursToExpire * 60 * 60 * 1000);

    const newInsight = {
      type,
      title,
      message,
      sentiment: sentiment || "neutral",
      icon: icon || "🤖",
      active: true,
      createdAt: new Date(),
      expiresAt,
    };

    const result = await insights.insertOne(newInsight);

    return NextResponse.json(
      {
        message: "AI insight created successfully",
        insight: {
          id: result.insertedId.toString(),
          ...newInsight,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Create AI insight error:", error);
    }
    return NextResponse.json(
      { error: "Failed to create AI insight" },
      { status: 500 }
    );
  }
}

// Deactivate insight
export async function PATCH(request: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { insightId } = await request.json();

    if (!insightId) {
      return NextResponse.json(
        { error: "Insight ID is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("nexrate");
    const insights = db.collection("ai_insights");

    const result = await insights.updateOne(
      { _id: new ObjectId(insightId) },
      { $set: { active: false } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Insight not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "AI insight deactivated successfully",
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Deactivate AI insight error:", error);
    }
    return NextResponse.json(
      { error: "Failed to deactivate AI insight" },
      { status: 500 }
    );
  }
}
