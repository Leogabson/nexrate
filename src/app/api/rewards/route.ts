// src/app/api/rewards/route.ts
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
    const type = searchParams.get("type"); // earned, claimed, pending

    const client = await clientPromise;
    const db = client.db("nexrate");
    const users = db.collection("users");
    const rewards = db.collection("rewards");

    const user = await users.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Build query
    const query: any = { userId: user._id };
    if (type) query.status = type;

    // Fetch rewards
    const userRewards = await rewards
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    // Calculate totals
    const totalEarned = await rewards
      .aggregate([
        { $match: { userId: user._id } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ])
      .toArray();

    const totalClaimed = await rewards
      .aggregate([
        { $match: { userId: user._id, status: "claimed" } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ])
      .toArray();

    const totalPending = await rewards
      .aggregate([
        { $match: { userId: user._id, status: "pending" } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ])
      .toArray();

    return NextResponse.json({
      rewards: userRewards.map((reward) => ({
        id: reward._id.toString(),
        type: reward.type,
        amount: reward.amount,
        reason: reward.reason,
        status: reward.status,
        createdAt: reward.createdAt,
        claimedAt: reward.claimedAt,
      })),
      summary: {
        totalEarned: totalEarned[0]?.total || 0,
        totalClaimed: totalClaimed[0]?.total || 0,
        totalPending: totalPending[0]?.total || 0,
      },
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Get rewards error:", error);
    }
    return NextResponse.json(
      { error: "Failed to fetch rewards" },
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

    const { rewardIds } = await request.json();

    if (!rewardIds || !Array.isArray(rewardIds) || rewardIds.length === 0) {
      return NextResponse.json(
        { error: "Reward IDs are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("nexrate");
    const users = db.collection("users");
    const rewards = db.collection("rewards");

    const user = await users.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Find all pending rewards
    const rewardsToUpdate = await rewards
      .find({
        _id: { $in: rewardIds.map((id) => new ObjectId(id)) },
        userId: user._id,
        status: "pending",
      })
      .toArray();

    if (rewardsToUpdate.length === 0) {
      return NextResponse.json(
        { error: "No claimable rewards found" },
        { status: 404 }
      );
    }

    // Calculate total claim amount
    const totalClaimed = rewardsToUpdate.reduce(
      (sum, reward) => sum + reward.amount,
      0
    );

    // Update rewards to claimed
    await rewards.updateMany(
      {
        _id: { $in: rewardsToUpdate.map((r) => r._id) },
      },
      {
        $set: {
          status: "claimed",
          claimedAt: new Date(),
        },
      }
    );

    // Update user's NXRT balance (if you have a balance field)
    await users.updateOne(
      { _id: user._id },
      {
        $inc: { nxrtBalance: totalClaimed },
      }
    );

    return NextResponse.json({
      message: "Rewards claimed successfully",
      claimed: {
        count: rewardsToUpdate.length,
        totalAmount: totalClaimed,
      },
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Claim rewards error:", error);
    }
    return NextResponse.json(
      { error: "Failed to claim rewards" },
      { status: 500 }
    );
  }
}

// Admin endpoint to award rewards (you'll secure this later)
export async function PUT(request: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { userId, type, amount, reason } = await request.json();

    if (!userId || !type || !amount || !reason) {
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

    const validTypes = ["signup", "referral", "trade", "arbitrage", "bonus"];
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { error: "Invalid reward type" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("nexrate");
    const rewards = db.collection("rewards");

    const newReward = {
      userId: new ObjectId(userId),
      type,
      amount: parseFloat(amount),
      reason,
      status: "pending",
      createdAt: new Date(),
      claimedAt: null,
    };

    const result = await rewards.insertOne(newReward);

    return NextResponse.json(
      {
        message: "Reward granted successfully",
        reward: {
          id: result.insertedId.toString(),
          ...newReward,
          userId: newReward.userId.toString(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Grant reward error:", error);
    }
    return NextResponse.json(
      { error: "Failed to grant reward" },
      { status: 500 }
    );
  }
}
