export const ROLES = ["USER", "AMBASSADOR", "REVIEWER", "SUPER_ADMIN"] as const;
export type Role = (typeof ROLES)[number];

export function hasRole(
  userRole: Role | undefined,
  requiredRole: Role
): boolean {
  if (!userRole) return false;
  return ROLES.indexOf(userRole) >= ROLES.indexOf(requiredRole);
}

export function requiredRoleForAdminPath(pathname: string): Role {
  if (pathname === "/admin" || pathname.startsWith("/admin/events"))
    return "AMBASSADOR";
  if (pathname.startsWith("/admin/applications")) return "REVIEWER";
  return "SUPER_ADMIN";
}
