"use client";

import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsCards from "@/components/dashboard/StatsCards";
import LiveFeed from "@/components/dashboard/LiveFeed";
import TrendingResearch from "@/components/dashboard/TrendingResearch";
import CommunityHighlights from "@/components/dashboard/CommunityHighlights";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-6 space-y-6 overflow-y-auto">
        <DashboardHeader />
        <StatsCards />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <LiveFeed className="lg:col-span-2" />
          <TrendingResearch />
        </div>

        <CommunityHighlights />
      </div>
    </div>
  );
}
