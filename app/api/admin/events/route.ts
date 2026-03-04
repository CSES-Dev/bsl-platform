import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

function isAmbassadorOrHigher(role: string) {
  return role === "AMBASSADOR" || role === "SUPER_ADMIN";
}

async function requireAmbassadorOrHigher() {
  const session = await auth();
  const email = session?.user?.email;

  if (!email) {
    return { ok: false as const, status: 401 as const, error: "Unauthorized" };
  }

  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, role: true },
  });

  if (!user) {
    return { ok: false as const, status: 401 as const, error: "Unauthorized" };
  }

  if (!isAmbassadorOrHigher(user.role)) {
    return { ok: false as const, status: 403 as const, error: "Forbidden" };
  }

  return { ok: true as const, user };
}

// GET /api/admin/events (admin list)
export async function GET() {
  const gate = await requireAmbassadorOrHigher();
  if (!gate.ok) {
    return NextResponse.json({ error: gate.error }, { status: gate.status });
  }

  const events = await prisma.event.findMany({
    orderBy: { startAt: "asc" },
  });

  return NextResponse.json(events);
}

// POST /api/admin/events (create)
export async function POST(req: Request) {
  const gate = await requireAmbassadorOrHigher();
  if (!gate.ok) {
    return NextResponse.json({ error: gate.error }, { status: gate.status });
  }

  const body = await req.json();


  if (!body.title || !body.startAt) {
    return NextResponse.json(
      { error: "title and startAt are required" },
      { status: 400 }
    );
  }

  const startAt = new Date(body.startAt);
  const endAt = body.endAt ? new Date(body.endAt) : null;

  if (isNaN(startAt.getTime())) {
    return NextResponse.json({ error: "Invalid startAt" }, { status: 400 });
  }
  if (endAt && isNaN(endAt.getTime())) {
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
      title: body.title,
      description: body.description ?? null,
      startAt,
      endAt,
      location: body.location ?? null,
      link: body.link ?? null,
      createdByUserId: gate.user.id, // imported from db 
    },
  });

  return NextResponse.json(created, { status: 201 });
}