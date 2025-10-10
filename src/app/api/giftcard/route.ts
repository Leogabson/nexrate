// src/app/api/giftcard/route.ts
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

    const { brand, amount, currency, quantity, paymentMethod } =
      await request.json();

    if (!brand || !amount || !currency || !quantity || !paymentMethod) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (amount <= 0 || quantity <= 0) {
      return NextResponse.json(
        { error: "Amount and quantity must be greater than 0" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("nexrate");
    const giftcards = db.collection("giftcards");
    const transactions = db.collection("transactions");

    const unitPrice = parseFloat(amount);
    const qty = parseInt(quantity);
    const totalAmount = unitPrice * qty;
    const fee = totalAmount * 0.015; // 1.5% fee
    const finalAmount = totalAmount + fee;

    const giftcard = {
      userId: new ObjectId(session.user.id),
      brand,
      unitPrice,
      quantity: qty,
      totalAmount,
      currency,
      paymentMethod,
      fee,
      finalAmount,
      status: "pending",
      codes: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      deliveredAt: null,
    };

    const gcResult = await giftcards.insertOne(giftcard);

    // Create transaction record
    const transaction = {
      userId: new ObjectId(session.user.id),
      type: "giftcard",
      status: "pending",
      amount: finalAmount,
      currency,
      fromAsset: currency,
      toAsset: null,
      rate: null,
      fee,
      details: {
        giftcardId: gcResult.insertedId.toString(),
        brand,
        quantity: qty,
        unitPrice,
        paymentMethod,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      completedAt: null,
    };

    await transactions.insertOne(transaction);

    return NextResponse.json(
      {
        message: "Gift card purchase initiated",
        giftcard: {
          id: gcResult.insertedId.toString(),
          brand,
          quantity: qty,
          unitPrice,
          totalAmount,
          fee,
          finalAmount,
          status: "pending",
        },
      },
      { status: 201 }
    );
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Gift card purchase error:", error);
    }
    return NextResponse.json(
      { error: "Failed to purchase gift card" },
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
    const gcId = searchParams.get("id");

    const client = await clientPromise;
    const db = client.db("nexrate");
    const giftcards = db.collection("giftcards");

    if (gcId) {
      const giftcard = await giftcards.findOne({
        _id: new ObjectId(gcId),
        userId: new ObjectId(session.user.id),
      });

      if (!giftcard) {
        return NextResponse.json(
          { error: "Gift card not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({
        giftcard: {
          id: giftcard._id.toString(),
          brand: giftcard.brand,
          quantity: giftcard.quantity,
          unitPrice: giftcard.unitPrice,
          totalAmount: giftcard.totalAmount,
          currency: giftcard.currency,
          fee: giftcard.fee,
          finalAmount: giftcard.finalAmount,
          status: giftcard.status,
          codes: giftcard.codes,
          createdAt: giftcard.createdAt,
          deliveredAt: giftcard.deliveredAt,
        },
      });
    }

    // Get all user gift cards
    const userGiftcards = await giftcards
      .find({ userId: new ObjectId(session.user.id) })
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();

    return NextResponse.json({
      giftcards: userGiftcards.map((gc) => ({
        id: gc._id.toString(),
        brand: gc.brand,
        quantity: gc.quantity,
        unitPrice: gc.unitPrice,
        totalAmount: gc.totalAmount,
        currency: gc.currency,
        status: gc.status,
        createdAt: gc.createdAt,
      })),
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Get gift card error:", error);
    }
    return NextResponse.json(
      { error: "Failed to fetch gift cards" },
      { status: 500 }
    );
  }
}
