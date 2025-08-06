"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, Mail, Search, ArrowUpRight, LogOut, Settings, User } from "lucide-react";
import Image from "next/image";
import clsx from "clsx";

/* ------------------ MAIN HEADER ------------------ */
export default function DashboardHeader() {
  return (
    <>
      <HeaderTop />
      <WelcomeBanner />
    </>
  );
}

/* ------------------ TOP HEADER ------------------ */
function HeaderTop() {
  return (
    <header className="flex items-center justify-between bg-white p-4 rounded-xl shadow-lg border border-gray-100">
      <SearchBar />
      <HeaderActions />
    </header>
  );
}

/* ------------------ SEARCH BAR ------------------ */
function SearchBar() {
  return (
    <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2 w-1/3 focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-300">
      <Search size={18} className="text-gray-500 mr-2" />
      <input
        type="text"
        placeholder="Search research, papers, datasets..."
        className="bg-transparent outline-none text-sm w-full placeholder-gray-500"
      />
    </div>
  );
}

/* ------------------ ACTION BUTTONS ------------------ */
function HeaderActions() {
  return (
    <div className="flex items-center gap-4">
      <IconButton title="Notifications" icon={<Bell size={18} />} badge />
      <IconButton title="Messages" icon={<Mail size={18} />} />
      <ProfileMenu />
    </div>
  );
}

/* ------------------ ICON BUTTON ------------------ */
interface IconButtonProps {
  title: string;
  icon: React.ReactNode;
  badge?: boolean;
}

function IconButton({ title, icon, badge }: IconButtonProps) {
  return (
    <button
      title={title}
      className="relative p-2 bg-gray-100 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 shadow-sm"
    >
      {icon}
      {badge && <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>}
    </button>
  );
}

/* ------------------ PROFILE MENU ------------------ */
function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <Image
        src="/avatars/avatar1.jpg"
        alt="Profile"
        width={38}
        height={38}
        className="rounded-full cursor-pointer ring-2 ring-transparent hover:ring-blue-500 transition-all duration-200"
        onClick={() => setOpen(!open)}
      />
      <div
        className={clsx(
          "absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg origin-top-right transition-all duration-200 ease-out",
          open
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        )}
      >
        <DropdownItem icon={<User size={16} />} label="My Profile" />
        <DropdownItem icon={<Settings size={16} />} label="Settings" />
        <DropdownItem icon={<LogOut size={16} />} label="Logout" danger />
      </div>
    </div>
  );
}

/* ------------------ DROPDOWN ITEM ------------------ */
interface DropdownItemProps {
  icon: React.ReactNode;
  label: string;
  danger?: boolean;
}

function DropdownItem({ icon, label, danger }: DropdownItemProps) {
  return (
    <button
      className={`flex items-center px-4 py-2 text-sm w-full hover:bg-gray-50 transition-colors duration-200 ${
        danger ? "text-red-600 hover:text-red-700" : "text-gray-700 hover:text-blue-600"
      }`}
    >
      {icon}
      <span className="ml-2">{label}</span>
    </button>
  );
}

/* ------------------ WELCOME BANNER ------------------ */
function WelcomeBanner() {
  return (
    <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 animate-gradient bg-[length:200%_200%] text-white p-6 rounded-xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Welcome back, Researcher!</h2>
        <p className="text-sm text-blue-100 mt-1">
          Here’s what’s happening in the global research community today.
        </p>
      </div>
      <button className="mt-3 sm:mt-0 bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 flex items-center shadow-md transition-colors duration-200">
        View Global Trends <ArrowUpRight size={16} className="ml-1" />
      </button>
    </div>
  );
}
