import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { regNo, username, password } = body;

    if (!regNo || !username || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Format RegNo (e.g., 21BCE1234 -> uppercase)
    const formattedRegNo = regNo.toUpperCase().trim();

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { regNo: formattedRegNo },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Registration number already registered" },
        { status: 400 }
      );
    }

    // Create user
    const newUser = await prisma.user.create({
      data: {
        regNo: formattedRegNo,
        username,
        password, // Plain text for hackathon internal use as requested
      },
    });

    return NextResponse.json({
      success: true,
      user: {
        regNo: newUser.regNo,
        username: newUser.username,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
