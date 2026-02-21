// GET /api/events
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const events = await prisma.event.findMany({
    orderBy: { startAt: "asc" },
  });

  return NextResponse.json(events);
}
