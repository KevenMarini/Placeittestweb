import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const statements = await prisma.problemStatement.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json({ success: true, statements });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { domain, title, description, adminUser } = await request.json();

    if (!domain || !title || !description || !adminUser) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const statement = await prisma.problemStatement.create({
      data: { domain, title, description }
    });

    await prisma.auditLog.create({
      data: {
        adminUser,
        action: "ADD_PROBLEM_STATEMENT",
        details: `Added new PS: ${title}`
      }
    });

    return NextResponse.json({ success: true, statement });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const adminUser = searchParams.get('adminUser');

    if (!id || !adminUser) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await prisma.problemStatement.delete({
      where: { id }
    });

    await prisma.auditLog.create({
      data: {
        adminUser,
        action: "DELETE_PROBLEM_STATEMENT",
        details: `Deleted PS ID: ${id}`
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
