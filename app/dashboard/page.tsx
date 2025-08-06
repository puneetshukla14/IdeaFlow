"use client";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/dashboard/Header";
import WelcomeBanner from "@/components/dashboard/WelcomeBanner";
import StatCard from "@/components/dashboard/StatCard";
import RecentActivity from "@/components/dashboard/RecentActivity";
import TrendingResearch from "@/components/dashboard/TrendingResearch";
import { FileText, Users, Star, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col p-6 space-y-6 overflow-y-auto">
        <Header />
        <WelcomeBanner />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard icon={<FileText size={20} />} label="My Publications" value="32" />
          <StatCard icon={<Users size={20} />} label="Collaborations" value="14" />
          <StatCard icon={<Star size={20} />} label="Citations" value="286" />
          <StatCard icon={<TrendingUp size={20} />} label="Profile Views" value="1.2K" />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <RecentActivity />
          <TrendingResearch />
        </div>
      </div>
    </div>
  );
}
