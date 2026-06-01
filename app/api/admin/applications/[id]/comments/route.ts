import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { hasRole } from "@/lib/rbac";

// Ensures this route is evaluated at request time, necessary for reading session data
export const dynamic = "force-dynamic";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const resolvedParams = await params;
  const applicationId = resolvedParams.id;
  try {
    // 1. Authenticate the user
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Authorize the user (Ticket requirement: REVIEWER+)
    // Note: If your hasRole function expects different arguments (e.g., just the session instead of session.user), adjust this line.
    if (!hasRole(session.user?.role, "REVIEWER")) {
      return NextResponse.json(
        { error: "Forbidden - Insufficient permissions" },
        { status: 403 },
      );
    }

    // 3. Parse the request body
    const body = await request.json();
    const { text } = body;

    if (!text || typeof text !== "string" || text.trim() === "") {
      return NextResponse.json(
        { error: "Comment text is required" },
        { status: 400 },
      );
    }

    // 4. Construct the new comment object
    const newComment = {
      userId: session.user.email || session.user.id,
      userName: session.user.name || "Unknown User",
      userImage: session.user.image || "",
      text: text.trim(),
      createdAt: new Date().toISOString(),
    };

    // 5. Update the database by pushing the new comment to the JSON array
    const updatedApplication = await prisma.application.update({
      where: {
        id: applicationId,
      },
      data: {
        reviewComments: {
          push: newComment,
        },
      },
    });

    // 6. Return the updated comments array to update the UI optimistically
    return NextResponse.json(updatedApplication.reviewComments, {
      status: 200,
    });
  } catch (error) {
    console.error("Error adding review comment:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
