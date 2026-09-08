import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { regNo, teamName } = await request.json();

    if (!regNo || !teamName) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Generate unique code
    const code = `TEAM_${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

    // Create Team and update User as leader
    const team = await prisma.team.create({
      data: {
        name: teamName,
        code,
        members: {
          connect: { regNo: regNo.toUpperCase() }
        }
      }
    });

    // Mark user as leader
    await prisma.user.update({
      where: { regNo: regNo.toUpperCase() },
      data: { isLeader: true }
    });

    return NextResponse.json({ success: true, team });
  } catch (error) {
    console.error("Create Team Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
