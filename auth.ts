import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { prisma } from "@/lib/prisma";

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  callbacks: {
    ...(authConfig.callbacks ?? {}),
    async jwt({ token, user }) {
      const email = user?.email ?? token.email;
      if (!email) return token;

      if (user || !token.role) {
        const dbUser = await prisma.user.upsert({
          where: { email },
          update: {
            name: user?.name ?? undefined,
            image: user?.image ?? undefined,
          },
          create: {
            email,
            name: user?.name ?? null,
            image: user?.image ?? null,
          },
          select: { role: true },
        });
        token.role = dbUser.role;
      }
      return token;
    },
  },
  secret: process.env.AUTH_SECRET,
});
