import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/(.*)", // protect everything except sign-in/sign-up
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!.*\\..*|_next|sign-in|sign-up).*)", // ignore public assets and auth pages
    "/",
    "/(api|trpc)(.*)"
  ],
};
