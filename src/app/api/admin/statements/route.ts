import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const statements = await prisma.problemStatement.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json({ success: true, statements });
  } catch (error) {
    console.error("Fetch Statements Error:", error);
    return NextResponse.json({ error: "Failed to fetch statements" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { domain, track, title, problem, challenge, description, adminUser } = await request.json();

    if (!domain || !track || !title || !problem || !challenge || !adminUser) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const statement = await prisma.problemStatement.create({
      data: { domain, track, title, problem, challenge, description }
    });

    await prisma.auditLog.create({
      data: {
        adminUser,
        action: "CREATE_STATEMENT",
        details: `Created statement [${domain}] ${track}: ${title}`
      }
    });

    return NextResponse.json({ success: true, statement });
  } catch (error) {
    console.error("Create Statement Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id, domain, type, adminUser } = await request.json();

    if (!adminUser) {
      return NextResponse.json({ error: "Missing admin user" }, { status: 400 });
    }

    if (type === 'domain') {
      if (!domain) return NextResponse.json({ error: "Missing domain" }, { status: 400 });
      await prisma.problemStatement.deleteMany({
        where: { domain }
      });
      await prisma.auditLog.create({
        data: {
          adminUser,
          action: "DELETE_DOMAIN",
          details: `Deleted domain [${domain}] and all its statements`
        }
      });
      return NextResponse.json({ success: true });
    } else if (type === 'track') {
      if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
      await prisma.problemStatement.delete({
        where: { id }
      });
      await prisma.auditLog.create({
        data: {
          adminUser,
          action: "DELETE_STATEMENT",
          details: `Deleted statement ID: ${id}`
        }
      });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid delete type" }, { status: 400 });
  } catch (error) {
    console.error("Delete Statement Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
