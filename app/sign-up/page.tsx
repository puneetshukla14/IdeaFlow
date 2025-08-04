// app/sign-up/page.tsx
"use client";

import { SignUp } from "@clerk/nextjs";
import AuthBackground from "@/components/AuthBackground";

export default function SignUpPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background */}
      <AuthBackground />

      {/* Clerk Sign-Un Form */}
      <div className="relative z-10">
        <SignUp routing="hash" />
      </div>
    </div>
  );
}
