// src/app/api/auth/verify-captcha/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json(
        { error: "Captcha token is required" },
        { status: 400 }
      );
    }

    // Verify hCaptcha token with hCaptcha API
    const verifyUrl = "https://hcaptcha.com/siteverify";

    const formData = new URLSearchParams();
    formData.append("secret", process.env.HCAPTCHA_SECRET_KEY!);
    formData.append("response", token);

    const response = await fetch(verifyUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    const data = await response.json();

    if (data.success) {
      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      return NextResponse.json(
        {
          error: "Captcha verification failed",
          details: data["error-codes"],
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Captcha verification error:", error);
    return NextResponse.json(
      { error: "Internal server error during captcha verification" },
      { status: 500 }
    );
  }
}
