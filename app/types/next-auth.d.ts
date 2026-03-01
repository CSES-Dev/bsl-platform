import { Role } from "@prisma/client";
import { DefaultSession, DefaultJWT } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      role: Role;
    } & DefaultSession["user"];
  }
  interface User {
    role: Role;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role: Role;
  }
}
