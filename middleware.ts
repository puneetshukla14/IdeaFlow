// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Specify which routes need protection
const isProtected = createRouteMatcher([
  "/dashboard(.*)",
  "/profile(.*)",
  "/ideas(.*)"
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtected(req)) {
    await auth.protect(); // Will redirect unauthenticated users
  }
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)",
    "/",
    "/(api|trpc)(.*)"
  ],
};
