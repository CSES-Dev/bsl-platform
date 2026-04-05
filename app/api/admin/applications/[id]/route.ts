import { NextRequest, NextResponse } from "next/server";
import { Role } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const dbUser = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { role: true },
  });

  if (
    !dbUser ||
    (dbUser.role !== Role.REVIEWER && dbUser.role !== Role.SUPER_ADMIN)
  ) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const application = await prisma.application.findUnique({
    where: { id: params.id },
    select: {
      id: true,
      type: true,
      status: true,
      submitterName: true,
      submitterEmail: true,
      payload: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!application) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ data: application }, { status: 200 });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dbUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { role: true },
    });

    if (
      !dbUser ||
      (dbUser.role !== Role.REVIEWER && dbUser.role !== Role.SUPER_ADMIN)
    ) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { status } = await request.json();
    if (status !== "approved" && status !== "rejected") {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const updated = await prisma.application.update({
      where: { id: params.id },
      data: { status },
      select: {
        id: true,
        type: true,
        status: true,
        submitterName: true,
        submitterEmail: true,
        payload: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({ data: updated }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Failed to update application" },
      { status: 500 },
    );
  }
}