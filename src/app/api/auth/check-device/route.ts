// src/app/api/auth/check-device/route.ts

import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import {
  generateDeviceFingerprint,
  generateVerificationCode,
  getCodeExpiry,
} from "@/lib/db-schema";
import sgMail from "@sendgrid/mail";

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
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

    // Get device info from request headers
    const userAgent = req.headers.get("user-agent") || "unknown";
    const ipAddress =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const deviceId = generateDeviceFingerprint(userAgent, ipAddress);

    // Check if device is trusted
    const trustedDevices = user.trustedDevices || [];
    const isTrustedDevice = trustedDevices.some(
      (device: any) => device.deviceId === deviceId
    );

    if (isTrustedDevice) {
      // Device is trusted, update lastUsed timestamp
      await db.collection("users").updateOne(
        {
          email,
          "trustedDevices.deviceId": deviceId,
        },
        {
          $set: {
            "trustedDevices.$.lastUsed": new Date(),
            updatedAt: new Date(),
          },
        }
      );

      return NextResponse.json(
        {
          needsVerification: false,
          message: "Device is trusted",
        },
        { status: 200 }
      );
    }

    // Device is NOT trusted - needs verification
    // Generate and send verification code
    const verificationCode = generateVerificationCode();
    const codeExpiry = getCodeExpiry();

    await db.collection("users").updateOne(
      { email },
      {
        $set: {
          verificationCode,
          verificationCodeExpiry: codeExpiry,
          verificationAttempts: 0,
          updatedAt: new Date(),
        },
      }
    );

    // Send verification code email
    await sendVerificationEmail(email, verificationCode);

    return NextResponse.json(
      {
        needsVerification: true,
        message: "Verification code sent to email",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Check device error:", error);
    return NextResponse.json(
      { error: "Failed to check device. Please try again." },
      { status: 500 }
    );
  }
}

/**
 * Send verification code email using SendGrid
 */
async function sendVerificationEmail(email: string, code: string) {
  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f9f9f9;
        }
        .header {
          background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
          padding: 30px;
          text-align: center;
          border-radius: 10px 10px 0 0;
        }
        .header h1 {
          color: white;
          margin: 0;
          font-size: 28px;
        }
        .content {
          background: white;
          padding: 40px;
          border-radius: 0 0 10px 10px;
        }
        .code-box {
          background: #f0f9ff;
          border: 2px solid #06b6d4;
          border-radius: 8px;
          padding: 20px;
          text-align: center;
          margin: 30px 0;
        }
        .code {
          font-size: 36px;
          font-weight: bold;
          color: #06b6d4;
          letter-spacing: 8px;
          font-family: 'Courier New', monospace;
        }
        .warning {
          background: #fef2f2;
          border-left: 4px solid #ef4444;
          padding: 15px;
          margin: 20px 0;
          border-radius: 4px;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          color: #666;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔒 NexRate Security Alert</h1>
        </div>
        <div class="content">
          <h2>New Device Sign-In Detected</h2>
          <p>Hello,</p>
          <p>We noticed a sign-in attempt from a new device. To ensure your account's security, please verify this sign-in with the code below:</p>
          
          <div class="code-box">
            <div class="code">${code}</div>
          </div>
          
          <p><strong>This code will expire in 5 minutes.</strong></p>
          
          <div class="warning">
            <strong>⚠️ Security Notice:</strong><br>
            If you didn't attempt to sign in, please ignore this email and consider changing your password immediately.
          </div>
          
          <p>For your security, never share this code with anyone, including NexRate support staff.</p>
          
          <div class="footer">
            <p>© ${new Date().getFullYear()} NexRate. All rights reserved.</p>
            <p>Faster • Smarter • Safer</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  const msg = {
    to: email,
    from: {
      email: process.env.SENDGRID_FROM_EMAIL!,
      name: "NexRate Security",
    },
    subject: "New Device Sign-In - Verification Required",
    text: `We noticed a sign-in from a new device. Your verification code is: ${code}. This code will expire in 5 minutes. If you didn't attempt to sign in, please ignore this email.`,
    html: emailHtml,
  };

  await sgMail.send(msg);
}
