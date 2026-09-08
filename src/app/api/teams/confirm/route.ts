import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { teamId, regNo } = await request.json();

    if (!teamId || !regNo) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const team = await prisma.team.findUnique({
      where: { id: teamId },
      include: { members: true }
    });

    if (!team) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }

    // Verify user is leader
    const user = await prisma.user.findUnique({
      where: { regNo: regNo.toUpperCase() }
    });

    if (!user || !user.isLeader || user.teamId !== teamId) {
      return NextResponse.json({ error: "Unauthorized. Only the team leader can confirm." }, { status: 403 });
    }

    // Enforce team size limits (min 2, max 4)
    if (team.members.length < 2 || team.members.length > 4) {
      return NextResponse.json({ error: "Team size must be between 2 and 4 members." }, { status: 400 });
    }

    // Confirm the team
    const updatedTeam = await prisma.team.update({
      where: { id: teamId },
      data: { isConfirmed: true }
    });

    return NextResponse.json({ success: true, team: updatedTeam });
  } catch (error) {
    console.error("Confirm Team Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
