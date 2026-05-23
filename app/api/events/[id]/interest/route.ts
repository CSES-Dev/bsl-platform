import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

type RouteContext = { params: Promise<{ id: string }> };

const COOKIE_PREFIX = "bsl_interested_";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

export async function POST(_req: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  const cookieStore = await cookies();

  if (cookieStore.get(COOKIE_PREFIX + id)) {
    return NextResponse.json(
      { error: "Already expressed interest" },
      { status: 409 },
    );
  }

  try {
    const updated = await prisma.event.update({
      where: { id },
      data: { interestedCount: { increment: 1 } },
      select: { interestedCount: true },
    });

    cookieStore.set(COOKIE_PREFIX + id, "1", {
      httpOnly: false,
      sameSite: "lax",
      path: "/",
      maxAge: COOKIE_MAX_AGE,
    });

    return NextResponse.json(
      { interestedCount: updated.interestedCount },
      { status: 200 },
    );
  } catch (err) {
    console.error("EVENT_INTEREST_POST", err);
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
