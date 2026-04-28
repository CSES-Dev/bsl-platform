import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { hasRole, Role } from "@/lib/rbac";

type AuthSuccess = { ok: true; user: { id: string } };
type AuthFailure = { ok: false; status: 401 | 403; error: string };

export async function requireRole(
  minimumRole: Role
): Promise<AuthSuccess | AuthFailure> {
  const session = await auth();
  const email = session?.user?.email;
  const role = session?.user?.role;

  if (!email || !role) return { ok: false, status: 401, error: "Unauthorized" };
  if (!hasRole(role, minimumRole))
    return { ok: false, status: 403, error: "Forbidden" };

  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  if (!user) return { ok: false, status: 401, error: "Unauthorized" };

  return { ok: true, user };
}
