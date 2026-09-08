import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { teamId, domain, statementId, statementTitle, isLocked, adminUser } = await request.json();

    if (!teamId || !adminUser) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const updatedTeam = await prisma.team.update({
      where: { id: teamId },
      data: {
        domain,
        statementId,
        statementTitle,
        isLocked
      }
    });

    // Log action
    await prisma.auditLog.create({
      data: {
        adminUser,
        action: "ASSIGN_PROBLEM_STATEMENT",
        details: `Assigned statement ${statementId} to team ${teamId}. Locked: ${isLocked}`
      }
    });

    return NextResponse.json({ success: true, team: updatedTeam });
  } catch (error) {
    console.error("Assign Statement Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
