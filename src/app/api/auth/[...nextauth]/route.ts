import NextAuth, {
  type DefaultSession,
  type Profile,
  type Account,
  type NextAuthOptions,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

// Extend the Profile type to include Google-specific fields
interface GoogleProfile extends Profile {
  given_name?: string;
  family_name?: string;
  picture?: string;
}

const handler = NextAuth({
  adapter: MongoDBAdapter(clientPromise),

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
        if (!user.password)
          throw new Error("Account exists via Google. Use Google sign-in.");
        if (!user.verified && user.provider !== "google")
          throw new Error("Please verify your email first.");

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
      const { user, account, profile, callbackUrl } = params;
      const client = await clientPromise;
      const db = client.db("nexrate");
      console.log("Sign-in attempt:", { user, account, profile, callbackUrl }); // Debug log

      if (account?.provider === "google") {
        const googleProfile = profile as GoogleProfile;
        const existingUser = await db
          .collection("users")
          .findOne({ email: user.email });
        const existingAccount = await db.collection("accounts").findOne({
          provider: account.provider,
          providerAccountId: account.providerAccountId,
        });

        console.log("Existing user:", existingUser);
        console.log("Existing account:", existingAccount);

        if (existingUser) {
          const userProvider = existingUser.provider || "none";
          if (userProvider !== account.provider && !existingUser.verified) {
            console.log("Blocking due to different provider or unverified:", {
              userProvider,
              accountProvider: account.provider,
            });
            return `/auth/signin?error=Account linked to a different provider or not verified. Please use that method or verify your email.`;
          }
          await db.collection("users").updateOne(
            { email: user.email },
            {
              $set: {
                firstName: googleProfile.given_name || existingUser.firstName,
                lastName: googleProfile.family_name || existingUser.lastName,
                image: googleProfile.picture || existingUser.image,
                emailVerified: new Date(),
                provider: account.provider,
                verified: true, // Mark as verified on Google sign-in
              },
            }
          );
          if (
            existingAccount &&
            !existingAccount.userId.equals(existingUser._id)
          ) {
            await db
              .collection("accounts")
              .updateOne(
                { _id: existingAccount._id },
                { $set: { userId: existingUser._id } }
              );
          }
        } else if (existingAccount) {
          console.log("Linking orphaned account to new user");
          const newUser = await db.collection("users").insertOne({
            email: user.email,
            firstName: googleProfile.given_name || "",
            lastName: googleProfile.family_name || "",
            image: googleProfile.picture || null,
            emailVerified: new Date(),
            createdAt: new Date(),
            provider: account.provider,
            verified: true,
          });
          await db
            .collection("accounts")
            .updateOne(
              { _id: existingAccount._id },
              { $set: { userId: newUser.insertedId } }
            );
        } else {
          console.log("Creating new user and account:", user.email);
          const newUser = await db.collection("users").insertOne({
            email: user.email,
            firstName: googleProfile.given_name || "",
            lastName: googleProfile.family_name || "",
            image: googleProfile.picture || null,
            emailVerified: new Date(),
            createdAt: new Date(),
            provider: account.provider,
            verified: true,
          });
          await db.collection("accounts").insertOne({
            userId: newUser.insertedId,
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
      }

      console.log("Returning callbackUrl:", callbackUrl || "/dashboard");
      return callbackUrl || "/dashboard"; // Use provided callbackUrl or default to /dashboard
    },
    async session({ session, token }) {
      console.log("Session callback:", { session, token });
      if (token?.sub) {
        session.user.id = token.sub;
        session.user.name =
          `${token.firstName || "User"} ${token.lastName || ""}`.trim() ||
          undefined;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.firstName = (user as any).firstName;
        token.lastName = (user as any).lastName;
      }
      return token;
    },
  },

  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
    verifyRequest: "/auth/verify",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
