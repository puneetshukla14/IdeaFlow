import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { clerkId, email, ...profileData } = body;

    if (!clerkId || !email) {
      return NextResponse.json({ error: "Missing clerkId or email" }, { status: 400 });
    }

    await connectDB();

    await User.findOneAndUpdate(
      { clerkId },
      { clerkId, email, ...profileData },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error saving profile:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
