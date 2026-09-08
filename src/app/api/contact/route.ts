import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const links = await prisma.contactLink.findMany({
      orderBy: { sortOrder: "asc" }
    });
    return NextResponse.json({ success: true, links });
  } catch (error) {
    console.error("Public Contact Error:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
