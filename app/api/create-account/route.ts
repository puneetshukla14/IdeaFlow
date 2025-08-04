import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const { clerkId, email, fullName } = await req.json();
    const client = await clientPromise;
    const db = client.db("myapp");

    await db.collection("accounts").insertOne({
      clerkId,
      email,
      fullName,
      createdAt: new Date()
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error creating account:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
