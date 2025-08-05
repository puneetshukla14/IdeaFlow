import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 });
    }

    await connectDB();

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return NextResponse.json({ error: "Username already taken" }, { status: 409 });
    }

    // Find last userNumber
    const lastUser = await User.findOne().sort({ userNumber: -1 });
    const newUserNumber = lastUser ? lastUser.userNumber + 1 : 1;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      userNumber: newUserNumber,
      username,
      password: hashedPassword
    });

    return NextResponse.json({ success: true, redirectTo: "/dashboard" }, { status: 201 });
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
