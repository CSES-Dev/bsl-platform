import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const applications = await prisma.applications.findMany();
    return NextResponse.json({ data: applications }, { status: 200 })
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to get applications" }, { status: 500 });
  }
}
