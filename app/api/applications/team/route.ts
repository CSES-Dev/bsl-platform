export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { teamName, projectTitle, budget, description } = body;

    // Server-side validation
    if (!teamName || !projectTitle || !budget || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Parse budget to number
    const parsedBudget = Number(String(budget).replace(/[^0-9.-]+/g, ""));
    if (isNaN(parsedBudget)) {
      return NextResponse.json(
        { error: "Budget must be a valid number" },
        { status: 400 },
      );
    }

    // Create application in DB
    const application = await prisma.application.create({
      data: {
        type: "TEAM",
        status: "PENDING",
        submitterName: teamName,
        submitterEmail: "N/A", // placeholder, can be updated later
        payload: {
          teamName,
          projectTitle,
          budget: parsedBudget,
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
