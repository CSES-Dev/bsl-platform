// GET /api/events
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const now = new Date();

  const events = await prisma.event.findMany({
    where: {
      startAt: { gte: now },
    },
    orderBy: { startAt: "asc" },
  });

  return NextResponse.json(events);
}
