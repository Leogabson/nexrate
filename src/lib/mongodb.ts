// src/lib/mongodb.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string | undefined;

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!uri) {
  // Don't throw during module import - that causes the server to crash on startup.
  // Instead create a rejected promise so consumers receive a clear error at the call site.
  const err = new Error(
    "MONGODB_URI environment variable is not set. Please set it in your .env or on the hosting platform."
  );
  clientPromise = Promise.reject(err);
  // Attach a catch to avoid unhandled promise rejection noise in some runtimes
  clientPromise.catch(() => {});
} else {
  if (process.env.NODE_ENV === "development") {
    // In dev, use a global variable so we don’t create multiple clients
    if (!(global as any)._mongoClientPromise) {
      client = new MongoClient(uri);
      (global as any)._mongoClientPromise = client.connect();
    }
    clientPromise = (global as any)._mongoClientPromise;
  } else {
    // In production, create a new client
    client = new MongoClient(uri);
    clientPromise = client.connect();
  }

  clientPromise
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => console.error("MongoDB connection error:", err));
}

export default clientPromise;
