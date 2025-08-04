"use client";

import { SignIn } from "@clerk/nextjs";
import AuthBackground from "@/components/AuthBackground";

export default function SignInPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <AuthBackground />
      <div className="relative z-10">
        <SignIn
          routing="hash"
          signUpUrl="/sign-up"
          afterSignInUrl="/" // Login ke baad homepage
        />
      </div>
    </div>
  );
}
