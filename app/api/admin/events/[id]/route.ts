import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/apiAuth";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_: Request, { params }: RouteContext) {
  const gate = await requireRole("AMBASSADOR");
  if (!gate.ok)
    return NextResponse.json({ error: gate.error }, { status: gate.status });

  const { id } = await params;
  const event = await prisma.event.findUnique({ where: { id } });
  if (!event) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(event);
}

export async function PATCH(req: Request, { params }: RouteContext) {
  const gate = await requireRole("AMBASSADOR");
  if (!gate.ok)
    return NextResponse.json({ error: gate.error }, { status: gate.status });

  const { id } = await params;
  const body = await req.json();

  const data: Record<string, unknown> = {};
  if (body.title !== undefined) data.title = body.title;
  if (body.description !== undefined) data.description = body.description ?? null;
  if (body.startAt !== undefined) data.startAt = new Date(body.startAt);
  if (body.endAt !== undefined) data.endAt = body.endAt ? new Date(body.endAt) : null;
  if (body.location !== undefined) data.location = body.location ?? null;
  if (body.link !== undefined) data.link = body.link ?? null;

  if (data.startAt && data.endAt && (data.endAt as Date) < (data.startAt as Date)) {
    return NextResponse.json(
      { error: "endAt cannot be before startAt" },
      { status: 400 }
    );
  }

  try {
    const updated = await prisma.event.update({ where: { id }, data });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}

export async function DELETE(_: Request, { params }: RouteContext) {
  const gate = await requireRole("AMBASSADOR");
  if (!gate.ok)
    return NextResponse.json({ error: gate.error }, { status: gate.status });

  const { id } = await params;
  try {
    await prisma.event.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
