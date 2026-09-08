import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const announcements = await prisma.announcement.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json({ success: true, announcements });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { message, adminUser } = await request.json();

    if (!message || !adminUser) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const announcement = await prisma.announcement.create({
      data: { message }
    });

    await prisma.auditLog.create({
      data: {
        adminUser,
        action: "POST_ANNOUNCEMENT",
        details: `Posted announcement: ${message.substring(0, 20)}...`
      }
    });

    return NextResponse.json({ success: true, announcement });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
