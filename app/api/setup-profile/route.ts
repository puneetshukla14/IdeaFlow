// app/api/setup-profile/route.ts
export const runtime = "nodejs"; // <-- Add this

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
    const db = client.db("your_database_name"); // Change to your DB name
    const accounts = db.collection("accounts");

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

    // Send a cookie flag to tell middleware profile is complete
    const res = NextResponse.json({ success: true });
    res.cookies.set("profileSetupComplete", "true", {
      path: "/",
      maxAge: 60, // valid for 1 minute
    });

    return res;
  } catch (error) {
    console.error("Error saving profile:", error);
    return NextResponse.json(
      { error: "Failed to save profile" },
      { status: 500 }
    );
  }
}
