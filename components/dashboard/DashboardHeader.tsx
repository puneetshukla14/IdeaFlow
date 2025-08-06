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
    <div className="space-y-5 animate-fade-in">
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
        bg-white/40 backdrop-blur-xl
        px-5 py-3 rounded-2xl
        shadow-lg shadow-black/5
        border border-white/20
        transition-all duration-300
        hover:shadow-xl hover:border-white/30
        relative z-50
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
        bg-white/70 backdrop-blur-md
        rounded-xl px-3 py-2 w-1/3
        ring-2 ring-blue-400/60 shadow-inner
        border border-gray-200/50
        transition-all duration-300 ease-in-out
        hover:bg-white/90 hover:shadow-lg
        hover:ring-blue-400 focus-within:ring-blue-500
        animate-[pulseGlow_3s_ease-in-out_infinite]
      "
    >
      <Search
        size={18}
        className="text-gray-500 mr-2 transition-colors duration-300 ease-in-out group-hover:text-blue-500 focus-within:text-blue-500"
      />
      <input
        ref={inputRef}
        type="text"
        placeholder="Search research, papers, datasets..."
        className="
          bg-transparent outline-none
          text-[15px] font-medium w-full
          placeholder-gray-500 placeholder-opacity-80
          transition-all duration-300 ease-in-out
          focus:placeholder-opacity-50
        "
      />
      <kbd
        className="
          ml-2 text-[10px] px-1.5 py-0.5 rounded
          bg-gray-200/80 text-gray-600 border border-gray-300
          transition-colors duration-300 ease-in-out
        "
      >
        /
      </kbd>
    </div>
  );
}

/* ------------------ ACTION BUTTONS ------------------ */
function HeaderActions() {
  return (
    <div className="flex items-center gap-3">
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
        hover:bg-white/60 hover:shadow
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
        width={42}
        height={42}
        className="
          rounded-full cursor-pointer
          ring-2 ring-transparent
          hover:ring-blue-400 hover:scale-105
          transition-all duration-300
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
        bg-white/95 backdrop-blur-lg
        border border-gray-200 rounded-xl shadow-xl
        origin-top-right transform transition-all duration-200 ease-out
        z-[200]
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
    <div className="px-4 py-2 text-sm font-semibold text-gray-700 border-b bg-gray-50/90">
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
  const [quoteIndex, setQuoteIndex] = useState(0);
  const greetings = [
    "Pushing the boundaries of human knowledge.",
    "Every discovery starts with curiosity.",
    "Your research shapes the future.",
    "The world is waiting for your ideas.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % greetings.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="
        relative z-0
        bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600
        animate-gradient bg-[length:200%_200%]
        text-white p-6 rounded-2xl shadow-lg
        flex flex-col sm:flex-row items-start sm:items-center justify-between
        overflow-hidden
      "
    >
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 pointer-events-none" />
      <div>
        <h2 className="text-2xl font-bold tracking-tight drop-shadow animate-fade-up">
          Welcome back, Researcher!
        </h2>
        <p
          className="text-sm text-blue-100 mt-1 transition-opacity duration-700 ease-in-out"
          key={quoteIndex}
        >
          {greetings[quoteIndex]}
        </p>
      </div>
      <button
        className="
          mt-3 sm:mt-0
          bg-white/90 text-blue-700
          px-4 py-2 rounded-lg font-semibold
          hover:bg-white hover:shadow-md
          flex items-center gap-1
          transition-all duration-200
        "
      >
        View Global Trends <ArrowUpRight size={16} />
      </button>
    </div>
  );
}
