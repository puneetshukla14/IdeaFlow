"use client";

import { useState, useRef, useEffect } from "react";
import {
  Bell,
  Mail,
  Search,
  ArrowUpRight,
  LogOut,
  Settings,
  User,
  Inbox,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";
import clsx from "clsx";

/* ------------------ MAIN HEADER ------------------ */
export default function DashboardHeader() {
  return (
    <div className="space-y-4 animate-fade-in">
      <HeaderTop />
      <WelcomeBanner />
    </div>
  );
}

/* ------------------ TOP HEADER ------------------ */
function HeaderTop() {
  return (
    <header
      className="
        flex items-center justify-between
        bg-white/50 backdrop-blur-xl
        p-4 rounded-2xl shadow-md
        border border-white/30
        transition-all duration-300
        hover:shadow-lg hover:border-white/50
      "
    >
      <SearchBar />
      <HeaderActions />
    </header>
  );
}

/* ------------------ SEARCH BAR ------------------ */
function SearchBar() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      className="
        hidden md:flex items-center
        bg-gray-100/60 backdrop-blur-sm
        rounded-xl px-3 py-2 w-1/3
        focus-within:ring-2 focus-within:ring-blue-400
        transition-all duration-300
        hover:bg-gray-100 hover:shadow-md
      "
    >
      <Search
        size={18}
        className="text-gray-500 mr-2 transition-colors duration-200 group-hover:text-blue-500"
      />
      <input
        ref={inputRef}
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
    <div className="flex items-center gap-2">
      <HoverDropdown
        title="Notifications"
        icon={<Bell size={18} />}
        badge
        items={[
          {
            icon: <CheckCircle2 size={16} className="text-green-500" />,
            label: "Paper approved for publishing",
          },
          {
            icon: <CheckCircle2 size={16} className="text-green-500" />,
            label: "New follower joined your network",
          },
          {
            icon: <CheckCircle2 size={16} className="text-green-500" />,
            label: "Dataset review completed",
          },
        ]}
      />
      <HoverDropdown
        title="Messages"
        icon={<Mail size={18} />}
        items={[
          {
            icon: <Inbox size={16} className="text-blue-500" />,
            label: "John sent you a paper draft",
          },
          {
            icon: <Inbox size={16} className="text-blue-500" />,
            label: "Lisa invited you to collaborate",
          },
        ]}
      />
      <ProfileMenu />
    </div>
  );
}

/* ------------------ HOVER DROPDOWN ------------------ */
interface HoverDropdownProps {
  title: string;
  icon: React.ReactNode;
  badge?: boolean;
  items: { icon: React.ReactNode; label: string }[];
}

function HoverDropdown({ title, icon, badge, items }: HoverDropdownProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function closeOnOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", closeOnOutside);
    return () => document.removeEventListener("mousedown", closeOnOutside);
  }, []);

  return (
    <div
      ref={menuRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <IconButton title={title} icon={icon} badge={badge} onClick={() => setOpen(!open)} />
      <DropdownContainer open={open}>
        <DropdownHeader title={title} />
        <div className="max-h-60 overflow-y-auto">
          {items.map((item, idx) => (
            <DropdownItem key={idx} icon={item.icon} label={item.label} />
          ))}
        </div>
      </DropdownContainer>
    </div>
  );
}

/* ------------------ ICON BUTTON ------------------ */
interface IconButtonProps {
  title: string;
  icon: React.ReactNode;
  badge?: boolean;
  onClick?: () => void;
}

function IconButton({ title, icon, badge, onClick }: IconButtonProps) {
  return (
    <button
      title={title}
      onClick={onClick}
      className="
        relative p-2 rounded-full
        hover:bg-gray-100/80 hover:shadow
        transition-all duration-200
      "
    >
      {icon}
      {badge && (
        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full shadow-sm"></span>
      )}
    </button>
  );
}

/* ------------------ PROFILE MENU ------------------ */
function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function closeOnOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", closeOnOutside);
    return () => document.removeEventListener("mousedown", closeOnOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <Image
        src="/avatars/avatar1.jpg"
        alt="Profile"
        width={40}
        height={40}
        className="
          rounded-full cursor-pointer
          ring-2 ring-transparent
          hover:ring-blue-400 hover:scale-105
          transition-all duration-200
        "
        onClick={() => setOpen(!open)}
      />
      <DropdownContainer open={open}>
        <DropdownItem icon={<User size={16} />} label="My Profile" />
        <DropdownItem icon={<Settings size={16} />} label="Settings" />
        <DropdownItem icon={<LogOut size={16} />} label="Logout" danger />
      </DropdownContainer>
    </div>
  );
}

/* ------------------ DROPDOWN COMPONENTS ------------------ */
function DropdownContainer({ open, children }: { open: boolean; children: React.ReactNode }) {
  return (
    <div
      className={clsx(
        `
        absolute right-0 mt-2 w-64
        bg-white/90 backdrop-blur-lg
        border border-gray-200 rounded-xl shadow-lg
        origin-top-right transform transition-all duration-200 ease-out z-50
      `,
        open
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
      )}
    >
      {children}
    </div>
  );
}

function DropdownHeader({ title }: { title: string }) {
  return (
    <div className="px-4 py-2 text-sm font-semibold text-gray-700 border-b bg-gray-50/80">
      {title}
    </div>
  );
}

interface DropdownItemProps {
  icon: React.ReactNode;
  label: string;
  danger?: boolean;
}

function DropdownItem({ icon, label, danger }: DropdownItemProps) {
  return (
    <button
      className={`flex items-center px-4 py-2 text-sm w-full transition-colors duration-200 ${
        danger
          ? "text-red-600 hover:bg-red-50"
          : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
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
    <div
      className="
        bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600
        animate-gradient bg-[length:200%_200%]
        text-white p-6 rounded-2xl shadow-xl
        flex flex-col sm:flex-row items-start sm:items-center justify-between
      "
    >
      <div>
        <h2 className="text-2xl font-bold tracking-tight drop-shadow-sm">
          Welcome back, Researcher!
        </h2>
        <p className="text-sm text-blue-100 mt-1">
          Here’s what’s happening in the global research community today.
        </p>
      </div>
      <button
        className="
          mt-3 sm:mt-0
          bg-white text-blue-700
          px-4 py-2 rounded-lg font-semibold
          hover:bg-gray-100 hover:shadow-md
          flex items-center gap-1
          transition-all duration-200
        "
      >
        View Global Trends <ArrowUpRight size={16} />
      </button>
    </div>
  );
}
