import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: { team: true },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json({ success: true, users });
  } catch (error) {
    console.error("Get Users Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
