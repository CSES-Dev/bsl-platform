import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { hasRole } from "@/lib/rbac";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    const role = session?.user?.role;
    if (!session?.user?.email || !role) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (!hasRole(role, "REVIEWER")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const status = searchParams.get("status");

    const where: Prisma.ApplicationWhereInput = {};
    if (type) where.type = type;
    if (status) where.status = status;

    const applications = await prisma.application.findMany({
      where,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        type: true,
        status: true,
        submitterName: true,
        submitterEmail: true,
        createdAt: true,
      },
      take: 100,
    });

    return NextResponse.json({ data: applications }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to get applications" }, { status: 500 });
  }
}