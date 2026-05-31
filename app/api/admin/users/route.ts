import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/apiAuth";

export async function GET() {
  const gate = await requireRole("SUPER_ADMIN");

  if (gate instanceof NextResponse) {
    return gate;
  }

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
    orderBy: {
      email: "asc",
    },
  });

  return NextResponse.json(users);
}