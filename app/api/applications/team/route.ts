export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      teamName,
      skills,
      teamSize,
      projectPreferences,
      description,
      submitterName,
      submitterEmail,
    } = body;

    // Server-side validation
    if (
      !teamName ||
      !skills ||
      !teamSize ||
      !projectPreferences ||
      !description ||
      !submitterName ||
      !submitterEmail
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Create application in DB
    const application = await prisma.application.create({
      data: {
        type: "team",
        status: "pending",
        submitterName: submitterName,
        submitterEmail: submitterEmail,
        payload: {
          teamName,
          skills,
          teamSize: Number(teamSize),
          projectPreferences,
          description,
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        id: application.id,
      },
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
