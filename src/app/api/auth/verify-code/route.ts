// src/app/api/auth/verify-code/route.ts

import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { isCodeExpired, generateDeviceFingerprint } from "@/lib/db-schema";

export async function POST(req: NextRequest) {
  try {
    const { email, code, trustDevice } = await req.json();

    // Validation
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    if (!code || code.length !== 6) {
      return NextResponse.json(
        { error: "Valid 6-digit code is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("nexrate");

    // Find user
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "No account found with this email" },
        { status: 404 }
      );
    }

    // Check if user has a verification code
    if (!user.verificationCode) {
      return NextResponse.json(
        { error: "No verification code found. Please request a new code." },
        { status: 400 }
      );
    }

    // Check if code is expired
    if (isCodeExpired(user.verificationCodeExpiry)) {
      return NextResponse.json(
        { error: "Verification code has expired. Please request a new code." },
        { status: 400 }
      );
    }

    // Check attempts limit
    const attempts = user.verificationAttempts || 0;
    if (attempts >= 5) {
      return NextResponse.json(
        { error: "Too many failed attempts. Please request a new code." },
        { status: 429 }
      );
    }

    // Verify the code
    if (user.verificationCode !== code) {
      // Increment failed attempts
      await db.collection("users").updateOne(
        { email },
        {
          $set: {
            verificationAttempts: attempts + 1,
            updatedAt: new Date(),
          },
        }
      );

      const remainingAttempts = 5 - (attempts + 1);
      return NextResponse.json(
        {
          error: `Invalid code. ${remainingAttempts} attempt${
            remainingAttempts !== 1 ? "s" : ""
          } remaining.`,
        },
        { status: 400 }
      );
    }

    // ✅ Code is correct! Process verification

    // Get device info from request headers
    const userAgent = req.headers.get("user-agent") || "unknown";
    const ipAddress =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const deviceId = generateDeviceFingerprint(userAgent, ipAddress);

    // Prepare update object
    const updateData: any = {
      verified: true,
      verificationCode: null, // Clear the code
      verificationCodeExpiry: null,
      verificationAttempts: 0,
      updatedAt: new Date(),
    };

    // If user wants to trust this device, add it to trustedDevices
    if (trustDevice) {
      const trustedDevices = user.trustedDevices || [];

      // Check if device already exists
      const deviceExists = trustedDevices.some(
        (device: any) => device.deviceId === deviceId
      );

      if (!deviceExists) {
        // Add new trusted device
        updateData.trustedDevices = [
          ...trustedDevices,
          {
            deviceId,
            userAgent,
            ipAddress,
            trustedAt: new Date(),
            lastUsed: new Date(),
          },
        ];
      } else {
        // Update lastUsed for existing device
        updateData.trustedDevices = trustedDevices.map((device: any) =>
          device.deviceId === deviceId
            ? { ...device, lastUsed: new Date() }
            : device
        );
      }
    }

    // Update user in database
    await db.collection("users").updateOne({ email }, { $set: updateData });

    return NextResponse.json(
      {
        success: true,
        message: "Verification successful",
        deviceTrusted: trustDevice || false,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Verify code error:", error);
    return NextResponse.json(
      { error: "Failed to verify code. Please try again." },
      { status: 500 }
    );
  }
}
