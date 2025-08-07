import dbConnect from "@/lib/mongodb";
import User from "@/models/User"; // or wherever your User model is

export async function GET(req: Request) {
  await dbConnect();

  const token = req.headers.get("cookie")?.match(/token=([^;]+)/)?.[1];

  if (!token) {
    return new Response(JSON.stringify({ error: "No token found" }), {
      status: 401,
    });
  }

  try {
    const { userId } = verifyToken(token); // import this from your jwt helper
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Invalid token" }), {
      status: 401,
    });
  }
}
