// src/types/next-auth.d.ts
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email?: string | null;
      image?: string | null;
      name?: string | null; // Keep this for compatibility
    };
  }

  interface User {
    id: string;
    email?: string | null;
    image?: string | null;
    name?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    sub?: string; // User ID
    email?: string | null;
    image?: string | null;
  }
}
