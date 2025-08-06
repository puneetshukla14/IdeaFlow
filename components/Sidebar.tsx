"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Globe,
  BookOpen,
  Users,
  MessageSquare,
  CalendarDays,
  Database,
  Bell,
  Mail,
  User,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
  Menu,
  X
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
      children: [
        { name: "Overview", path: "/dashboard" },
        { name: "Recent Activity", path: "/dashboard/activity" },
        { name: "Statistics", path: "/dashboard/stats" },
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
      name: "My Research",
      icon: BookOpen,
      children: [
        { name: "My Papers", path: "/my-research/papers" },
        { name: "Drafts", path: "/my-research/drafts" },
        { name: "Citations", path: "/my-research/citations" },
        { name: "Upload New", path: "/my-research/upload" },
      ],
    },
    {
      name: "Collaborations",
      icon: Users,
      children: [
        { name: "My Collaborators", path: "/collaborations" },
        { name: "Find Researchers", path: "/collaborations/find" },
        { name: "Invitations", path: "/collaborations/invitations" },
      ],
    },
    {
      name: "Community Discussions",
      icon: MessageSquare,
      children: [
        { name: "All Discussions", path: "/discussions" },
        { name: "My Threads", path: "/discussions/my-threads" },
        { name: "Start New Thread", path: "/discussions/new" },
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
        { name: "Upload Dataset", path: "/datasets/upload" },
      ],
    },
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
    <div className="h-screen w-64 bg-gradient-to-b from-blue-950 via-gray-900 to-black text-white flex flex-col border-r border-gray-800">
      {/* Logo */}
      <div className="p-5 border-b border-gray-800 text-center">
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
                  section.children ? toggleExpand(section.name) : handleNavigation(section.path!)
                }
                className={`flex items-center justify-between w-full px-4 py-2 text-sm rounded-xl transition-all ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <div className="flex items-center">
                  <Icon size={18} className="mr-3" />
                  {section.name}
                </div>
                {section.children &&
                  (isExpanded ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  ))}
              </button>

              {/* Sub-menu */}
              {section.children && isExpanded && (
                <div className="ml-6 mt-1 space-y-1">
                  {section.children.map((child) => (
                    <button
                      key={child.path}
                      onClick={() => handleNavigation(child.path)}
                      className={`flex items-center w-full px-3 py-1.5 text-sm rounded-lg transition-all ${
                        active === child.path
                          ? "bg-blue-500 text-white shadow-sm"
                          : "text-gray-400 hover:bg-gray-700 hover:text-white"
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
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-2 text-sm text-red-400 rounded-xl hover:bg-red-900/40 transition-all"
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
          <div>{SidebarContent}</div>
          <div
            className="flex-1 bg-black/50"
            onClick={() => setMobileOpen(false)}
          ></div>
        </div>
      )}
    </>
  );
}
