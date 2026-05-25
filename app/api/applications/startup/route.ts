export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";

const StartupSchema = z.object({
  StartupName: z.string().min(1),
  StartupDescription: z.string().min(1),
  StartupFundingGoal: z.union([z.string().min(1), z.number()]),
  StartupWebsiteUrl: z.string().url().optional(),
  StartupDeckUrl: z.string().min(1),
  StartupFundingSiteUrl: z.string().optional(),
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

  const {
    StartupName,
    StartupDescription,
    StartupFundingGoal,
    StartupDeckUrl,
    StartupFundingSiteUrl,
    StartupWebsiteUrl,
    submitterName,
    submitterEmail,
  } = parsed.data;

  try {
    const newStartupApplication = await prisma.application.create({
      data: {
        type: "startup",
        status: "pending",
        submitterName,
        submitterEmail,
        payload: {
          name: StartupName,
          description: StartupDescription,
          fundingGoal: Number(StartupFundingGoal),
          websiteUrl: StartupWebsiteUrl,
          deckUrl: StartupDeckUrl,
          fundingSiteUrl: StartupFundingSiteUrl,
        },
      },
    });

    try {
      if (process.env.BSL_ADMIN_EMAIL) {
        await sendEmail({
          to: process.env.BSL_ADMIN_EMAIL,
          subject: "New Startup Application",
          html: `
            <h2>New Startup Application Submitted</h2>
            <p>A new startup application has been submitted.</p>
            <p><strong>Submitter:</strong> ${submitterName}</p>
            <p><strong>Email:</strong> ${submitterEmail}</p>
            <p><strong>Startup:</strong> ${StartupName}</p>
          `,
        });
      }

      await sendEmail({
        to: submitterEmail,
        subject: "Your BSL Application Has Been Submitted",
        html: `
          <h2>Application Submitted</h2>
          <p>Hi ${submitterName},</p>
          <p>Thanks for submitting your BSL startup application. We received it and will review it soon.</p>
        `,
      });
    } catch (emailError) {
      console.error("Failed to send startup application email:", emailError);
    }

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