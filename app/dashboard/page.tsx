"use client";

import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

import LiveFeed from "@/components/dashboard/LiveFeed";
import CommunityHighlights from "@/components/dashboard/CommunityHighlights";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div
        className="
          flex-1 flex flex-col
          p-6 space-y-6
          overflow-y-auto
          scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent
          animate-fade-in
        "
      >
        {/* Header */}
        <div className="animate-slide-up">
          <DashboardHeader />
        </div>

        {/* Live Feed - Full Width */}
        <div className="animate-slide-up delay-150">
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
            <LiveFeed />
          </div>
        </div>

        {/* Community Highlights */}
        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 animate-slide-up delay-200">
          <CommunityHighlights />
        </div>
      </div>
    </div>
  );
}
