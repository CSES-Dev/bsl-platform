export const ROLES = ["USER", "AMBASSADOR", "REVIEWER", "SUPER_ADMIN"] as const;
export type Role = (typeof ROLES)[number];

export function hasRole(
  userRole: Role | undefined,
  requiredRole: Role
): boolean {
  if (!userRole) return false;
  return ROLES.indexOf(userRole) >= ROLES.indexOf(requiredRole);
}

export const ADMIN_MIN_ROLE: Role = "AMBASSADOR";
