import { Role } from "@prisma/client";

// Role hierarchy based on index
const ROLE_HIERARCHY: Role[] = [
  Role.USER,
  Role.AMBASSADOR,
  Role.REVIEWER,
  Role.SUPER_ADMIN,
];

// Returns true if userRole index >= required
export function hasRole(
  userRole: Role | undefined,
  requiredRole: Role
): boolean {
  if (!userRole) return false;
  return (
    ROLE_HIERARCHY.indexOf(userRole) >= ROLE_HIERARCHY.indexOf(requiredRole)
  );
}

// Set minimum role to view /admin to be Ambassador
export const ADMIN_MIN_ROLE = Role.AMBASSADOR;
