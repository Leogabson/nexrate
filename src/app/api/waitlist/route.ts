import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email } = (await request.json()) as {
      firstName: string;
      lastName: string;
      email: string;
    };

    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("nexrate");
    const collection = db.collection("waitlist");

    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "Email already registered for waitlist" },
        { status: 200 }
      );
    }

    const result = await collection.insertOne({
      firstName,
      lastName,
      email,
      joinedAt: new Date(),
      source: "website",
    });

    const emailHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #f8f9fa; padding: 20px; text-align: center; border-radius: 8px; margin-bottom: 20px; }
    .content { padding: 20px 0; }
    .social-links { text-align: center; margin: 25px 0; }
    .social-links a { display: inline-block; margin: 0 10px; padding: 12px 20px; color: white; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: bold; }
    .twitter-btn { background-color: #1da1f2; }
    .telegram-btn { background-color: #0088cc; }
    .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 14px; color: #666; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0; color: #333;">Welcome to Nexrate! 🎉</h1>
    </div>
    <div class="content">
      <p>Hi there!</p>
      <p>Thank you for joining the Nexrate waitlist! We're excited to have you as part of our early community.</p>
      <p>You'll be among the first to know when we launch, and we might even have some exclusive perks for our waitlist members. 😉</p>
      <div class="social-links">
        <a href="https://x.com/nexrate_app" class="twitter-btn" target="_blank">Follow us on X</a>
        <a href="https://t.me/NexRates" class="telegram-btn" target="_blank">Join our Telegram</a>
      </div>
      <p>Stay connected with us on social media for updates and behind-the-scenes content!</p>
      <p>In the meantime, feel free to reach out if you have any questions or feedback.</p>
      <p>Best regards,<br><strong>The Nexrate Team</strong></p>
    </div>
    <div class="footer">
      <p>You received this email because you signed up for the Nexrate waitlist.</p>
      <p>Questions? Reply to this email or contact us at nexrates@gmail.com</p>
    </div>
  </div>
</body>
</html>`;

    const emailData = {
      to: email,
      from: {
        email: process.env.SENDGRID_FROM_EMAIL as string,
        name: "Nexrate Team",
      },
      subject: "Welcome to Nexrate Waitlist! 🚀",
      html: emailHTML,
    };

    await sgMail.send(emailData);

    return NextResponse.json(
      {
        success: true,
        message: "Successfully joined waitlist!",
        id: result.insertedId,
      },
      { status: 201 }
    );
  } catch (error: any) {
    if (process.env.NODE_ENV === "development") {
      console.error("Waitlist API Error:", error);
    }

    if (error.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          error:
            "This email has already been added to our waitlist! You're all set.",
        },
        { status: 200 }
      );
    }

    if (error.response?.status === 403) {
      return NextResponse.json(
        { error: "Email service error. Please try again later" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Something went wrong. Please try again" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Waitlist API is working",
    timestamp: new Date().toISOString(),
  });
}
