import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: { team: true },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json({ success: true, users });
  } catch (error) {
    console.error("Get Users Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, username, password, adminUser } = await request.json();

    if (!id || !username || !password || !adminUser) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const updated = await prisma.user.update({
      where: { id },
      data: { username, password },
      include: { team: true }
    });

    await prisma.auditLog.create({
      data: { adminUser, action: "UPDATE_USER", details: `Updated user ${updated.regNo}: username=${username}` }
    });

    return NextResponse.json({ success: true, user: updated });
  } catch (error) {
    console.error("Update User Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id, adminUser } = await request.json();

    if (!id || !adminUser) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Get user info before deleting
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // If this user was a team leader, check if team needs to be cleaned up
    if (user.isLeader && user.teamId) {
      const memberCount = await prisma.user.count({ where: { teamId: user.teamId } });
      if (memberCount <= 1) {
        // Only member left, delete the team too
        await prisma.team.delete({ where: { id: user.teamId } });
      } else {
        // Assign another member as leader
        const nextMember = await prisma.user.findFirst({
          where: { teamId: user.teamId, id: { not: id } }
        });
        if (nextMember) {
          await prisma.user.update({ where: { id: nextMember.id }, data: { isLeader: true } });
        }
      }
    }

    await prisma.user.delete({ where: { id } });

    await prisma.auditLog.create({
      data: { adminUser, action: "DELETE_USER", details: `Deleted user: ${user.regNo} (${user.username})` }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete User Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
