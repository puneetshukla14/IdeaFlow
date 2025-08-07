import { NextRequest, NextResponse } from "next/server";
import { checkPremiumStatus } from "@/lib/checkPremiumStatus";
import { getUserFromToken } from "@/lib/getUserFromToken"; // however you fetch user

export async function GET(req: NextRequest) {
  const user = await getUserFromToken(req);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const expired = await checkPremiumStatus(user._id);

  if (expired) {
    return NextResponse.json({ error: "Premium expired" }, { status: 403 });
  }

  return NextResponse.json({ success: true });
}
