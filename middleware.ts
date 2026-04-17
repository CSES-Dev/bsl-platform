import { auth } from "./auth-edge";
import { hasRole, requiredRoleForAdminPath } from "@/lib/rbac";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;

  const isPublicAdminRoute =
    pathname === "/admin/login" || pathname === "/admin/access-denied";

  if (!isPublicAdminRoute && pathname.startsWith("/admin")) {
    const session = req.auth;

    if (!session) {
      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    const requiredRole = requiredRoleForAdminPath(pathname);
    if (!hasRole(session.user?.role, requiredRole)) {
      return NextResponse.redirect(new URL("/admin/access-denied", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
