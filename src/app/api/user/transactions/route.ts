// src/app/api/user/transactions/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(request: Request) {
  try {
    const session = await getServerSession();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const type = searchParams.get("type"); // swap, giftcard, bill, rate_lock
    const status = searchParams.get("status"); // pending, completed, failed

    const client = await clientPromise;
    const db = client.db("nexrate");
    const transactions = db.collection("transactions");

    // Build query
    const query: any = { userId: new ObjectId(session.user.id) };
    if (type) query.type = type;
    if (status) query.status = status;

    // Get total count
    const total = await transactions.countDocuments(query);

    // Fetch transactions with pagination
    const results = await transactions
      .find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    return NextResponse.json({
      transactions: results.map((tx) => ({
        id: tx._id.toString(),
        type: tx.type,
        status: tx.status,
        amount: tx.amount,
        currency: tx.currency,
        fromAsset: tx.fromAsset,
        toAsset: tx.toAsset,
        rate: tx.rate,
        fee: tx.fee,
        createdAt: tx.createdAt,
        completedAt: tx.completedAt,
        details: tx.details,
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Get transactions error:", error);
    }
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { type, amount, currency, fromAsset, toAsset, rate, fee, details } =
      await request.json();

    if (!type || !amount || !currency) {
      return NextResponse.json(
        { error: "Type, amount, and currency are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("nexrate");
    const transactions = db.collection("transactions");

    const newTransaction = {
      userId: new ObjectId(session.user.id),
      type, // swap, giftcard, bill, rate_lock
      status: "pending",
      amount: parseFloat(amount),
      currency,
      fromAsset: fromAsset || null,
      toAsset: toAsset || null,
      rate: rate ? parseFloat(rate) : null,
      fee: fee ? parseFloat(fee) : 0,
      details: details || {},
      createdAt: new Date(),
      updatedAt: new Date(),
      completedAt: null,
    };

    const result = await transactions.insertOne(newTransaction);

    return NextResponse.json(
      {
        message: "Transaction created successfully",
        transaction: {
          id: result.insertedId.toString(),
          ...newTransaction,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Create transaction error:", error);
    }
    return NextResponse.json(
      { error: "Failed to create transaction" },
      { status: 500 }
    );
  }
}
