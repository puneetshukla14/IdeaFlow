"use client";

import { useState, useRef, useEffect } from "react";
import {
  Bell,
  Mail,
  Search,
  ArrowUpRight,
  BarChart2,
  Flame,
  BookOpen,
  CircleDot,
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
    <div className="space-y-3 animate-fade-in">
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
        bg-[#0f1115]/90 backdrop-blur-xl
        px-4 py-2 rounded-xl
        shadow-lg shadow-black/50
        border border-[#1d1f25]
        hover:border-[#2a2d33]
        transition-all duration-300
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
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("searchHintShown")) {
      setShowHint(true);
      setTimeout(() => {
        setShowHint(false);
        localStorage.setItem("searchHintShown", "true");
      }, 4000);
    }

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
    <div className="relative hidden md:flex items-center">
      <div
        className="
          flex items-center
          bg-[#1a1c21]/90 backdrop-blur-md
          rounded-xl px-3 py-2 w-80
          border border-[#2a2d33]
          transition-all duration-300
          focus-within:border-blue-500 hover:border-blue-500/70
        "
      >
        <Search size={18} className="text-gray-400 mr-2" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search research, papers, datasets..."
          className="
            bg-transparent outline-none
            text-[15px] font-medium w-full
            placeholder-gray-400
            focus:placeholder-opacity-60
            text-gray-200
          "
        />
        <kbd
          className="
            ml-2 text-[10px] px-1.5 py-0.5 rounded
            bg-[#22252c] text-gray-300 border border-[#2a2d33]
          "
        >
          /
        </kbd>
      </div>

      {showHint && (
        <div className="absolute top-full mt-2 text-xs bg-[#1a1c21] text-white px-2 py-1 rounded border border-[#2a2d33] shadow-lg animate-fade-in">
          Press / to search instantly
        </div>
      )}
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
        badgeCount={3}
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
        badgeCount={7}
        items={[
          {
            icon: <Inbox size={16} className="text-blue-400" />,
            label: "John sent you a paper draft",
          },
          {
            icon: <Inbox size={16} className="text-blue-400" />,
            label: "Lisa invited you to collaborate",
          },
        ]}
      />
      <ProfileMenu />
    </div>
  );
}

/* ------------------ HOVER DROPDOWN ------------------ */
function HoverDropdown({
  title,
  icon,
  badgeCount,
  items,
}: {
  title: string;
  icon: React.ReactNode;
  badgeCount?: number;
  items: { icon: React.ReactNode; label: string }[];
}) {
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
      <IconButton
        title={title}
        icon={icon}
        badgeCount={badgeCount}
        onClick={() => setOpen(!open)}
      />
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
function IconButton({
  title,
  icon,
  badgeCount,
  onClick,
}: {
  title: string;
  icon: React.ReactNode;
  badgeCount?: number;
  onClick?: () => void;
}) {
  return (
    <button
      title={title}
      onClick={onClick}
      className="
        relative p-2 rounded-full
        hover:bg-[#232732]
        transition-all duration-200
        text-gray-300
      "
    >
      {icon}
      {badgeCount && badgeCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-scale-in">
          {badgeCount}
        </span>
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
      <div className="relative">
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
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#0f1115] rounded-full"></span>
      </div>
      <DropdownContainer open={open}>
        <DropdownItem icon={<User size={16} />} label="My Profile" />
        <DropdownItem icon={<Settings size={16} />} label="Settings" />
        <DropdownItem icon={<LogOut size={16} />} label="Logout" danger />
      </DropdownContainer>
    </div>
  );
}

/* ------------------ DROPDOWN COMPONENTS ------------------ */
function DropdownContainer({
  open,
  children,
}: {
  open: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={clsx(
        `
        absolute right-0 mt-2 w-64
        bg-[#1a1c21]/95 backdrop-blur-lg
        border border-[#2a2d33] rounded-xl shadow-xl
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
    <div className="px-4 py-2 text-sm font-semibold text-gray-300 border-b border-[#2a2d33] bg-[#0f1115]/80">
      {title}
    </div>
  );
}

function DropdownItem({
  icon,
  label,
  danger,
}: {
  icon: React.ReactNode;
  label: string;
  danger?: boolean;
}) {
  return (
    <button
      className={`flex items-center px-4 py-2 text-sm w-full transition-all duration-200 ${
        danger
          ? "text-red-400 hover:bg-red-900/30"
          : "text-gray-300 hover:bg-[#232732] hover:text-blue-300"
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
  const quotes = [
    "Engineering tomorrow’s surgery begins today.",
    "Precision, innovation, and every step in between.",
    "Driving surgical equity through technology.",
    "Curiosity is our guiding instrument.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative z-0 overflow-hidden rounded-xl">
      {/* Background blurred blobs */}
      <div className="absolute -top-16 -left-16 w-64 h-64 bg-blue-500/40 blur-3xl rounded-full animate-pulse-slow" />
      <div className="absolute top-1/2 -right-16 w-72 h-72 bg-purple-500/30 blur-3xl rounded-full animate-pulse-slow delay-1000" />

      {/* Main glass card */}
      <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 p-4 sm:p-5 shadow-lg shadow-black/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Light sweep animation */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-[-150%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-light-sweep" />
        </div>

        {/* Text content */}
        <div className="relative z-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white drop-shadow">
            Welcome back, <span className="font-bold text-blue-200">Innovator</span>
          </h2>
          <p key={quoteIndex} className="mt-1 text-sm sm:text-base text-white/90 font-light animate-fade-in drop-shadow">
            {quotes[quoteIndex]}
          </p>
        </div>

        {/* CTA */}
        <div className="relative z-10 flex flex-col gap-3 items-start sm:items-end text-sm text-white/80 font-inter">
          <button className="px-3 py-1.5 text-sm rounded-md font-medium flex items-center gap-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-blue-500/50">
            Explore Training Hub <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
