import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { INTEREST_COOKIE_MAX_AGE, interestCookieName } from "@/lib/cookies";

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(_req: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  const cookieStore = await cookies();
  const cookieName = interestCookieName(id);

  if (cookieStore.has(cookieName)) {
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

    cookieStore.set(cookieName, "1", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: INTEREST_COOKIE_MAX_AGE,
    });

    return NextResponse.json(
      { interestedCount: updated.interestedCount },
      { status: 200 },
    );
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2025") {
        return NextResponse.json({ error: "Event not found" }, { status: 404 });
      }
      if (err.code === "P2023") {
        return NextResponse.json(
          { error: "Invalid event id" },
          { status: 400 },
        );
      }
    }
    console.error("EVENT_INTEREST_POST", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
