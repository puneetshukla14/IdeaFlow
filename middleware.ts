import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  const url = new URL(req.url);

  // Don't run for auth pages or API routes
  if (url.pathname.startsWith("/sign-in") || url.pathname.startsWith("/sign-up") || url.pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  if (userId) {
    const client = await clientPromise;
    const db = client.db();
    const accounts = db.collection("accounts");

    const existing = await accounts.findOne({ clerkId: userId });

    // If no profile and not already on setup-profile, redirect
    if (!existing && url.pathname !== "/setup-profile") {
      return NextResponse.redirect(new URL("/setup-profile", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)"], // run for all pages
};
