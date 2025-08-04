import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isAuthPage = createRouteMatcher(["/sign-in", "/sign-up"]);
const isSetupProfilePage = createRouteMatcher(["/setup-profile"]);

export default clerkMiddleware((auth, req) => {
  const { userId } = auth(); // ✅ works in v5 stable
  const url = new URL(req.url);

  // Signed in → block sign-in / sign-up pages
  if (userId && isAuthPage(req)) {
    return Response.redirect(new URL("/", req.url));
  }

  // Setup profile protection
  if (isSetupProfilePage(req)) {
    if (!userId) {
      return Response.redirect(new URL("/sign-in", req.url));
    }
    // We cannot call fetch here easily — instead we should do this check in the page itself or in middleware with a DB query
  }

  return;
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
