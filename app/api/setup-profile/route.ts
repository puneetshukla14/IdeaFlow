import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export async function POST(req: Request) {
  try {
    const token = req.headers.get("cookie")?.match(/token=([^;]+)/)?.[1];
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded?.userId) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const body = await req.json();
    await dbConnect();

    const updatedUser = await User.findByIdAndUpdate(
      decoded.userId,
      { ...body },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (err) {
    console.error("Error saving profile:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
