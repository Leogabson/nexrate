// src/app/api/bills/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

async function getAuthSession() {
  return await getServerSession();
}

export async function POST(request: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      billType,
      provider,
      accountNumber,
      amount,
      currency,
      paymentMethod,
    } = await request.json();

    if (
      !billType ||
      !provider ||
      !accountNumber ||
      !amount ||
      !currency ||
      !paymentMethod
    ) {
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

    const validBillTypes = [
      "electricity",
      "water",
      "internet",
      "cable",
      "phone",
      "gas",
    ];
    if (!validBillTypes.includes(billType)) {
      return NextResponse.json({ error: "Invalid bill type" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("nexrate");
    const users = db.collection("users");
    const bills = db.collection("bills");
    const transactions = db.collection("transactions");

    const user = await users.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const billAmount = parseFloat(amount);
    const fee = billAmount * 0.01; // 1% processing fee
    const totalAmount = billAmount + fee;

    const bill = {
      userId: user._id,
      billType,
      provider,
      accountNumber,
      amount: billAmount,
      currency,
      paymentMethod,
      fee,
      totalAmount,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
      completedAt: null,
      reference: `BILL-${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 9)
        .toUpperCase()}`,
    };

    const billResult = await bills.insertOne(bill);

    // Create transaction record
    const transaction = {
      userId: user._id,
      type: "bill",
      status: "pending",
      amount: totalAmount,
      currency,
      fromAsset: currency,
      toAsset: null,
      rate: null,
      fee,
      details: {
        billId: billResult.insertedId.toString(),
        billType,
        provider,
        accountNumber,
        reference: bill.reference,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      completedAt: null,
    };

    await transactions.insertOne(transaction);

    return NextResponse.json(
      {
        message: "Bill payment initiated",
        bill: {
          id: billResult.insertedId.toString(),
          billType,
          provider,
          amount: billAmount,
          fee,
          totalAmount,
          reference: bill.reference,
          status: "pending",
        },
      },
      { status: 201 }
    );
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Bill payment error:", error);
    }
    return NextResponse.json(
      { error: "Failed to initiate bill payment" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const billId = searchParams.get("id");

    const client = await clientPromise;
    const db = client.db("nexrate");
    const users = db.collection("users");
    const bills = db.collection("bills");

    const user = await users.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (billId) {
      const bill = await bills.findOne({
        _id: new ObjectId(billId),
        userId: user._id,
      });

      if (!bill) {
        return NextResponse.json({ error: "Bill not found" }, { status: 404 });
      }

      return NextResponse.json({
        bill: {
          id: bill._id.toString(),
          billType: bill.billType,
          provider: bill.provider,
          accountNumber: bill.accountNumber,
          amount: bill.amount,
          currency: bill.currency,
          fee: bill.fee,
          totalAmount: bill.totalAmount,
          status: bill.status,
          reference: bill.reference,
          createdAt: bill.createdAt,
          completedAt: bill.completedAt,
        },
      });
    }

    // Get all user bills
    const userBills = await bills
      .find({ userId: user._id })
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();

    return NextResponse.json({
      bills: userBills.map((bill) => ({
        id: bill._id.toString(),
        billType: bill.billType,
        provider: bill.provider,
        amount: bill.amount,
        currency: bill.currency,
        status: bill.status,
        reference: bill.reference,
        createdAt: bill.createdAt,
      })),
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Get bill error:", error);
    }
    return NextResponse.json(
      { error: "Failed to fetch bills" },
      { status: 500 }
    );
  }
}
