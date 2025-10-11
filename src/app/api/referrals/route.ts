// src/app/api/referrals/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import crypto from "crypto";

async function getAuthSession() {
  return await getServerSession();
}

export async function GET(request: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("nexrate");
    const users = db.collection("users");
    const referrals = db.collection("referrals");

    const user = await users.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Generate referral code if doesn't exist
    if (!user.referralCode) {
      const referralCode = crypto.randomBytes(4).toString("hex").toUpperCase();
      await users.updateOne({ _id: user._id }, { $set: { referralCode } });
      user.referralCode = referralCode;
    }

    // Get user's referrals
    const userReferrals = await referrals
      .find({ referrerId: user._id })
      .sort({ createdAt: -1 })
      .toArray();

    // Calculate stats
    const totalReferrals = userReferrals.length;
    const activeReferrals = userReferrals.filter(
      (ref) => ref.status === "active"
    ).length;
    const totalEarned = userReferrals.reduce(
      (sum, ref) => sum + (ref.rewardEarned || 0),
      0
    );

    // Get referred user details
    const referredUserIds = userReferrals.map((ref) => ref.referredUserId);
    const referredUsers = await users
      .find(
        { _id: { $in: referredUserIds } },
        { projection: { firstName: 1, lastName: 1, email: 1, createdAt: 1 } }
      )
      .toArray();

    const referredUsersMap = new Map(
      referredUsers.map((u) => [u._id.toString(), u])
    );

    return NextResponse.json({
      referralCode: user.referralCode,
      referralLink: `${process.env.NEXT_PUBLIC_APP_URL}/auth/signup?ref=${user.referralCode}`,
      stats: {
        totalReferrals,
        activeReferrals,
        totalEarned,
      },
      referrals: userReferrals.map((ref) => {
        const refUser = referredUsersMap.get(ref.referredUserId.toString());
        return {
          id: ref._id.toString(),
          referredUser: refUser
            ? {
                name: `${refUser.firstName} ${refUser.lastName}`,
                email: refUser.email,
                joinedAt: refUser.createdAt,
              }
            : null,
          status: ref.status,
          rewardEarned: ref.rewardEarned,
          createdAt: ref.createdAt,
        };
      }),
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Get referrals error:", error);
    }
    return NextResponse.json(
      { error: "Failed to fetch referrals" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { referralCode, newUserId } = await request.json();

    if (!referralCode || !newUserId) {
      return NextResponse.json(
        { error: "Referral code and user ID are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("nexrate");
    const users = db.collection("users");
    const referrals = db.collection("referrals");
    const rewards = db.collection("rewards");

    // Find referrer by code
    const referrer = await users.findOne({ referralCode });
    if (!referrer) {
      return NextResponse.json(
        { error: "Invalid referral code" },
        { status: 404 }
      );
    }

    // Check if new user exists
    const newUser = await users.findOne({ _id: new ObjectId(newUserId) });
    if (!newUser) {
      return NextResponse.json(
        { error: "New user not found" },
        { status: 404 }
      );
    }

    // Check if referral already exists
    const existingReferral = await referrals.findOne({
      referredUserId: new ObjectId(newUserId),
    });

    if (existingReferral) {
      return NextResponse.json(
        { error: "User already referred" },
        { status: 400 }
      );
    }

    // Create referral record
    const referral = {
      referrerId: referrer._id,
      referredUserId: new ObjectId(newUserId),
      status: "pending", // pending, active, inactive
      rewardEarned: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await referrals.insertOne(referral);

    // Grant signup bonus to referrer (100 NXRT)
    await rewards.insertOne({
      userId: referrer._id,
      type: "referral",
      amount: 100,
      reason: `Referral signup bonus for ${newUser.firstName} ${newUser.lastName}`,
      status: "pending",
      createdAt: new Date(),
      claimedAt: null,
    });

    // Grant signup bonus to new user (50 NXRT)
    await rewards.insertOne({
      userId: new ObjectId(newUserId),
      type: "signup",
      amount: 50,
      reason: "Welcome bonus for joining via referral",
      status: "pending",
      createdAt: new Date(),
      claimedAt: null,
    });

    // Update referrer's referred by field for new user
    await users.updateOne(
      { _id: new ObjectId(newUserId) },
      { $set: { referredBy: referrer._id } }
    );

    return NextResponse.json({
      message: "Referral processed successfully",
      referral: {
        id: result.insertedId.toString(),
        referrerReward: 100,
        newUserReward: 50,
      },
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Process referral error:", error);
    }
    return NextResponse.json(
      { error: "Failed to process referral" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { referralId, status } = await request.json();

    if (!referralId || !status) {
      return NextResponse.json(
        { error: "Referral ID and status are required" },
        { status: 400 }
      );
    }

    const validStatuses = ["pending", "active", "inactive"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("nexrate");
    const users = db.collection("users");
    const referrals = db.collection("referrals");

    const user = await users.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const referral = await referrals.findOne({
      _id: new ObjectId(referralId),
      referrerId: user._id,
    });

    if (!referral) {
      return NextResponse.json(
        { error: "Referral not found" },
        { status: 404 }
      );
    }

    await referrals.updateOne(
      { _id: new ObjectId(referralId) },
      {
        $set: {
          status,
          updatedAt: new Date(),
        },
      }
    );

    return NextResponse.json({
      message: "Referral status updated successfully",
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Update referral error:", error);
    }
    return NextResponse.json(
      { error: "Failed to update referral" },
      { status: 500 }
    );
  }
}
