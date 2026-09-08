import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { regNo, targetTeamId, adminUser } = await request.json();

    if (!regNo || !adminUser) {
      return NextResponse.json({ error: "Missing regNo or adminUser" }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { regNo: regNo.toUpperCase() },
      data: {
        teamId: targetTeamId || null,
        isLeader: false // Demote if moved
      }
    });

    // Log action
    await prisma.auditLog.create({
      data: {
        adminUser,
        action: "CHANGE_TEAM_MEMBER",
        details: `Moved ${regNo} to team ${targetTeamId || 'None'}`
      }
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Change Member Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
