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

    const mainAdmin = await prisma.admin.findUnique({ where: { username: mainAdminUser } });
    if (!mainAdmin || !mainAdmin.isMain) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 403 });
    }

    const newAdmin = await prisma.admin.create({
      data: { username, password, isMain: false }
    });

    await prisma.auditLog.create({
      data: { adminUser: mainAdminUser, action: "CREATE_SUB_ADMIN", details: `Created sub-admin: ${username}` }
    });

    return NextResponse.json({ success: true, admin: newAdmin });
  } catch (error) {
    console.error("Create SubAdmin Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, username, password, mainAdminUser } = await request.json();

    if (!id || !username || !password || !mainAdminUser) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const mainAdmin = await prisma.admin.findUnique({ where: { username: mainAdminUser } });
    if (!mainAdmin || !mainAdmin.isMain) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 403 });
    }

    const updated = await prisma.admin.update({
      where: { id },
      data: { username, password }
    });

    await prisma.auditLog.create({
      data: { adminUser: mainAdminUser, action: "UPDATE_SUB_ADMIN", details: `Updated sub-admin ID: ${id} → username: ${username}` }
    });

    return NextResponse.json({ success: true, admin: updated });
  } catch (error) {
    console.error("Update SubAdmin Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id, mainAdminUser } = await request.json();

    if (!id || !mainAdminUser) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const mainAdmin = await prisma.admin.findUnique({ where: { username: mainAdminUser } });
    if (!mainAdmin || !mainAdmin.isMain) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 403 });
    }

    await prisma.admin.delete({ where: { id } });

    await prisma.auditLog.create({
      data: { adminUser: mainAdminUser, action: "DELETE_SUB_ADMIN", details: `Deleted sub-admin ID: ${id}` }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete SubAdmin Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
