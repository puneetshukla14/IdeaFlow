// app/sign-up/page.tsx
"use client";

import { SignUp, useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthBackground from "@/components/AuthBackground";

export default function SignUpPage() {
  const { isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    async function checkProfile() {
      if (!isSignedIn || !user) return;

      const res = await fetch(`/api/check-profile?clerkId=${user.id}`);
      const data = await res.json();

      if (data.hasProfile) {
        router.push("/"); // already has profile → go home
      } else {
        router.push("/setup-profile"); // no profile → setup
      }
    }

    checkProfile();
  }, [isSignedIn, user, router]);

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <AuthBackground />
      <div className="relative z-10">
        <SignUp routing="hash" signInUrl="/sign-in" />
      </div>
    </div>
  );
}
