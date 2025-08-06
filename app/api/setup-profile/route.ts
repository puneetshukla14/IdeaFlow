import dbConnect from "@/lib/mongodb";
import UserData from "@/models/UserData";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { verifyToken, signToken } from "@/lib/jwt";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded?.username) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const body = await req.json();
    await dbConnect();

    await UserData.findOneAndUpdate(
      { username: decoded.username },
      { $set: { profile: body } },
      { new: true, upsert: true }
    );

    const user = await User.findOne({ username: decoded.username });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const newToken = signToken({
      userId: user._id.toString(),
      username: user.username,
    });

    const res = NextResponse.json({
      success: true,
      redirectTo: "/dashboard",
    });

    res.cookies.set("token", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (err) {
    console.error("Error saving profile:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
