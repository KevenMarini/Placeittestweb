import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - check if submissions are open + get this team's submission
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const teamId = searchParams.get("teamId");

    const config = await prisma.siteConfig.findUnique({ where: { key: "presentation_unlocked" } });
    const isUnlocked = config?.value === "true";

    let submission = null;
    if (teamId) {
      submission = await prisma.presentationLink.findUnique({ where: { teamId } });
    }

    return NextResponse.json({ success: true, isUnlocked, submission });
  } catch (error) {
    console.error("Presentations GET Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST - submit or update presentation link
export async function POST(request: Request) {
  try {
    const { teamId, teamName, link } = await request.json();

    if (!teamId || !teamName || !link) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Check if submissions are open
    const config = await prisma.siteConfig.findUnique({ where: { key: "presentation_unlocked" } });
    if (config?.value !== "true") {
      return NextResponse.json({ error: "Presentation submissions are currently locked." }, { status: 403 });
    }

    const submission = await prisma.presentationLink.upsert({
      where: { teamId },
      update: { link, teamName },
      create: { teamId, teamName, link },
    });

    return NextResponse.json({ success: true, submission });
  } catch (error) {
    console.error("Presentations POST Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
