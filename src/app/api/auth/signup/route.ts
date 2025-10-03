import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import crypto from "crypto"; // ✅ ADDED: Import crypto module
import { sendVerificationEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, password, confirmPassword } =
      await req.json();

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Passwords do not match" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("nexrate");
    const users = db.collection("users");

    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomUUID(); // ✅ Now this works

    await users.insertOne({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      verified: false,
      verificationToken,
      createdAt: new Date(),
      provider: "credentials", // ✅ ADDED: Set provider field for consistency
    });

    await sendVerificationEmail(email, verificationToken);

    return NextResponse.json({
      message:
        "Signup successful. Please check your email to verify your account.",
    });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
