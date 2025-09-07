// src/lib/mongodb.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local");
}

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  // In dev mode, use a global variable so the client is cached
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, just create a new client
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

// Function to ensure unique index exists
export async function ensureIndexes() {
  try {
    const client = await clientPromise;
    const db = client.db("nexrate");

    // Create unique index on email field
    await db.collection("waitlist").createIndex({ email: 1 }, { unique: true });

    console.log("✅ Unique index created on email field");
  } catch (error) {
    // Index might already exist, that's okay
    if (error.code !== 85) {
      // 85 = IndexOptionsConflict
      console.log("Index setup:", error.message);
    }
  }
}

export default clientPromise;
