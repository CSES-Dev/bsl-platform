export function hasRole(userRole: string, requiredRole: string) {
    const roleHierarchy: Record<string, number> = {
      USER: 0,
      REVIEWER: 1,
      AMBASSADOR: 2,
      SUPER_ADMIN: 3,
    };
  
    return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
  }