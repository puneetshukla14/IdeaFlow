// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  // No token → send to sign-in
  if (!token) {
    return NextResponse.redirect(new URL("/sign-up", req.url));
  }

  try {
    const decoded = verifyToken(token);
    if (!decoded?.username) {
      throw new Error("Invalid token");
    }
  } catch {
    // Bad token → send to sign-in
    return NextResponse.redirect(new URL("/sign-up", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"], // Protect dashboard
};
