import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { regNo, password } = body;

    if (!regNo || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const formattedRegNo = regNo.toUpperCase().trim();

    // Check for Main Admin Login
    if (formattedRegNo === "PLACEITADMIN" && password === "place5.0") {
      return NextResponse.json({
        success: true,
        user: { regNo: "admin", username: "placeitadmin", role: "main_admin" },
      });
    }

    // Check for Sub Admin Login
    const admin = await prisma.admin.findUnique({
      where: { username: formattedRegNo },
    });

    if (admin && admin.password === password) {
      return NextResponse.json({
        success: true,
        user: { regNo: "admin", username: admin.username, role: admin.isMain ? "main_admin" : "sub_admin" },
      });
    }

    // Standard User Login
    const user = await prisma.user.findUnique({
      where: { regNo: formattedRegNo },
      include: { team: true },
    });

    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: "Invalid registration number or password" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        regNo: user.regNo,
        username: user.username,
        teamId: user.teamId,
        isLeader: user.isLeader,
        team: user.team ? {
          name: user.team.name,
          code: user.team.code,
          isConfirmed: user.team.isConfirmed,
          domain: user.team.domain,
          statementId: user.team.statementId,
          statementTitle: user.team.statementTitle,
          isLocked: user.team.isLocked,
        } : null
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
