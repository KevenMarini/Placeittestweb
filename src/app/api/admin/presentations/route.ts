import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - all submissions + lock state
export async function GET() {
  try {
    const [submissions, config] = await Promise.all([
      prisma.presentationLink.findMany({ orderBy: { createdAt: "asc" } }),
      prisma.siteConfig.findUnique({ where: { key: "presentation_unlocked" } }),
    ]);
    const isUnlocked = config?.value === "true";
    return NextResponse.json({ success: true, submissions, isUnlocked });
  } catch (error) {
    console.error("Admin Presentations GET Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PUT - toggle lock state
export async function PUT(request: Request) {
  try {
    const { unlock, adminUser } = await request.json();
    if (adminUser === undefined || unlock === undefined) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await prisma.siteConfig.upsert({
      where: { key: "presentation_unlocked" },
      update: { value: unlock ? "true" : "false" },
      create: { key: "presentation_unlocked", value: unlock ? "true" : "false" },
    });

    await prisma.auditLog.create({
      data: {
        adminUser,
        action: unlock ? "UNLOCK_PRESENTATIONS" : "LOCK_PRESENTATIONS",
        details: `Presentation submissions ${unlock ? "unlocked" : "locked"} by ${adminUser}`,
      },
    });

    return NextResponse.json({ success: true, isUnlocked: unlock });
  } catch (error) {
    console.error("Admin Presentations PUT Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE - remove a submission
export async function DELETE(request: Request) {
  try {
    const { id, adminUser } = await request.json();
    if (!id || !adminUser) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await prisma.presentationLink.delete({ where: { id } });

    await prisma.auditLog.create({
      data: { adminUser, action: "DELETE_PRESENTATION", details: `Deleted presentation ID: ${id}` },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin Presentations DELETE Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
