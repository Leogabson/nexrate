import { config } from "dotenv";
import { resolve } from "path";

// Load .env file from root
config({ path: resolve(process.cwd(), ".env.local") });

async function main() {
  const { default: clientPromise } = await import("@/lib/mongodb");
  const { setupDatabase } = await import("@/lib/db-schema");
  const client = await clientPromise;
  const db = client.db("nexrate");
  await setupDatabase(db);
  process.exit(0);
}

main();
