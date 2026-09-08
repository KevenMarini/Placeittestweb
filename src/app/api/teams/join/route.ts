import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { regNo, code } = await request.json();

    if (!regNo || !code) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const uppercaseCode = code.toUpperCase().trim();

    // Find the team
    const team = await prisma.team.findUnique({
      where: { code: uppercaseCode },
      include: { members: true }
    });

    if (!team) {
      return NextResponse.json({ error: "Invalid Team ID" }, { status: 404 });
    }

    if (team.members.length >= 4) {
      return NextResponse.json({ error: "Team is already full (max 4)" }, { status: 400 });
    }
    
    if (team.isLocked) {
      return NextResponse.json({ error: "Team is locked by admin" }, { status: 400 });
    }

    // Add user to team
    await prisma.user.update({
      where: { regNo: regNo.toUpperCase() },
      data: {
        teamId: team.id,
        isLeader: false
      }
    });

    return NextResponse.json({ success: true, team });
  } catch (error) {
    console.error("Join Team Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
