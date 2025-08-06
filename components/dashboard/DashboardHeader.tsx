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
  X,
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
        bg-white/40 backdrop-blur-xl
        px-4 py-2 rounded-xl
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
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    // Show shortcut hint only on first load
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
          bg-white/70 backdrop-blur-md
          rounded-xl px-3 py-2 w-80
          ring-2 ring-blue-400/60 shadow-inner
          border border-gray-200/50
          transition-all duration-300 ease-in-out
          hover:bg-white/90 hover:shadow-lg
          hover:ring-blue-400 focus-within:ring-blue-500
          animate-[pulseGlow_3s_ease-in-out_infinite]
        "
      >
        <Search size={18} className="text-gray-500 mr-2" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search research, papers, datasets..."
          className="
            bg-transparent outline-none
            text-[15px] font-medium w-full
            placeholder-gray-500 placeholder-opacity-80
            focus:placeholder-opacity-50
          "
        />
        <kbd
          className="
            ml-2 text-[10px] px-1.5 py-0.5 rounded
            bg-gray-200/80 text-gray-600 border border-gray-300
          "
        >
          /
        </kbd>
      </div>

      {/* Search shortcut hint */}
      {showHint && (
        <div className="absolute top-full mt-2 text-xs bg-black text-white px-2 py-1 rounded shadow-lg animate-fade-in">
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
  badgeCount?: number;
  items: { icon: React.ReactNode; label: string }[];
}

function HoverDropdown({ title, icon, badgeCount, items }: HoverDropdownProps) {
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
interface IconButtonProps {
  title: string;
  icon: React.ReactNode;
  badgeCount?: number;
  onClick?: () => void;
}

function IconButton({ title, icon, badgeCount, onClick }: IconButtonProps) {
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
        {/* Online status */}
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
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
      className={`flex items-center px-4 py-2 text-sm w-full transition-all duration-200 ${
        danger
          ? "text-red-600 hover:bg-red-50"
          : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
      } hover:scale-[1.02]`}
    >
      <span className="transition-transform duration-200 group-hover:scale-110">{icon}</span>
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
    "The world is waiting for your ideas."
  ];

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % greetings.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="relative overflow-hidden rounded-xl shadow-md border border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-purple-800/50 to-indigo-900/50" />

        {/* Orbs */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500/20 blur-3xl rounded-full animate-pulse-slow" />
        <div className="absolute top-1/2 -right-20 w-72 h-72 bg-purple-500/20 blur-3xl rounded-full animate-pulse-slow delay-1000" />

        <div
          className="
            relative z-10 backdrop-blur-xl
            p-4 sm:p-5 flex flex-col sm:flex-row
            items-start sm:items-center justify-between
          "
        >
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white drop-shadow-lg">
              Welcome back, <span className="text-blue-300">Researcher</span>
            </h2>
            <p
              key={quoteIndex}
              className="mt-1 text-sm sm:text-base text-white/90 font-light transition-all duration-700 ease-in-out animate-fade-in drop-shadow"
            >
              {greetings[quoteIndex]}
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="
              relative z-10 mt-3 sm:mt-0 px-3 py-1.5 rounded-md
              font-medium flex items-center gap-1.5 text-sm
              bg-gradient-to-r from-blue-600 to-indigo-600
              text-white shadow-md shadow-blue-900/30
              hover:shadow-lg hover:shadow-blue-800/40 hover:scale-[1.02]
              transition-all duration-300
            "
          >
            View Trends <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999]"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-lg shadow-xl p-6 w-[400px] max-w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-3">Global Trends</h3>
            <p className="text-gray-600">
              Here you could preview trending research topics without leaving the dashboard.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
