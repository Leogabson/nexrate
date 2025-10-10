import NextAuth, {
  type DefaultSession,
  type Profile,
  type Account,
  type NextAuthOptions,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb"; // ✅ ADDED: Import ObjectId for proper queries

// Extend the Profile type to include Google-specific fields
interface GoogleProfile extends Profile {
  given_name?: string;
  family_name?: string;
  picture?: string;
}

const handler = NextAuth({
  // ✅ REMOVED: MongoDBAdapter - incompatible with JWT strategy
  // We'll manage user/account creation manually in callbacks

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const client = await clientPromise;
        const db = client.db("nexrate");
        const user = await db
          .collection("users")
          .findOne({ email: credentials.email });

        if (!user) throw new Error("No user found with this email");

        // Check if user signed up with Google
        if (user.provider === "google" && !user.password) {
          throw new Error(
            "This account uses Google sign-in. Please use 'Continue with Google'"
          );
        }

        if (!user.password) {
          throw new Error("Account exists via Google. Use Google sign-in.");
        }

        if (!user.verified) {
          throw new Error("Please verify your email first.");
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) throw new Error("Invalid password");

        return {
          id: user._id.toString(),
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
        };
      },
    }),
  ],

  callbacks: {
    async signIn(params: any) {
      const { user, account, profile } = params;

      // ✅ Allow credentials sign-in (handled by authorize())
      if (account?.provider === "credentials") {
        return true;
      }

      // ✅ Handle Google OAuth sign-in
      if (account?.provider === "google") {
        try {
          const client = await clientPromise;
          const db = client.db("nexrate");
          const googleProfile = profile as GoogleProfile;

          const existingUser = await db
            .collection("users")
            .findOne({ email: user.email });

          if (existingUser) {
            // ✅ Check if user exists with different provider and is unverified
            if (
              existingUser.provider &&
              existingUser.provider !== "google" &&
              !existingUser.verified
            ) {
              // Block sign-in and show error
              return "/auth/signin?error=Please verify your email first or use your original sign-in method";
            }

            // Update existing user with Google info
            await db.collection("users").updateOne(
              { email: user.email },
              {
                $set: {
                  firstName: googleProfile.given_name || existingUser.firstName,
                  lastName: googleProfile.family_name || existingUser.lastName,
                  image: googleProfile.picture || existingUser.image,
                  emailVerified: new Date(),
                  provider: "google", // Update to Google provider
                  verified: true, // Mark as verified
                },
              }
            );
          } else {
            // Create new user for Google sign-in
            const newUser = await db.collection("users").insertOne({
              email: user.email,
              firstName: googleProfile.given_name || "",
              lastName: googleProfile.family_name || "",
              image: googleProfile.picture || null,
              emailVerified: new Date(),
              createdAt: new Date(),
              provider: "google",
              verified: true,
            });

            // Store the new user ID for account linking
            user.id = newUser.insertedId.toString();
          }

          // ✅ Store/update Google OAuth account info
          const existingAccount = await db.collection("accounts").findOne({
            provider: account.provider,
            providerAccountId: account.providerAccountId,
          });

          if (existingAccount) {
            // Update existing account tokens
            await db.collection("accounts").updateOne(
              { _id: existingAccount._id },
              {
                $set: {
                  refresh_token: account.refresh_token,
                  access_token: account.access_token,
                  expires_at: account.expires_at,
                  scope: account.scope,
                  token_type: account.token_type,
                  id_token: account.id_token,
                },
              }
            );
          } else {
            // Create new account record
            const userId = existingUser?._id || new ObjectId(user.id);
            await db.collection("accounts").insertOne({
              userId: userId,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              type: "oauth",
              refresh_token: account.refresh_token,
              access_token: account.access_token,
              expires_at: account.expires_at,
              scope: account.scope,
              token_type: account.token_type,
              id_token: account.id_token,
            });
          }

          return true;
        } catch (error) {
          if (process.env.NODE_ENV === "development") {
            console.error("Google sign-in error:", error);
          }
          return "/auth/signin?error=Sign in failed. Please try again";
        }
      }

      // Default: allow sign-in
      return true;
    },

    async jwt({ token, user, account }) {
      // Store complete user info in JWT on first sign-in
      if (user) {
        token.sub = user.id;

        // Parse name if it's a full name string
        const nameParts = user.name?.split(" ") || [];
        token.firstName = nameParts[0] || "";
        token.lastName = nameParts.slice(1).join(" ") || "";
        token.email = user.email;
        token.image = user.image;
      }

      // Refresh user data from DB periodically with correct ObjectId query
      // This ensures name changes reflect without re-login
      if (token.sub && !user) {
        try {
          // Only refresh if token.sub is a valid ObjectId string (24 hex chars)
          if (
            typeof token.sub === "string" &&
            /^[0-9a-fA-F]{24}$/.test(token.sub)
          ) {
            const client = await clientPromise;
            const db = client.db("nexrate");

            const dbUser = await db.collection("users").findOne({
              _id: new ObjectId(token.sub),
            });

            if (dbUser) {
              token.firstName = dbUser.firstName;
              token.lastName = dbUser.lastName;
              token.email = dbUser.email;
              token.image = dbUser.image;
            }
          }
        } catch (error) {
          // If ObjectId conversion fails or DB error, keep existing token data
          if (process.env.NODE_ENV === "development") {
            console.error("JWT refresh error:", error);
          }
        }
      }

      return token;
    },

    async session({ session, token }) {
      // Build session from token data
      if (token?.sub) {
        session.user.id = token.sub;
        session.user.email = token.email as string;
        session.user.name =
          `${token.firstName || ""} ${token.lastName || ""}`.trim() ||
          undefined;
        session.user.image = (token.image as string) || undefined;
      }
      return session;
    },
  },

  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
    verifyRequest: "/auth/verify",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // ✅ ADDED: 30 days session
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };

// Export authOptions for use in other API routes
export const authOptions = handler;
