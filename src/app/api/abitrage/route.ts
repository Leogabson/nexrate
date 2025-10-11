// src/app/api/arbitrage/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

async function getAuthSession() {
  return await getServerSession();
}

export async function GET(request: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "10");
    const minProfit = parseFloat(searchParams.get("minProfit") || "0");

    const client = await clientPromise;
    const db = client.db("nexrate");
    const arbitrageOpportunities = db.collection("arbitrage_opportunities");

    // Fetch latest arbitrage opportunities
    const opportunities = await arbitrageOpportunities
      .find({
        profitPercentage: { $gte: minProfit },
        expiresAt: { $gt: new Date() },
      })
      .sort({ profitPercentage: -1, createdAt: -1 })
      .limit(limit)
      .toArray();

    return NextResponse.json({
      opportunities: opportunities.map((opp) => ({
        id: opp._id.toString(),
        fromAsset: opp.fromAsset,
        toAsset: opp.toAsset,
        fromExchange: opp.fromExchange,
        toExchange: opp.toExchange,
        buyPrice: opp.buyPrice,
        sellPrice: opp.sellPrice,
        profitPercentage: opp.profitPercentage,
        estimatedProfit: opp.estimatedProfit,
        volume: opp.volume,
        liquidity: opp.liquidity,
        risk: opp.risk,
        createdAt: opp.createdAt,
        expiresAt: opp.expiresAt,
      })),
      count: opportunities.length,
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Get arbitrage error:", error);
    }
    return NextResponse.json(
      { error: "Failed to fetch arbitrage opportunities" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { opportunityId, amount } = await request.json();

    if (!opportunityId || !amount) {
      return NextResponse.json(
        { error: "Opportunity ID and amount are required" },
        { status: 400 }
      );
    }

    if (amount <= 0) {
      return NextResponse.json(
        { error: "Amount must be greater than 0" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("nexrate");
    const users = db.collection("users");
    const arbitrageOpportunities = db.collection("arbitrage_opportunities");
    const arbitrageTrades = db.collection("arbitrage_trades");
    const transactions = db.collection("transactions");

    const user = await users.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const opportunity = await arbitrageOpportunities.findOne({
      _id: new ObjectId(opportunityId),
    });

    if (!opportunity) {
      return NextResponse.json(
        { error: "Arbitrage opportunity not found" },
        { status: 404 }
      );
    }

    if (new Date() > opportunity.expiresAt) {
      return NextResponse.json(
        { error: "Arbitrage opportunity has expired" },
        { status: 400 }
      );
    }

    const tradeAmount = parseFloat(amount);
    const estimatedProfit = tradeAmount * (opportunity.profitPercentage / 100);
    const fee = tradeAmount * 0.005; // 0.5% fee
    const netProfit = estimatedProfit - fee;

    const trade = {
      userId: user._id,
      opportunityId: opportunity._id,
      fromAsset: opportunity.fromAsset,
      toAsset: opportunity.toAsset,
      fromExchange: opportunity.fromExchange,
      toExchange: opportunity.toExchange,
      amount: tradeAmount,
      buyPrice: opportunity.buyPrice,
      sellPrice: opportunity.sellPrice,
      profitPercentage: opportunity.profitPercentage,
      estimatedProfit,
      fee,
      netProfit,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
      executedAt: null,
    };

    const tradeResult = await arbitrageTrades.insertOne(trade);

    // Create transaction record
    const transaction = {
      userId: user._id,
      type: "arbitrage",
      status: "pending",
      amount: tradeAmount,
      currency: opportunity.fromAsset,
      fromAsset: opportunity.fromAsset,
      toAsset: opportunity.toAsset,
      rate: opportunity.sellPrice / opportunity.buyPrice,
      fee,
      details: {
        arbitrageTradeId: tradeResult.insertedId.toString(),
        fromExchange: opportunity.fromExchange,
        toExchange: opportunity.toExchange,
        profitPercentage: opportunity.profitPercentage,
        estimatedProfit,
        netProfit,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      completedAt: null,
    };

    await transactions.insertOne(transaction);

    return NextResponse.json(
      {
        message: "Arbitrage trade initiated",
        trade: {
          id: tradeResult.insertedId.toString(),
          fromAsset: opportunity.fromAsset,
          toAsset: opportunity.toAsset,
          amount: tradeAmount,
          estimatedProfit,
          netProfit,
          status: "pending",
        },
      },
      { status: 201 }
    );
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Execute arbitrage error:", error);
    }
    return NextResponse.json(
      { error: "Failed to execute arbitrage trade" },
      { status: 500 }
    );
  }
}
