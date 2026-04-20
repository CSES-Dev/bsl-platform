export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const StartupSchema = z.object({
  StartupName: z.string().min(1),
  StartupDescription: z.string().min(1),
  StartupFundingGoal: z.union([z.string().min(1), z.number()]),
  StartupContact: z.object({
    name: z.string().optional(),
    fullName: z.string().optional(),
    firstName: z.string().optional(),
    email: z.string().email().optional(),
    Email: z.string().email().optional(),
  }),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = StartupSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { StartupName, StartupDescription, StartupFundingGoal, StartupContact } =
    parsed.data;

  try {
    const newStartupApplication = await prisma.application.create({
      data: {
        type: "startup",
        status: "pending",
        submitterName:
          StartupContact?.name ??
          StartupContact?.fullName ??
          StartupContact?.firstName ??
          StartupName ??
          null,
        submitterEmail: StartupContact?.email ?? StartupContact?.Email ?? null,
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
    return NextResponse.json(
      { error: "Failed to post project" },
      { status: 500 }
    );
  }
}
