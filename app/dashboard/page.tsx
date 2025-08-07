"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import LiveFeed from "@/components/dashboard/LiveFeed";
import { getCurrentUser } from "@/lib/getCurrentUser";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function checkUser() {
      const userData = await getCurrentUser();

      if (!userData) {
        router.replace("/sign-in");
        return;
      }

      setUser(userData);
      setLoading(false);
    }

    checkUser();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen space-y-6 animate-fade-in">
      {/* Header */}
      <div className="animate-slide-up">
        <DashboardHeader />
      </div>

      {/* Live Feed */}
      <div className="animate-slide-up delay-150">
        <div className="card hover:shadow-lg hover:shadow-black/40 transition-all duration-300">
          <LiveFeed />
        </div>
      </div>
    </div>
  );
}
