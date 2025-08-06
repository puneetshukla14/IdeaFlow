"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Globe,
  BookOpen,
  FileText,
  Database,
  Code,
  Users,
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
  Lightbulb,
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
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },

    // CREATION HUB
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

    // MANAGE MY WORK
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

    // DISCOVERY
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

    // COMMUNITY & EVENTS
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

    // TOOLS
    {
      name: "Datasets & Tools",
      icon: Database,
      children: [
        { name: "Public Datasets", path: "/datasets/public" },
        { name: "Analysis Tools", path: "/datasets/tools" },
      ],
    },

    // DIRECT LINKS
    {
      name: "Notifications",
      icon: Bell,
      path: "/notifications",
    },
    {
      name: "Messages",
      icon: Mail,
      path: "/messages",
    },
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
    <div className="h-screen w-64 flex flex-col border-r border-gray-800 bg-gradient-to-b from-[#0a0f1f] via-[#0d162b] to-[#05070d] text-white shadow-2xl">
      {/* Logo */}
      <div className="p-5 border-b border-gray-800 bg-white/5 backdrop-blur-md sticky top-0 z-10">
        <h1 className="text-2xl font-extrabold tracking-tight text-blue-400">
          ResearchHub
        </h1>
        <p className="text-xs text-gray-400">Global Research Network</p>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-3 py-5 space-y-2 overflow-y-auto custom-scroll">
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
                className={`flex items-center justify-between w-full px-4 py-2.5 text-sm rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md"
                    : "text-gray-300 hover:bg-blue-500/20 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={20} className="text-blue-400" />
                  {section.name}
                </div>
                {section.children &&
                  (isExpanded ? (
                    <ChevronDown size={16} className="text-gray-400" />
                  ) : (
                    <ChevronRight size={16} className="text-gray-400" />
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
                      className={`flex items-center w-full px-3 py-1.5 text-sm rounded-lg transition-all duration-300 ${
                        active === child.path
                          ? "bg-blue-500/80 text-white"
                          : "text-gray-400 hover:bg-blue-500/20 hover:text-white"
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
      <div className="p-4 border-t border-gray-800 bg-white/5 backdrop-blur-md sticky bottom-0">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-2 text-sm text-red-400 rounded-lg hover:bg-red-900/30 transition-all duration-300"
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
          className="p-2 bg-gray-900/80 rounded-lg border border-gray-700 text-white"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      <div className="hidden lg:block">{SidebarContent}</div>

      {/* Mobile Sidebar Overlay */}
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
