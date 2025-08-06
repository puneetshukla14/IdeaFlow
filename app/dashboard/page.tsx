// app/dashboard/page.tsx
"use client";

import Sidebar from "@/components/Sidebar";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-3xl font-bold text-gray-800">Hello Dashboard</h1>
        <p className="mt-2 text-gray-600">
          This is your main dashboard content.
        </p>
      </div>
    </div>
  );
}
