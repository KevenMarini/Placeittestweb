import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const logs = await prisma.auditLog.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json({ success: true, logs });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
