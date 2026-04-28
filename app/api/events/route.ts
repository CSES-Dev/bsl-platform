import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const now = new Date();

    const events = await prisma.event.findMany({
      where: {
        startAt: { gte: now },
      },
      orderBy: { startAt: "asc" },
    });

    return NextResponse.json(events);
  } catch (err) {
    console.error("GET /api/events:", err);

    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
