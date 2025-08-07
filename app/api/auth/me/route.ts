import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import UserData from "@/models/UserData";
import { verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";

export async function GET() {
  await dbConnect();

  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  if (!token) {
    return new Response(JSON.stringify({ error: "No token found" }), {
      status: 401,
    });
  }

  const payload = verifyToken(token);

  if (!payload) {
    return new Response(JSON.stringify({ error: "Invalid token" }), {
      status: 401,
    });
  }

  const { userId } = payload;

  try {
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    // Fetch fullName and email from UserData
    const userData = await UserData.findOne({ username: user.username });

    const fullName = userData?.profile?.fullName || "";
    const email = userData?.profile?.email || "";

    const now = new Date();
    const expires = new Date(user.premiumExpiresAt);
    const diffMs = expires.getTime() - now.getTime();
    const daysLeft = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
    const trialExpired = now > expires;

    return new Response(
      JSON.stringify({
        user: {
          _id: user._id,
          username: user.username,
          fullName,
          email,
          isPremium: user.isPremium,
          premiumExpiresAt: user.premiumExpiresAt,
          daysLeft,
          trialExpired,
        },
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("GET /api/auth/me error:", err);
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
    });
  }
}
