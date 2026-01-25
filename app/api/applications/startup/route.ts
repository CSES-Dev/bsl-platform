import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const {
        StartupName,
        StartupDescription,
        StartupFundingGoal,
        StartupContact,
    } = await request.json();

    if (!StartupName || !StartupDescription || !StartupFundingGoal || !StartupContact) {
        return NextResponse.json({
            error: "Missing required fields",
            status: "400",
        })
    }

    try {
        // try uploading the data to the DB using prisma
        return NextResponse.json({
            status: "200",
        })
    } catch (err) {
        console.error(err);
        return NextResponse.json({
            error: "Failed to post project",
            status: "400",
        })
        // catch any errors
    }
}