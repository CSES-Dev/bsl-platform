import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/apiAuth";

export async function GET() {
  const gate = await requireRole("AMBASSADOR");

  if (!gate.ok) {
    return NextResponse.json({ error: gate.error }, { status: gate.status });
  }

  try {
    const events = await prisma.event.findMany({
      orderBy: { startAt: "asc" },
    });

    return NextResponse.json(events);
  } catch (err) {
    console.error("GET /api/admin/events:", err);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const gate = await requireRole("AMBASSADOR");

  if (!gate.ok) {
    return NextResponse.json({ error: gate.error }, { status: gate.status });
  }

  try {
    const body = await req.json();

    if (!body.title || !body.startAt) {
      return NextResponse.json(
        { error: "title and startAt are required" },
        { status: 400 }
      );
    }

    const startAt = new Date(body.startAt);
    const endAt = body.endAt ? new Date(body.endAt) : null;

    if (Number.isNaN(startAt.getTime())) {
      return NextResponse.json({ error: "Invalid startAt" }, { status: 400 });
    }

    if (endAt && Number.isNaN(endAt.getTime())) {
      return NextResponse.json({ error: "Invalid endAt" }, { status: 400 });
    }

    if (endAt && endAt < startAt) {
      return NextResponse.json(
        { error: "endAt cannot be before startAt" },
        { status: 400 }
      );
    }

    const created = await prisma.event.create({
      data: {
        title: body.title.trim(),
        description: body.description?.trim() || null,
        startAt,
        endAt,
        location: body.location ?? null,
        link: body.link ?? null,
        createdByUserId: gate.user.id,
      },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    console.error("POST /api/admin/events:", err);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}
