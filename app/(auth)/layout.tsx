import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import "../globals.css";

export const metadata: Metadata = {
  title: "Auth",
  description: "Authentication Pages",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en">
        <body className="bg-black text-white">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
