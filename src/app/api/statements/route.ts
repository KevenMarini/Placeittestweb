import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const statements = await prisma.problemStatement.findMany({
      orderBy: { createdAt: 'asc' }
    });
    return NextResponse.json({ success: true, statements });
  } catch (error) {
    console.error("Public Statements Error:", error);
    return NextResponse.json({ error: "Failed to fetch statements" }, { status: 500 });
  }
}
