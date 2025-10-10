// src/app/api/swap/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(request: Request) {
  try {
    const session = await getServerSession();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { fromAsset, toAsset, amount, rate, slippage } = await request.json();

    if (!fromAsset || !toAsset || !amount || !rate) {
      return NextResponse.json(
        { error: "All fields are required" },
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
    const transactions = db.collection("transactions");
    const swaps = db.collection("swaps");

    // Calculate swap details
    const fromAmount = parseFloat(amount);
    const exchangeRate = parseFloat(rate);
    const slippagePercent = slippage || 0.5; // Default 0.5%
    const fee = fromAmount * 0.001; // 0.1% fee
    const toAmount = (fromAmount - fee) * exchangeRate;

    // Create swap record
    const swap = {
      userId: new ObjectId(session.user.id),
      fromAsset,
      toAsset,
      fromAmount,
      toAmount,
      rate: exchangeRate,
      slippage: slippagePercent,
      fee,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
      completedAt: null,
      txHash: null,
    };

    const swapResult = await swaps.insertOne(swap);

    // Create transaction record
    const transaction = {
      userId: new ObjectId(session.user.id),
      type: "swap",
      status: "pending",
      amount: fromAmount,
      currency: fromAsset,
      fromAsset,
      toAsset,
      rate: exchangeRate,
      fee,
      details: {
        swapId: swapResult.insertedId.toString(),
        toAmount,
        slippage: slippagePercent,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      completedAt: null,
    };

    const txResult = await transactions.insertOne(transaction);

    return NextResponse.json(
      {
        message: "Swap initiated successfully",
        swap: {
          id: swapResult.insertedId.toString(),
          transactionId: txResult.insertedId.toString(),
          fromAsset,
          toAsset,
          fromAmount,
          toAmount,
          rate: exchangeRate,
          fee,
          status: "pending",
        },
      },
      { status: 201 }
    );
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Swap error:", error);
    }
    return NextResponse.json(
      { error: "Failed to initiate swap" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const swapId = searchParams.get("id");

    const client = await clientPromise;
    const db = client.db("nexrate");
    const swaps = db.collection("swaps");

    if (swapId) {
      // Get specific swap
      const swap = await swaps.findOne({
        _id: new ObjectId(swapId),
        userId: new ObjectId(session.user.id),
      });

      if (!swap) {
        return NextResponse.json({ error: "Swap not found" }, { status: 404 });
      }

      return NextResponse.json({
        swap: {
          id: swap._id.toString(),
          fromAsset: swap.fromAsset,
          toAsset: swap.toAsset,
          fromAmount: swap.fromAmount,
          toAmount: swap.toAmount,
          rate: swap.rate,
          fee: swap.fee,
          status: swap.status,
          txHash: swap.txHash,
          createdAt: swap.createdAt,
          completedAt: swap.completedAt,
        },
      });
    }

    // Get all user swaps
    const userSwaps = await swaps
      .find({ userId: new ObjectId(session.user.id) })
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();

    return NextResponse.json({
      swaps: userSwaps.map((swap) => ({
        id: swap._id.toString(),
        fromAsset: swap.fromAsset,
        toAsset: swap.toAsset,
        fromAmount: swap.fromAmount,
        toAmount: swap.toAmount,
        rate: swap.rate,
        fee: swap.fee,
        status: swap.status,
        createdAt: swap.createdAt,
      })),
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Get swap error:", error);
    }
    return NextResponse.json(
      { error: "Failed to fetch swap" },
      { status: 500 }
    );
  }
}
