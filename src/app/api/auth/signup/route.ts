// src/app/api/auth/signup/route.ts

import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import { generateVerificationCode, getCodeExpiry } from "@/lib/db-schema";
import sgMail from "@sendgrid/mail";

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { email, password, country, referralCode } = await req.json();

    // Validation
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    if (!password || password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    if (!country) {
      return NextResponse.json(
        { error: "Country selection is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("nexrate");
    const users = db.collection("users");

    // Check if user already exists
    const existingUser = await users.findOne({ email });

    if (existingUser) {
      // Check if user exists but is unverified
      if (!existingUser.verified) {
        return NextResponse.json(
          {
            error:
              "An account with this email already exists but is not verified. Please check your email for the verification code or request a new one.",
          },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Generate verification code
    const verificationCode = generateVerificationCode();
    const codeExpiry = getCodeExpiry();

    // Create new user
    const newUser = {
      email,
      password: hashedPassword,
      country,
      referralCode: referralCode || null,
      provider: "credentials",
      verified: false, // Not verified yet
      verificationCode,
      verificationCodeExpiry: codeExpiry,
      verificationAttempts: 0,
      trustedDevices: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await users.insertOne(newUser);

    // Send verification code email
    await sendWelcomeEmail(email, verificationCode);

    return NextResponse.json(
      {
        message:
          "Account created successfully. Please check your email for the verification code.",
        email, // Return email for frontend to redirect to verify-code page
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);

    // Handle duplicate key error (race condition)
    if ((error as any).code === 11000) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create account. Please try again." },
      { status: 500 }
    );
  }
}

/**
 * Send welcome email with verification code
 */
async function sendWelcomeEmail(email: string, code: string) {
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
          padding: 40px;
          text-align: center;
          border-radius: 10px 10px 0 0;
        }
        .header h1 {
          color: white;
          margin: 0;
          font-size: 32px;
        }
        .header p {
          color: #e0f2fe;
          margin: 10px 0 0 0;
          font-size: 16px;
        }
        .content {
          background: white;
          padding: 40px;
          border-radius: 0 0 10px 10px;
        }
        .welcome {
          font-size: 18px;
          margin-bottom: 20px;
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
        .features {
          background: #f8fafc;
          padding: 20px;
          border-radius: 8px;
          margin: 20px 0;
        }
        .feature-item {
          display: flex;
          align-items: center;
          margin: 10px 0;
        }
        .feature-icon {
          font-size: 24px;
          margin-right: 10px;
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
          <h1>🎉 Welcome to NexRate!</h1>
          <p>Faster • Smarter • Safer</p>
        </div>
        <div class="content">
          <div class="welcome">
            <h2>Thank you for joining NexRate!</h2>
            <p>We're excited to have you on board. To complete your registration and start trading, please verify your email address.</p>
          </div>
          
          <p><strong>Your verification code:</strong></p>
          <div class="code-box">
            <div class="code">${code}</div>
          </div>
          
          <p><strong>This code will expire in 5 minutes.</strong></p>
          
          <div class="features">
            <h3>What you get with NexRate:</h3>
            <div class="feature-item">
              <span class="feature-icon">⚡</span>
              <span>Lightning-fast trading execution</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">🧠</span>
              <span>Smart analytics and insights</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">🔒</span>
              <span>Bank-level security protection</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">📊</span>
              <span>Real-time market data</span>
            </div>
          </div>
          
          <div class="warning">
            <strong>⚠️ Security Notice:</strong><br>
            If you didn't create this account, please ignore this email. Your information is safe.
          </div>
          
          <p>For your security, never share this code with anyone, including NexRate support staff.</p>
          
          <div class="footer">
            <p>Need help? Contact us at support@nexrate.com</p>
            <p>© ${new Date().getFullYear()} NexRate. All rights reserved.</p>
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
      name: "NexRate",
    },
    subject: "Welcome to NexRate - Verify Your Email",
    text: `Welcome to NexRate! Your verification code is: ${code}. This code will expire in 5 minutes. Enter this code to complete your registration.`,
    html: emailHtml,
  };

  await sgMail.send(msg);
}
