// lib/db-schema.ts
// MongoDB Collection Schemas for NexRate

import { ObjectId } from "mongodb";

/**
 * USER COLLECTION SCHEMA
 * Collection name: "users"
 */
export interface User {
  _id: ObjectId;
  email: string; // unique, required
  password?: string; // optional (null for Google OAuth users)
  country?: string; // User's selected country
  referralCode?: string; // Optional referral code they used
  provider: "credentials" | "google"; // How they signed up
  verified: boolean; // Email verified status
  image?: string; // Profile picture URL (from Google)

  // Verification code fields (for 2FA)
  verificationCode?: string; // 6-digit code
  verificationCodeExpiry?: Date; // Expires in 5 minutes
  verificationAttempts?: number; // Failed attempts counter (max 5)

  // Trusted devices
  trustedDevices: Array<{
    deviceId: string; // Fingerprint/hash of device
    userAgent: string;
    ipAddress: string;
    trustedAt: Date;
    lastUsed: Date;
  }>;

  createdAt: Date;
  updatedAt: Date;
  emailVerified?: Date; // For NextAuth compatibility
}

/**
 * ACCOUNTS COLLECTION SCHEMA (for OAuth)
 * Collection name: "accounts"
 */
export interface Account {
  _id: ObjectId;
  userId: ObjectId; // References users._id
  provider: string; // "google"
  providerAccountId: string; // Google user ID
  type: "oauth";
  refresh_token?: string;
  access_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
}

/**
 * SESSIONS COLLECTION SCHEMA (optional - only if using database sessions)
 * Collection name: "sessions"
 */
export interface Session {
  _id: ObjectId;
  sessionToken: string;
  userId: ObjectId;
  expires: Date;
}

/**
 * VERIFICATION TOKENS COLLECTION (for email verification links - if you want to keep old system)
 * Collection name: "verificationtokens"
 */
export interface VerificationToken {
  _id: ObjectId;
  identifier: string; // email
  token: string;
  expires: Date;
}

// =============================================================================
// MONGODB SETUP SCRIPT
// Run this once to create collections with validation and indexes
// =============================================================================

/**
 * Setup script to create collections with validation rules and indexes
 * Run this in your MongoDB shell or via Node.js script once
 */
export const setupDatabase = async (db: any) => {
  console.log("Setting up NexRate database...");

  // 1. Create Users Collection with validation
  try {
    await db.createCollection("users", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["email", "provider", "verified", "createdAt"],
          properties: {
            email: {
              bsonType: "string",
              pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
              description: "must be a valid email address",
            },
            password: {
              bsonType: ["string", "null"],
              description: "hashed password - optional for OAuth users",
            },
            country: {
              bsonType: ["string", "null"],
              description: "user's country",
            },
            referralCode: {
              bsonType: ["string", "null"],
              description: "referral code used during signup",
            },
            provider: {
              enum: ["credentials", "google"],
              description: "authentication provider",
            },
            verified: {
              bsonType: "bool",
              description: "email verification status",
            },
            image: {
              bsonType: ["string", "null"],
              description: "profile picture URL",
            },
            verificationCode: {
              bsonType: ["string", "null"],
              description: "6-digit verification code",
            },
            verificationCodeExpiry: {
              bsonType: ["date", "null"],
              description: "verification code expiry timestamp",
            },
            verificationAttempts: {
              bsonType: ["int", "null"],
              description: "failed verification attempts",
            },
            trustedDevices: {
              bsonType: "array",
              items: {
                bsonType: "object",
                required: ["deviceId", "userAgent", "trustedAt"],
                properties: {
                  deviceId: { bsonType: "string" },
                  userAgent: { bsonType: "string" },
                  ipAddress: { bsonType: "string" },
                  trustedAt: { bsonType: "date" },
                  lastUsed: { bsonType: "date" },
                },
              },
            },
            createdAt: {
              bsonType: "date",
              description: "account creation timestamp",
            },
            updatedAt: {
              bsonType: "date",
              description: "last update timestamp",
            },
          },
        },
      },
    });
    console.log("✅ Users collection created");
  } catch (e: any) {
    if (e.code === 48) {
      console.log("⚠️  Users collection already exists");
    } else {
      throw e;
    }
  }

  // 2. Create indexes for users collection
  await db.collection("users").createIndex({ email: 1 }, { unique: true });
  await db.collection("users").createIndex({ verificationCode: 1 });
  await db.collection("users").createIndex({ provider: 1 });
  console.log("✅ Users indexes created");

  // 3. Create Accounts Collection
  try {
    await db.createCollection("accounts");
    console.log("✅ Accounts collection created");
  } catch (e: any) {
    if (e.code === 48) {
      console.log("⚠️  Accounts collection already exists");
    }
  }

  // 4. Create indexes for accounts collection
  await db
    .collection("accounts")
    .createIndex({ userId: 1, provider: 1 }, { unique: true });
  await db.collection("accounts").createIndex({ providerAccountId: 1 });
  console.log("✅ Accounts indexes created");

  // 5. Create Sessions Collection (optional - only for database sessions)
  try {
    await db.createCollection("sessions");
    console.log("✅ Sessions collection created");
  } catch (e: any) {
    if (e.code === 48) {
      console.log("⚠️  Sessions collection already exists");
    }
  }

  await db
    .collection("sessions")
    .createIndex({ sessionToken: 1 }, { unique: true });
  await db
    .collection("sessions")
    .createIndex({ expires: 1 }, { expireAfterSeconds: 0 });
  console.log("✅ Sessions indexes created");

  console.log("✅ Database setup complete!");
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Generate a 6-digit verification code
 */
export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Generate device fingerprint from request
 */
export function generateDeviceFingerprint(
  userAgent: string,
  ipAddress: string
): string {
  const crypto = require("crypto");
  return crypto
    .createHash("sha256")
    .update(userAgent + ipAddress)
    .digest("hex");
}

/**
 * Check if verification code is expired
 */
export function isCodeExpired(expiryDate: Date): boolean {
  return new Date() > expiryDate;
}

/**
 * Get code expiry time (5 minutes from now)
 */
export function getCodeExpiry(): Date {
  return new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
}

// =============================================================================
// USAGE EXAMPLE
// =============================================================================

/*
// To run the setup script once:
import clientPromise from "@/lib/mongodb";
import { setupDatabase } from "@/lib/db-schema";

async function runSetup() {
  const client = await clientPromise;
  const db = client.db("nexrate");
  await setupDatabase(db);
}

runSetup();
*/
