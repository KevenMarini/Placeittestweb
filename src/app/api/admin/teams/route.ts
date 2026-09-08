import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const teams = await prisma.team.findMany({
      include: { members: true },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json({ success: true, teams });
  } catch (error) {
    console.error("Get Teams Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
