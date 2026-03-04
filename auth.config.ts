import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import type { Role } from "@/lib/rbac";

export const authConfig: NextAuthConfig = {
  providers: [Google],
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) session.user.role = token.role as Role;
      return session;
    },
  },
};
