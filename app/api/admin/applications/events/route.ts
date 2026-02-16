import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  // TODO: require admin (RBAC)
  const events = await prisma.event.findMany({
    orderBy: { startAt: "asc" },
  });
  return NextResponse.json(events);
}

export async function POST(req: Request) {
  // TODO: require admin (RBAC)
  const body = await req.json();

  if (!body.title || !body.startAt || !body.createdByUserId) {
    return NextResponse.json(
      { error: "title, startAt, createdByUserId are required" },
      { status: 400 }
    );
  }

  const created = await prisma.event.create({
    data: {
      title: body.title,
      description: body.description ?? null,
      startAt: new Date(body.startAt),
      endAt: body.endAt ? new Date(body.endAt) : null,
      location: body.location ?? null,
      link: body.link ?? null,
      createdByUserId: body.createdByUserId, // later: get from session
    },
  });

  return NextResponse.json(created, { status: 201 });
}