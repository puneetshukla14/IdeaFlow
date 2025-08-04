import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Incoming setup-profile data:", body);

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

    // Check required fields
    if (!clerkId || !fullName || !username) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("myapp");
    const accounts = db.collection("accounts");

    // See if account already exists
    const existing = await accounts.findOne({ clerkId });
    if (existing) {
      // Update existing profile
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
        }
      );
    } else {
      // Insert new profile
      await accounts.insertOne({
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
        createdAt: new Date(),
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Setup profile API error:", err);
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}
