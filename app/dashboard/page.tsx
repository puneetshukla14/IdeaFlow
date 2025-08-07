"use client";

import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import LiveFeed from "@/components/dashboard/LiveFeed";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0b0c0f] via-[#0e1014] to-[#121417] text-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div
        className="
          flex-1 flex flex-col
          p-6 space-y-6
          overflow-y-auto
          scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent
          animate-fade-in
        "
      >
        {/* Header */}
        <div className="animate-slide-up">
          <DashboardHeader />
        </div>

        {/* Live Feed - Full Width */}
        <div className="animate-slide-up delay-150">
          <div className="bg-[#181a1f] rounded-xl shadow-md hover:shadow-lg hover:shadow-black/40 transition-all duration-300 border border-[#24262b]">
            <LiveFeed />
          </div>
        </div>
      </div>
    </div>
  );
}
