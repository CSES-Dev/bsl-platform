import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const applications = await prisma.application.findMany({
      select: {
        id: true,
        type: true,
        status: true,
        submitterName: true,
        submitterEmail: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
      take: 100,
    });

    return NextResponse.json({ data: applications }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to get applications" },
      { status: 500 }
    );
  }
}
