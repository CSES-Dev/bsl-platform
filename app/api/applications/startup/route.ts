export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

// 1. Update the schema to match the exact keys sent from your frontend
const StartupSchema = z.object({
  StartupName: z.string().min(1),
  StartupDescription: z.string().min(1),
  StartupFundingGoal: z.union([z.string().min(1), z.number()]),
  StartupDeckUrl: z.string().min(1),
  StartupFundingSiteUrl: z.string().optional(), // Optional, just like the frontend
  submitterName: z.string().min(1),
  submitterEmail: z.string().email(),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = StartupSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  // 2. Destructure the new fields
  const {
    StartupName,
    StartupDescription,
    StartupFundingGoal,
    StartupDeckUrl,
    StartupFundingSiteUrl,
    submitterName,
    submitterEmail,
  } = parsed.data;

  try {
    const newStartupApplication = await prisma.application.create({
      data: {
        type: "startup",
        status: "pending",
        // 3. Directly map your clean submitter fields
        submitterName: submitterName,
        submitterEmail: submitterEmail,
        payload: {
          name: StartupName,
          description: StartupDescription,
          fundingGoal: Number(StartupFundingGoal),
          deckUrl: StartupDeckUrl,
          fundingSiteUrl: StartupFundingSiteUrl,
        },
      },
    });

    return NextResponse.json(
      { success: true, id: newStartupApplication.id },
      { status: 201 },
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to post project" },
      { status: 500 },
    );
  }
}
