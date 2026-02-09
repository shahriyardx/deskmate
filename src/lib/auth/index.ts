import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { prisma } from "../db";

export const auth = betterAuth({
socialProviders: {
  discord: {
    clientId: process.env.AUTH_DISCORD_ID as string,
    clientSecret: process.env.AUTH_DISCORD_SECRET as string,
  }
},
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  plugins: [nextCookies()]
});