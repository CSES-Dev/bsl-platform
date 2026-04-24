export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const OrgSchema = z.object({
  companyName: z.string().min(1),
  projectTitle: z.string().min(1),
  budget: z.union([z.string().min(1), z.number()]),
  description: z.string().min(1),
  submitterName: z.string().min(1),
  submitterEmail: z.string().email(),
  skillsNeeded: z.union([z.string().min(1), z.array(z.string())]),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const parsed = OrgSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const {
    companyName,
    projectTitle,
    budget,
    description,
    submitterName,
    submitterEmail,
    skillsNeeded,
  } = parsed.data;

  const parsedBudget = Number(String(budget).replace(/[^0-9.-]+/g, ""));

  if (isNaN(parsedBudget)) {
    return NextResponse.json(
      { error: "Budget must be a valid number" },
      { status: 400 }
    );
  }

  try {
    const application = await prisma.application.create({
      data: {
        type: "org",
        status: "pending",
        submitterName,
        submitterEmail,
        payload: {
          companyName,
          projectTitle,
          budget: parsedBudget,
          skillsNeeded,
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
