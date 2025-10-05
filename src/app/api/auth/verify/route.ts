import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify/error`
      );
    }

    const client = await clientPromise;
    const db = client.db("nexrate");
    const users = db.collection("users");

    const user = await users.findOne({ verificationToken: token });

    if (!user) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify/error`
      );
    }

    // Check if token has expired
    if (
      user.verificationTokenExpires &&
      user.verificationTokenExpires < new Date()
    ) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify/expired`
      );
    }

    // Update user as verified and remove token fields
    const updateResult = await users.updateOne(
      { _id: user._id },
      {
        $set: {
          verified: true,
          emailVerified: new Date(), // Add this for consistency
        },
        $unset: {
          verificationToken: "",
          verificationTokenExpires: "",
        },
      }
    );

    // Log for debugging
    if (process.env.NODE_ENV === "development") {
      console.log("Verification update result:", updateResult);
      console.log("User verified:", user.email);
    }

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify/success`
    );
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Verification error:", error);
    }
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify/error`
    );
  }
}
