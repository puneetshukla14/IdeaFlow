"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Globe,
  BookOpen,
  Database,
  MessageSquare,
  CalendarDays,
  Bell,
  Mail,
  User,
  LogOut,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  PenTool,
} from "lucide-react";

interface MenuItem {
  name: string;
  icon: any;
  path?: string;
  children?: { name: string; path: string }[];
}

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [active, setActive] = useState(pathname || "/dashboard");
  const [expanded, setExpanded] = useState<string[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleExpand = (name: string) => {
    setExpanded((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const handleNavigation = (path: string) => {
    setActive(path);
    router.push(path);
    setMobileOpen(false);
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
      router.push("/sign-in");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const menuSections: MenuItem[] = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    {
      name: "Create New",
      icon: PenTool,
      children: [
        { name: "Research Paper", path: "/create/paper" },
        { name: "Dataset Project", path: "/create/dataset" },
        { name: "Code / Tool Project", path: "/create/code" },
        { name: "Collaboration Proposal", path: "/create/collaboration" },
      ],
    },
    {
      name: "My Research",
      icon: BookOpen,
      children: [
        { name: "My Papers", path: "/my-research/papers" },
        { name: "My Datasets", path: "/my-research/datasets" },
        { name: "My Code & Tools", path: "/my-research/code" },
        { name: "Drafts", path: "/my-research/drafts" },
        { name: "Citations", path: "/my-research/citations" },
        { name: "Collaboration Invites", path: "/my-research/invitations" },
      ],
    },
    {
      name: "Discover Research",
      icon: Globe,
      children: [
        { name: "Trending Papers", path: "/discover/trending" },
        { name: "New Submissions", path: "/discover/new" },
        { name: "By Field", path: "/discover/fields" },
        { name: "Open Access", path: "/discover/open-access" },
      ],
    },
    {
      name: "Community",
      icon: MessageSquare,
      children: [
        { name: "All Discussions", path: "/community/discussions" },
        { name: "My Threads", path: "/community/my-threads" },
        { name: "Start New Thread", path: "/community/new-thread" },
      ],
    },
    {
      name: "Global Conferences",
      icon: CalendarDays,
      children: [
        { name: "Upcoming", path: "/conferences/upcoming" },
        { name: "Past", path: "/conferences/past" },
        { name: "Submit Proposal", path: "/conferences/submit" },
      ],
    },
    {
      name: "Datasets & Tools",
      icon: Database,
      children: [
        { name: "Public Datasets", path: "/datasets/public" },
        { name: "Analysis Tools", path: "/datasets/tools" },
      ],
    },
    { name: "Notifications", icon: Bell, path: "/notifications" },
    { name: "Messages", icon: Mail, path: "/messages" },
    {
      name: "Profile & Settings",
      icon: User,
      children: [
        { name: "My Profile", path: "/profile" },
        { name: "Account Settings", path: "/settings/account" },
        { name: "Privacy", path: "/settings/privacy" },
      ],
    },
  ];

  const SidebarContent = (
    <div className="h-screen w-64 flex flex-col bg-[#0e0f12] border-r border-gray-800 shadow-xl">
      {/* Logo */}
      <div className="p-5 border-b border-gray-800 bg-gradient-to-r from-[#111214] to-[#0d0f13] sticky top-0 z-10">
        <h1 className="text-2xl font-bold tracking-tight text-blue-400">
          ResearchHub
        </h1>
        <p className="text-xs text-gray-500">Global Research Network</p>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto custom-scroll">
        {menuSections.map((section) => {
          const Icon = section.icon;
          const isExpanded = expanded.includes(section.name);
          const isActive = active === section.path;

          return (
            <div key={section.name}>
              <button
                onClick={() =>
                  section.children
                    ? toggleExpand(section.name)
                    : handleNavigation(section.path!)
                }
                className={`flex items-center justify-between w-full px-4 py-2.5 text-sm rounded-md transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-900/40"
                    : "text-gray-400 hover:bg-[#1a1b1f] hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    size={18}
                    className={isActive ? "text-white" : "text-blue-400"}
                  />
                  {section.name}
                </div>
                {section.children &&
                  (isExpanded ? (
                    <ChevronDown size={16} className="text-gray-500" />
                  ) : (
                    <ChevronRight size={16} className="text-gray-500" />
                  ))}
              </button>

              {/* Sub-menu */}
              {section.children && (
                <div
                  className={`ml-6 mt-1 space-y-1 transition-all duration-300 overflow-hidden ${
                    isExpanded ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  {section.children.map((child) => (
                    <button
                      key={child.path}
                      onClick={() => handleNavigation(child.path)}
                      className={`flex items-center w-full px-3 py-1.5 text-sm rounded-md transition-all duration-200 ${
                        active === child.path
                          ? "bg-blue-500/80 text-white"
                          : "text-gray-500 hover:bg-[#1a1b1f] hover:text-white"
                      }`}
                    >
                      {child.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-800 bg-[#0d0f13]">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-2 text-sm text-red-400 rounded-md hover:bg-red-900/30 transition-all duration-200"
        >
          <LogOut size={18} className="mr-3" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 bg-[#111214] rounded-md border border-gray-800 text-white"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">{SidebarContent}</div>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div
            className="transform transition-transform duration-300 translate-x-0"
            style={{ minWidth: "256px" }}
          >
            {SidebarContent}
          </div>
          <div
            className="flex-1 bg-black/50"
            onClick={() => setMobileOpen(false)}
          ></div>
        </div>
      )}

      <style jsx global>{`
        .custom-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background-color: rgba(100, 116, 139, 0.5);
          border-radius: 9999px;
        }
      `}</style>
    </>
  );
}
