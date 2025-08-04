import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
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
    } = await req.json();

    // Validate required fields
    if (!clerkId || !username || !fullName || !affiliation || !fieldOfResearch) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("myapp");
    const accounts = db.collection("accounts");

    // Check for username uniqueness
    const existingUser = await accounts.findOne({ username: username.trim() });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "Username already taken" },
        { status: 409 }
      );
    }

    // Normalize keywords safely
    let keywordArray: string[] = [];
    if (typeof keywords === "string" && keywords.trim() !== "") {
      keywordArray = keywords.split(",").map((k) => k.trim());
    } else if (Array.isArray(keywords)) {
      keywordArray = keywords.map((k) => String(k).trim());
    }

    // Insert profile data
    await accounts.insertOne({
      clerkId,
      fullName: fullName.trim(),
      affiliation: affiliation.trim(),
      fieldOfResearch: fieldOfResearch.trim(),
      username: username.trim(),
      avatar: avatar || null,
      bio: bio?.trim() || "",
      keywords: keywordArray,
      orcid: orcid?.trim() || "",
      website: website?.trim() || "",
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error saving profile:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
