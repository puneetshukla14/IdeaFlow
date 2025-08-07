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

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return NextResponse.json({ error: "Username already taken" }, { status: 409 });
    }

    const lastUser = await User.findOne().sort({ userNumber: -1 });
    const newUserNumber = lastUser ? lastUser.userNumber + 1 : 1;
    const hashedPassword = await bcrypt.hash(password, 10);

    const premiumExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days from now

    const newUser = await User.create({
      userNumber: newUserNumber,
      username,
      password: hashedPassword,
      isPremium: true,
      premiumExpiresAt,
    });

    await UserData.create({ username, profile: {} });

    const token = signToken({
      userId: newUser._id.toString(),
      username: newUser.username,
    });

    const res = NextResponse.json({ success: true, redirectTo: "/setup-profile" }, { status: 201 });
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
