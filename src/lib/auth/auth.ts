import { db } from "@/db";
import * as schema from "@/db/schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { sendOtpEmail } from "../email";

export const auth = betterAuth({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://vanguox.com",
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      void sendOtpEmail({
        to: user.email,
        link: url,
      });
    },
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
});
