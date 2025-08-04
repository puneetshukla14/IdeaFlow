import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const { clerkId, email, fullName } = await req.json();

    if (!clerkId || !email || !fullName) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("myapp");

    await db.collection("accounts").insertOne({
      clerkId,
      email,
      fullName,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error("Error creating account:", err);

    const message =
      err instanceof Error
        ? err.message
        : "An unexpected error occurred while creating account";

    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
