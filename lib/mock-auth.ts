export type Role = "admin" | "user" | "guest";

// Change this value to test different UI states
export const currentUserRole: Role = "guest";

export function isAdmin(): boolean {
    return currentUserRole === "admin";
}

export function isAuthenticated(): boolean {
    return currentUserRole !== "guest";
}
