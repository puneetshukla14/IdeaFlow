"use client";

import { Bell, Mail, Search, ArrowUpRight } from "lucide-react";
import Image from "next/image";

export default function DashboardHeader() {
  return (
    <>
      {/* Top Header */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm">
        {/* Search */}
        <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 w-1/3">
          <Search size={18} className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search research, papers, datasets..."
            className="bg-transparent outline-none text-sm w-full"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="relative p-2 bg-gray-100 rounded-full hover:bg-gray-200">
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="relative p-2 bg-gray-100 rounded-full hover:bg-gray-200">
            <Mail size={18} />
          </button>
          <Image
            src="/avatars/avatar1.jpg"
            alt="Profile"
            width={36}
            height={36}
            className="rounded-full cursor-pointer"
          />
        </div>
      </div>

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-xl shadow-md flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Welcome back, Researcher!</h2>
          <p className="text-sm text-blue-100 mt-1">
            Here’s what’s happening in the global research community today.
          </p>
        </div>
        <button className="bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 flex items-center">
          View Global Trends <ArrowUpRight size={16} className="ml-1" />
        </button>
      </div>
    </>
  );
}
