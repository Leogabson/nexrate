// src/app/api/auth/[...nextauth]/route.ts
import NextAuth, { type Profile } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";
import { generateVerificationCode, getCodeExpiry } from "@/lib/db-schema";

// Extend the Profile type to include Google-specific fields
interface GoogleProfile extends Profile {
  given_name?: string;
  family_name?: string;
  picture?: string;
}

const handler = NextAuth({
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

        // ✅ REMOVED: Email verification check - we'll verify with code instead
        // Users can sign in, but will be redirected to verify-code page

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) throw new Error("Invalid password");

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.email, // We don't collect names anymore
        };
      },
    }),
  ],

  callbacks: {
    async signIn(params: any) {
      const { user, account, profile } = params;

      // ✅ Allow credentials sign-in (device check happens after)
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
            // ✅ Update existing user with Google info
            await db.collection("users").updateOne(
              { email: user.email },
              {
                $set: {
                  image: googleProfile.picture || existingUser.image,
                  emailVerified: new Date(),
                  provider: "google",
                  updatedAt: new Date(),
                  // ❌ DO NOT set verified: true - they need to verify with code
                },
              }
            );

            user.id = existingUser._id.toString();
          } else {
            // ✅ Create new user for Google sign-in
            const newUser = await db.collection("users").insertOne({
              email: user.email,
              image: googleProfile.picture || null,
              emailVerified: new Date(),
              createdAt: new Date(),
              updatedAt: new Date(),
              provider: "google",
              verified: false, // ✅ NOT verified yet - needs code
              trustedDevices: [],
            });

            user.id = newUser.insertedId.toString();
          }

          // ✅ Generate and send verification code
          const verificationCode = generateVerificationCode();
          const codeExpiry = getCodeExpiry();

          await db.collection("users").updateOne(
            { email: user.email },
            {
              $set: {
                verificationCode,
                verificationCodeExpiry: codeExpiry,
                verificationAttempts: 0,
              },
            }
          );

          // ✅ Send verification code email
          // TODO: Implement email sending here
          // await sendVerificationCodeEmail(user.email, verificationCode);

          // ✅ Store/update Google OAuth account info
          const existingAccount = await db.collection("accounts").findOne({
            provider: account.provider,
            providerAccountId: account.providerAccountId,
          });

          if (existingAccount) {
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

          // ✅ Redirect to verification code page
          return `/auth/verify-code?email=${encodeURIComponent(
            user.email!
          )}&returnUrl=/dashboard`;
        } catch (error) {
          if (process.env.NODE_ENV === "development") {
            console.error("Google sign-in error:", error);
          }
          return "/auth/signin?error=Sign in failed. Please try again";
        }
      }

      return true;
    },

    async jwt({ token, user, account }) {
      if (user) {
        token.sub = user.id;
        token.email = user.email;
        token.image = user.image;
      }

      // ✅ Refresh user data from DB
      if (token.sub && !user) {
        try {
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
              token.email = dbUser.email;
              token.image = dbUser.image;
            }
          }
        } catch (error) {
          if (process.env.NODE_ENV === "development") {
            console.error("JWT refresh error:", error);
          }
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (token?.sub) {
        session.user.id = token.sub;
        session.user.email = token.email as string;
        session.user.image = (token.image as string) || undefined;
        session.user.name = token.email as string; // Use email as name
      }
      return session;
    },
  },

  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days until user logs out
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
