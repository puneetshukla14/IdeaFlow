import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import UserData from "@/models/UserData";
import { signToken } from "@/lib/jwt";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 });
    }

    await dbConnect();

    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    }

    const profileData = await UserData.findOne({ username });
    const hasProfile = !!profileData?.profile?.fullName && !!profileData?.profile?.email;

    const token = signToken({
      userId: user._id.toString(),
      username: user.username,
    });

    const redirectTo = hasProfile ? "/" : "/setup-profile";

    // ✅ Cookie set
    const res = NextResponse.json({ success: true, redirectTo }, { status: 200 });
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // prod me true
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
