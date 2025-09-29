// src/app/api/auth/resend-verification/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { sendVerificationEmail } from "@/lib/email";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("nexrate");
    const users = db.collection("users");

    const user = await users.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "No account found with this email." },
        { status: 404 }
      );
    }

    if (user.verified) {
      return NextResponse.json(
        { message: "Account already verified. You can log in now." },
        { status: 200 }
      );
    }

    // Generate fresh token
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationTokenExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 min

    await users.updateOne(
      { _id: user._id },
      {
        $set: {
          verificationToken,
          verificationTokenExpires,
        },
      }
    );

    // Send new email
    await sendVerificationEmail(email, verificationToken);

    return NextResponse.json(
      { message: "Verification email resent successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Resend verification error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
