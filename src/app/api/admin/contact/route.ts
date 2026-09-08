import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const links = await prisma.contactLink.findMany({
      orderBy: { sortOrder: "asc" }
    });
    return NextResponse.json({ success: true, links });
  } catch (error) {
    console.error("Contact GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { label, icon, link, sortOrder, adminUser } = await request.json();
    if (!label || !adminUser) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    const created = await prisma.contactLink.create({
      data: { label, icon: icon || "", link: link || "", sortOrder: sortOrder ?? 0 }
    });
    await prisma.auditLog.create({
      data: { adminUser, action: "CREATE_CONTACT", details: `Added contact: ${label}` }
    });
    return NextResponse.json({ success: true, link: created });
  } catch (error) {
    console.error("Contact POST Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, label, icon, link, sortOrder, adminUser } = await request.json();
    if (!id || !adminUser) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    const updated = await prisma.contactLink.update({
      where: { id },
      data: { label, icon, link, sortOrder }
    });
    await prisma.auditLog.create({
      data: { adminUser, action: "UPDATE_CONTACT", details: `Updated contact: ${label}` }
    });
    return NextResponse.json({ success: true, link: updated });
  } catch (error) {
    console.error("Contact PUT Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id, adminUser } = await request.json();
    if (!id || !adminUser) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    await prisma.contactLink.delete({ where: { id } });
    await prisma.auditLog.create({
      data: { adminUser, action: "DELETE_CONTACT", details: `Deleted contact ID: ${id}` }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact DELETE Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
