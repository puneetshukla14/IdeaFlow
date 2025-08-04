// app/sign-in/page.tsx
"use client";

import { SignIn } from "@clerk/nextjs";
import AuthBackground from "@/components/AuthBackground";

export default function SignInPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background */}
      <AuthBackground />

      {/* Clerk Sign-In Form */}
      <div className="relative z-10">
        <SignIn routing="hash" />
      </div>
    </div>
  );
}
