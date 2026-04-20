export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const TeamSchema = z.object({
  teamName: z.string().min(1),
  skills: z.union([z.string().min(1), z.array(z.string())]),
  teamSize: z.union([z.string().min(1), z.number()]),
  projectPreferences: z.union([z.string().min(1), z.array(z.string())]),
  description: z.string().min(1),
  submitterName: z.string().min(1),
  submitterEmail: z.string().email(),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = TeamSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const {
    teamName,
    skills,
    teamSize,
    projectPreferences,
    description,
    submitterName,
    submitterEmail,
  } = parsed.data;

  try {
    const application = await prisma.application.create({
      data: {
        type: "team",
        status: "pending",
        submitterName,
        submitterEmail,
        payload: {
          teamName,
          skills,
          teamSize: Number(teamSize),
          projectPreferences,
          description,
        },
      },
    });

    return NextResponse.json({ success: true, id: application.id }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create application" },
      { status: 500 }
    );
  }
}
