import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

// Pages that don't require login
const publicPaths = ["/sign-in", "/sign-up", "/api/auth/login", "/api/auth/signup"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Always allow static files and Next.js internals
  if (pathname.startsWith("/_next") || pathname.startsWith("/favicon.ico")) {
    return NextResponse.next();
  }

  // Allow public paths without auth
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Check JWT in cookies
  const token = req.cookies.get("token")?.value;
  if (!token) {
    // No token → redirect to signup
    return NextResponse.redirect(new URL("/sign-up", req.url));
  }

  try {
    jwt.verify(token, JWT_SECRET); // will throw if invalid
    return NextResponse.next();
  } catch (err) {
    // Invalid/expired token → redirect to signup
    return NextResponse.redirect(new URL("/sign-up", req.url));
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)"
  ]
};
