export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { companyName, projectTitle, budget, description } = body;

    // Server validation
    if (!companyName || !projectTitle || !budget || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const parsedBudget = Number(String(budget).replace(/[^0-9.-]+/g, ""));

    if (isNaN(parsedBudget)) {
      return NextResponse.json(
        { error: "Budget must be a valid number" },
        { status: 400 },
      );
    }

    const application = await prisma.application.create({
      data: {
        type: "ORG",
        status: "PENDING",

        submitterName: companyName,
        submitterEmail: "N/A", // must be non-null, can change later

        payload: {
          companyName,
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
