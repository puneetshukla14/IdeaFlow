import dbConnect from "@/lib/mongodb";
import UserData from "@/models/UserData";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";

export async function GET() {
  try {
    // Server side cookie read
    const token = (await cookies()).get("token")?.value; 
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded || !decoded.username) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    await dbConnect();

    const userData = await UserData.findOne({ username: decoded.username }).lean();
    if (!userData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user: userData }, { status: 200 });
  } catch (err) {
    console.error("Me error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
