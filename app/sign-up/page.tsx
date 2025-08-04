// app/sign-up/page.tsx
"use client";

import { SignUp } from "@clerk/nextjs";
import AuthBackground from "@/components/AuthBackground";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export default function SignUpPage() {
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    // Once the user signs in right after signup, store them in MongoDB
    if (isSignedIn && user) {
      fetch("/api/create-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clerkId: user.id,
          email: user.primaryEmailAddress?.emailAddress || "",
          fullName: user.fullName || "",
        }),
      }).catch((err) => console.error("Failed to save user in DB", err));
    }
  }, [isSignedIn, user]);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <AuthBackground />

      {/* Clerk Sign-Up Form */}
      <div className="relative z-10">
        <SignUp routing="hash" signInUrl="/sign-in" />
      </div>
    </div>
  );
}
