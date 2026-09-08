import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { regNo } = await request.json();

    if (!regNo) {
      return NextResponse.json({ error: "Missing regNo" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { regNo: regNo.toUpperCase() },
      include: { 
        team: {
          include: { members: true }
        }
      }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Get Me Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
