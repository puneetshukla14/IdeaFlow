// app/api/setup-profile/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      clerkId,
      fullName,
      affiliation,
      fieldOfResearch,
      username,
      avatar,
      bio,
      keywords,
      orcid,
      website,
    } = body;

    if (!clerkId || !fullName || !username) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("your_database_name"); // change this to your DB name
    const accounts = db.collection("accounts");

    // Update if user already exists, otherwise insert
    await accounts.updateOne(
      { clerkId },
      {
        $set: {
          fullName,
          affiliation,
          fieldOfResearch,
          username,
          avatar,
          bio,
          keywords,
          orcid,
          website,
          updatedAt: new Date(),
        },
      },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving profile:", error);
    return NextResponse.json(
      { error: "Failed to save profile" },
      { status: 500 }
    );
  }
}
