// app/api/create-account/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const { clerkId, email, fullName } = await req.json();

    if (!clerkId || !email) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("myapp"); // Change "myapp" if you use a different DB name

    // Check if user already exists
    const existingUser = await db.collection("accounts").findOne({ clerkId });
    if (existingUser) {
      return NextResponse.json({ success: true, message: "User already exists" });
    }

    // Insert new user
    await db.collection("accounts").insertOne({
      clerkId,
      email,
      fullName,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error creating account:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
