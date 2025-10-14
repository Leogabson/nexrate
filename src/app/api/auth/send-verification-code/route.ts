// src/app/api/auth/send-verification-code/route.ts

import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { generateVerificationCode, getCodeExpiry } from "@/lib/db-schema";
import sgMail from "@sendgrid/mail";

// Initialize SendGrid with API key
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

    // Check if user exists
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "No account found with this email" },
        { status: 404 }
      );
    }

    // Generate new 6-digit code
    const verificationCode = generateVerificationCode();
    const codeExpiry = getCodeExpiry();

    // Update user with new code and reset attempts
    await db.collection("users").updateOne(
      { email },
      {
        $set: {
          verificationCode,
          verificationCodeExpiry: codeExpiry,
          verificationAttempts: 0, // Reset attempts
          updatedAt: new Date(),
        },
      }
    );

    // Send verification code via SendGrid
    await sendVerificationEmail(email, verificationCode);

    return NextResponse.json(
      {
        message: "Verification code sent successfully",
        expiresIn: "5 minutes",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Send verification code error:", error);
    return NextResponse.json(
      { error: "Failed to send verification code. Please try again." },
      { status: 500 }
    );
  }
}

/**
 * Send verification code email using SendGrid
 */
async function sendVerificationEmail(email: string, code: string) {
  // Email HTML template
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
          <h1>🔒 NexRate Verification</h1>
        </div>
        <div class="content">
          <h2>Your Verification Code</h2>
          <p>Hello,</p>
          <p>You requested a verification code to access your NexRate account. Use the code below to complete your sign-in:</p>
          
          <div class="code-box">
            <div class="code">${code}</div>
          </div>
          
          <p><strong>This code will expire in 5 minutes.</strong></p>
          
          <div class="warning">
            <strong>⚠️ Security Notice:</strong><br>
            If you didn't request this code, please ignore this email. Your account remains secure.
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

  // SendGrid message configuration
  const msg = {
    to: email,
    from: {
      email: process.env.SENDGRID_FROM_EMAIL!,
      name: "NexRate",
    },
    subject: "Your NexRate Verification Code",
    text: `Your NexRate verification code is: ${code}. This code will expire in 5 minutes. Do not share this code with anyone.`,
    html: emailHtml,
  };

  // Send email via SendGrid
  await sgMail.send(msg);
}
