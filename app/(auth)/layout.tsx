"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import AuthBackground from "@/components/AuthBackground";
import "../globals.css";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: { colorBackground: "transparent" },
        elements: {
          card: "bg-black/30 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl p-8 w-full max-w-md animate-authCard",
        },
      }}
    >
      <div className="relative min-h-screen flex items-center justify-center">
        <AuthBackground />
        <div className="relative z-10">{children}</div>
      </div>
    </ClerkProvider>
  );
}
