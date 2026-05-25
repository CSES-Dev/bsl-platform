export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";

const TeamSchema = z.object({
  teamName: z.string().min(1),
  skills: z.union([z.string().min(1), z.array(z.string())]),
  teamSize: z.union([z.string().min(1), z.number()]),
  projectPreferences: z.union([z.string().min(1), z.array(z.string())]),
  description: z.string().min(1),
  submitterName: z.string().min(1),
  submitterEmail: z.string().email(),
  websiteUrl: z.string().url().optional(),
});

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = TeamSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request", details: parsed.error.flatten() },
      { status: 400 },
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
    websiteUrl,
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
          websiteUrl,
        },
      },
    });

    try {
      if (process.env.BSL_ADMIN_EMAIL) {
        await sendEmail({
          to: process.env.BSL_ADMIN_EMAIL,
          subject: "New Team Application",
          html: `
            <h2>New Team Application Submitted</h2>
            <p>A new team application has been submitted.</p>
            <p><strong>Submitter:</strong> ${submitterName}</p>
            <p><strong>Email:</strong> ${submitterEmail}</p>
            <p><strong>Team:</strong> ${teamName}</p>
            <p><strong>Team Size:</strong> ${teamSize}</p>
          `,
        });
      }

      await sendEmail({
        to: submitterEmail,
        subject: "Your BSL Application Has Been Submitted",
        html: `
          <h2>Application Submitted</h2>
          <p>Hi ${submitterName},</p>
          <p>Thanks for submitting your BSL team application. We received it and will review it soon.</p>
        `,
      });
    } catch (emailError) {
      console.error("Failed to send team application email:", emailError);
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