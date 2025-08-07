"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import LiveFeed from "@/components/dashboard/LiveFeed";

export default function DashboardPage() {
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
