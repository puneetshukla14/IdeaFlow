// /api/auth/me/route.ts

import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { verifyToken } from "@/lib/jwt";

export async function GET(req: Request) {
  await dbConnect();

  const token = req.headers.get("cookie")?.match(/token=([^;]+)/)?.[1];

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

    // Calculate remaining days
    const now = new Date();
    const expires = new Date(user.premiumExpiresAt);
    const diffMs = expires.getTime() - now.getTime();
    const daysLeft = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
    const trialExpired = now > expires;

    const responsePayload = {
      _id: user._id,
      username: user.username,
      isPremium: user.isPremium,
      premiumExpiresAt: user.premiumExpiresAt,
      daysLeft,
      trialExpired,
    };

    return new Response(JSON.stringify(responsePayload), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
    });
  }
}
