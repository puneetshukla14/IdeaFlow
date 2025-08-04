// middleware.ts
import {
  clerkMiddleware,
  createRouteMatcher,
  redirectToSignIn
} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Public routes — no authentication required
const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware((auth, req) => {
  const { userId } = auth();

  // If NOT logged in and trying to access a private route → redirect to sign-in
  if (!userId && !isPublicRoute(req)) {
    return redirectToSignIn({ returnBackUrl: req.url });
  }

  // If logged in and tries to visit a public route (sign-in/sign-up) → redirect to homepage
  if (userId && isPublicRoute(req)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Otherwise → continue to the requested page
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|.*\\..*|api).*)" // runs on all routes except Next.js internals & API
  ],
};
