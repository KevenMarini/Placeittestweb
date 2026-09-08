import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const subAdmins = await prisma.admin.findMany({
      where: { isMain: false },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json({ success: true, subAdmins });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { username, password, mainAdminUser } = await request.json();

    if (!username || !password || !mainAdminUser) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Verify request is from main admin
    const mainAdmin = await prisma.admin.findUnique({
      where: { username: mainAdminUser }
    });

    if (!mainAdmin || !mainAdmin.isMain) {
      return NextResponse.json({ error: "Unauthorized. Only main admin can create sub-admins." }, { status: 403 });
    }

    const newAdmin = await prisma.admin.create({
      data: { username, password, isMain: false }
    });

    await prisma.auditLog.create({
      data: {
        adminUser: mainAdminUser,
        action: "CREATE_SUB_ADMIN",
        details: `Created sub-admin: ${username}`
      }
    });

    return NextResponse.json({ success: true, admin: newAdmin });
  } catch (error) {
    console.error("Create SubAdmin Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
