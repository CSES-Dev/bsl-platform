export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";

const OrgSchema = z.object({
  companyName: z.string().min(1),
  projectTitle: z.string().min(1),
  budget: z.union([z.string().min(1), z.number()]),
  description: z.string().min(1),
  submitterName: z.string().min(1),
  submitterEmail: z.string().email(),
  skillsNeeded: z.union([z.string().min(1), z.array(z.string())]),
  websiteUrl: z.string().url().optional(),
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
      { status: 400 },
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
    websiteUrl,
  } = parsed.data;

  const parsedBudget = Number(String(budget).replace(/[^0-9.-]+/g, ""));

  if (isNaN(parsedBudget)) {
    return NextResponse.json(
      { error: "Budget must be a valid number" },
      { status: 400 },
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
          websiteUrl,
        },
      },
    });

    try {
      if (process.env.BSL_ADMIN_EMAIL) {
        await sendEmail({
          to: process.env.BSL_ADMIN_EMAIL,
          subject: "New Organization Application",
          html: `
            <h2>New Organization Application Submitted</h2>
            <p>A new organization application has been submitted.</p>
            <p><strong>Submitter:</strong> ${submitterName}</p>
            <p><strong>Email:</strong> ${submitterEmail}</p>
            <p><strong>Company:</strong> ${companyName}</p>
            <p><strong>Project:</strong> ${projectTitle}</p>
          `,
        });
      }

      await sendEmail({
        to: submitterEmail,
        subject: "Your BSL Application Has Been Submitted",
        html: `
          <h2>Application Submitted</h2>
          <p>Hi ${submitterName},</p>
          <p>Thanks for submitting your BSL organization application. We received it and will review it soon.</p>
        `,
      });
    } catch (emailError) {
      console.error("Failed to send organization application email:", emailError);
    }

    return NextResponse.json(
      { success: true, id: application.id },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create application" },
      { status: 500 },
    );
  }
}
