"use client";
import { Bell, Mail, Search } from "lucide-react";
import Image from "next/image";

export default function Header() {
  return (
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
  );
}
