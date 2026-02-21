export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  console.log("DATABASE_URL:", process.env.DATABASE_URL);

  const {
    StartupName,
    StartupDescription,
    StartupFundingGoal,
    StartupContact,
  } = await request.json();

  if (
    !StartupName ||
    !StartupDescription ||
    !StartupFundingGoal ||
    !StartupContact
  ) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const newStartupApplication = await prisma.application.create({
      data: {
        type: "startup",
        status: "pending",

        // top-level fields
        submitterName:
          StartupContact?.name ??
          StartupContact?.fullName ??
          StartupContact?.firstName ??
          StartupName ??
          null,

        submitterEmail: StartupContact?.email ?? StartupContact?.Email ?? null,

        // keep full form contents
        payload: {
          name: StartupName,
          description: StartupDescription,
          fundingGoal: Number(StartupFundingGoal),
          contact: StartupContact,
        },
      },
    });

    return NextResponse.json({ data: newStartupApplication }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to post project" }, { status: 500 });
  }
}