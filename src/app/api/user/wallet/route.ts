// src/app/api/user/wallet/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const session = await getServerSession();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("nexrate");
    const wallets = db.collection("wallets");

    const userWallets = await wallets
      .find({ userId: new ObjectId(session.user.id) })
      .toArray();

    return NextResponse.json({
      wallets: userWallets.map((wallet) => ({
        id: wallet._id.toString(),
        address: wallet.address,
        blockchain: wallet.blockchain,
        balance: wallet.balance,
        currency: wallet.currency,
        isDefault: wallet.isDefault,
        createdAt: wallet.createdAt,
      })),
      totalBalance: userWallets.reduce((sum, w) => sum + (w.balance || 0), 0),
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Get wallet error:", error);
    }
    return NextResponse.json(
      { error: "Failed to fetch wallets" },
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

    const { address, blockchain, currency } = await request.json();

    if (!address || !blockchain || !currency) {
      return NextResponse.json(
        { error: "Address, blockchain, and currency are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("nexrate");
    const wallets = db.collection("wallets");

    // Check if wallet already exists
    const existingWallet = await wallets.findOne({
      userId: new ObjectId(session.user.id),
      address,
      blockchain,
    });

    if (existingWallet) {
      return NextResponse.json(
        { error: "Wallet already connected" },
        { status: 400 }
      );
    }

    // Check if this is the first wallet
    const walletCount = await wallets.countDocuments({
      userId: new ObjectId(session.user.id),
    });

    const newWallet = {
      userId: new ObjectId(session.user.id),
      address,
      blockchain,
      currency,
      balance: 0,
      isDefault: walletCount === 0, // First wallet is default
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await wallets.insertOne(newWallet);

    return NextResponse.json(
      {
        message: "Wallet connected successfully",
        wallet: {
          id: result.insertedId.toString(),
          ...newWallet,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Connect wallet error:", error);
    }
    return NextResponse.json(
      { error: "Failed to connect wallet" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const walletId = searchParams.get("id");

    if (!walletId) {
      return NextResponse.json(
        { error: "Wallet ID is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("nexrate");
    const wallets = db.collection("wallets");

    const wallet = await wallets.findOne({
      _id: new ObjectId(walletId),
      userId: new ObjectId(session.user.id),
    });

    if (!wallet) {
      return NextResponse.json({ error: "Wallet not found" }, { status: 404 });
    }

    await wallets.deleteOne({ _id: new ObjectId(walletId) });

    // If deleted wallet was default, make another wallet default
    if (wallet.isDefault) {
      const nextWallet = await wallets.findOne({
        userId: new ObjectId(session.user.id),
      });

      if (nextWallet) {
        await wallets.updateOne(
          { _id: nextWallet._id },
          { $set: { isDefault: true } }
        );
      }
    }

    return NextResponse.json({
      message: "Wallet disconnected successfully",
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Delete wallet error:", error);
    }
    return NextResponse.json(
      { error: "Failed to disconnect wallet" },
      { status: 500 }
    );
  }
}
