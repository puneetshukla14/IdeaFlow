// app/api/check-profile/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const clerkId = url.searchParams.get("clerkId");

    if (!clerkId) {
      return NextResponse.json({ success: false, error: "Missing clerkId" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("myapp");
    const accounts = db.collection("accounts");

    const user = await accounts.findOne({ clerkId });
    return NextResponse.json({ hasProfile: !!user });
  } catch (error: any) {
    console.error("Error checking profile:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
