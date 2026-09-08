import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { adminUser } = await request.json();

    if (!adminUser) {
      return NextResponse.json({ error: "Missing admin user" }, { status: 400 });
    }

    // Only main admin can clear data
    if (adminUser !== "placeitadmin") {
      return NextResponse.json({ error: "Unauthorized. Only the main admin can clear all data." }, { status: 403 });
    }

    // Delete in dependency order
    await prisma.auditLog.deleteMany({});
    await prisma.announcement.deleteMany({});
    await prisma.problemStatement.deleteMany({});
    
    // Disconnect all users from teams first
    await prisma.user.updateMany({
      data: {
        teamId: null,
        isLeader: false,
      },
    });
    await prisma.team.deleteMany({});
    
    // Delete all non-main admins (sub-admins)
    await prisma.admin.deleteMany({
      where: { isMain: false },
    });
    
    // Delete all users (participants)
    await prisma.user.deleteMany({});

    // Re-create audit log entry for the clear action
    await prisma.auditLog.create({
      data: {
        adminUser,
        action: "CLEAR_ALL_DATA",
        details: "All participant data, teams, statements, announcements, and sub-admins were wiped by main admin.",
      },
    });

    return NextResponse.json({ success: true, message: "All data cleared successfully." });
  } catch (error) {
    console.error("Clear Data Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
