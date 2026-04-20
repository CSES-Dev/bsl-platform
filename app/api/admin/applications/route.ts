import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";
import { requireRole } from "@/lib/apiAuth";

export async function GET(request: Request) {
  const gate = await requireRole("REVIEWER");

  if (!gate.ok) {
    return NextResponse.json({ error: gate.error }, { status: gate.status });
  }

  try {
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
    return NextResponse.json(
      { error: "Failed to get applications" },
      { status: 500 }
    );
  }
}
