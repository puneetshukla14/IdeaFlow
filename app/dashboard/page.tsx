"use client";

import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";


export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-6 space-y-6 overflow-y-auto">
        <DashboardHeader />
       

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
     
         
        </div>

     
      </div>
    </div>
  );
}
