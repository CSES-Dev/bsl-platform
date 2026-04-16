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
    console.error("[GET /api/events]", err);

    return NextResponse.json(
      { error: "Failed to load events" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    // TODO: require admin (RBAC)
    const body = await req.json();

    if (!body.title || !body.startAt || !body.createdByUserId) {
      return NextResponse.json(
        { error: "title, startAt, createdByUserId are required" },
        { status: 400 }
      );
    }

    const startAt = new Date(body.startAt);
    const endAt = body.endAt ? new Date(body.endAt) : null;

    if (Number.isNaN(startAt.getTime())) {
      return NextResponse.json(
        { error: "Invalid startAt" },
        { status: 400 }
      );
    }

    if (endAt && Number.isNaN(endAt.getTime())) {
      return NextResponse.json(
        { error: "Invalid endAt" },
        { status: 400 }
      );
    }

    if (endAt && endAt < startAt) {
      return NextResponse.json(
        { error: "endAt cannot be before startAt" },
        { status: 400 }
      );
    }

    const created = await prisma.event.create({
      data: {
        title: body.title,
        description: body.description ?? null,
        startAt,
        endAt,
        location: body.location ?? null,
        link: body.link ?? null,
        createdByUserId: body.createdByUserId, // later: get from session
      },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    console.error("[POST /api/events]", err);

    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}