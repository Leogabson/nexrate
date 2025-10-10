// src/app/api/rate-lock/route.ts
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

    const { fromAsset, toAsset, amount, rate, duration } = await request.json();

    if (!fromAsset || !toAsset || !amount || !rate || !duration) {
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

    const validDurations = [15, 30, 60, 120]; // minutes
    if (!validDurations.includes(duration)) {
      return NextResponse.json(
        { error: "Invalid duration. Choose 15, 30, 60, or 120 minutes" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("nexrate");
    const rateLocks = db.collection("rate_locks");
    const transactions = db.collection("transactions");

    const lockedRate = parseFloat(rate);
    const lockAmount = parseFloat(amount);
    const expiresAt = new Date(Date.now() + duration * 60 * 1000);
    const lockFee = lockAmount * 0.002; // 0.2% lock fee

    const rateLock = {
      userId: new ObjectId(session.user.id),
      fromAsset,
      toAsset,
      amount: lockAmount,
      lockedRate,
      duration,
      fee: lockFee,
      status: "active",
      createdAt: new Date(),
      expiresAt,
      executedAt: null,
      executed: false,
    };

    const lockResult = await rateLocks.insertOne(rateLock);

    // Create transaction record
    const transaction = {
      userId: new ObjectId(session.user.id),
      type: "rate_lock",
      status: "pending",
      amount: lockAmount,
      currency: fromAsset,
      fromAsset,
      toAsset,
      rate: lockedRate,
      fee: lockFee,
      details: {
        rateLockId: lockResult.insertedId.toString(),
        duration,
        expiresAt,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      completedAt: null,
    };

    await transactions.insertOne(transaction);

    return NextResponse.json(
      {
        message: "Rate locked successfully",
        rateLock: {
          id: lockResult.insertedId.toString(),
          fromAsset,
          toAsset,
          amount: lockAmount,
          lockedRate,
          duration,
          fee: lockFee,
          expiresAt,
          status: "active",
        },
      },
      { status: 201 }
    );
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Rate lock error:", error);
    }
    return NextResponse.json({ error: "Failed to lock rate" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const lockId = searchParams.get("id");

    const client = await clientPromise;
    const db = client.db("nexrate");
    const rateLocks = db.collection("rate_locks");

    if (lockId) {
      const lock = await rateLocks.findOne({
        _id: new ObjectId(lockId),
        userId: new ObjectId(session.user.id),
      });

      if (!lock) {
        return NextResponse.json(
          { error: "Rate lock not found" },
          { status: 404 }
        );
      }

      // Check if expired
      const isExpired = new Date() > lock.expiresAt;
      const status = isExpired && !lock.executed ? "expired" : lock.status;

      return NextResponse.json({
        rateLock: {
          id: lock._id.toString(),
          fromAsset: lock.fromAsset,
          toAsset: lock.toAsset,
          amount: lock.amount,
          lockedRate: lock.lockedRate,
          duration: lock.duration,
          fee: lock.fee,
          status,
          createdAt: lock.createdAt,
          expiresAt: lock.expiresAt,
          executedAt: lock.executedAt,
        },
      });
    }

    // Get all user rate locks
    const userLocks = await rateLocks
      .find({ userId: new ObjectId(session.user.id) })
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();

    return NextResponse.json({
      rateLocks: userLocks.map((lock) => {
        const isExpired = new Date() > lock.expiresAt;
        const status = isExpired && !lock.executed ? "expired" : lock.status;

        return {
          id: lock._id.toString(),
          fromAsset: lock.fromAsset,
          toAsset: lock.toAsset,
          amount: lock.amount,
          lockedRate: lock.lockedRate,
          duration: lock.duration,
          status,
          createdAt: lock.createdAt,
          expiresAt: lock.expiresAt,
        };
      }),
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Get rate lock error:", error);
    }
    return NextResponse.json(
      { error: "Failed to fetch rate locks" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { lockId } = await request.json();

    if (!lockId) {
      return NextResponse.json(
        { error: "Lock ID is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("nexrate");
    const rateLocks = db.collection("rate_locks");

    const lock = await rateLocks.findOne({
      _id: new ObjectId(lockId),
      userId: new ObjectId(session.user.id),
    });

    if (!lock) {
      return NextResponse.json(
        { error: "Rate lock not found" },
        { status: 404 }
      );
    }

    if (lock.executed) {
      return NextResponse.json(
        { error: "Rate lock already executed" },
        { status: 400 }
      );
    }

    if (new Date() > lock.expiresAt) {
      return NextResponse.json(
        { error: "Rate lock has expired" },
        { status: 400 }
      );
    }

    // Execute the rate lock (convert to swap)
    await rateLocks.updateOne(
      { _id: new ObjectId(lockId) },
      {
        $set: {
          executed: true,
          executedAt: new Date(),
          status: "executed",
        },
      }
    );

    return NextResponse.json({
      message: "Rate lock executed successfully",
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Execute rate lock error:", error);
    }
    return NextResponse.json(
      { error: "Failed to execute rate lock" },
      { status: 500 }
    );
  }
}
