import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  callbacks: {
    async jwt({ token, user }) {
      if (user?.email) {
        let dbUser = await prisma.user.findUnique({
          where: { email: user.email },
          select: { role: true },
        });

        if (!dbUser) {
          dbUser = await prisma.user.create({
            data: {
              email: user.email,
              name: user.name ?? null,
              image: user.image ?? null,
            },
            select: { role: true },
          });
        }

        token.role = dbUser.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as Role;
      }
      return session;
    },
  },
});
