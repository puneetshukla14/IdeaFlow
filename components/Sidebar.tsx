"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import SidebarWrapper from "@/components/SidebarWrapper";
import Logo from "@/components/Logo";
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
  const [expanded, setExpanded] = useState<string[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleExpand = (name: string) => {
    setExpanded((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    setMobileOpen(false);
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      router.push("/sign-in");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const isParentActive = (section: MenuItem) => {
    if (section.path && pathname === section.path) return true;
    if (section.children) {
      return section.children.some((child) => pathname.startsWith(child.path));
    }
    return false;
  };

  const isChildActive = (path: string) => pathname === path;

  const menuSections: MenuItem[] = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    {
      name: "Create New",
      icon: PenTool,
      children: [
        { name: "Research Paper", path: "/create/paper" },
        { name: "Dataset Project", path: "/create/dataset" },
        { name: "Code / Tool", path: "/create/code" },
        { name: "Collab Proposal", path: "/create/collaboration" },
      ],
    },
    {
      name: "My Research",
      icon: BookOpen,
      children: [
        { name: "My Papers", path: "/my-research/papers" },
        { name: "My Datasets", path: "/my-research/datasets" },
        { name: "My Tools", path: "/my-research/code" },
        { name: "Drafts", path: "/my-research/drafts" },
        { name: "Citations", path: "/my-research/citations" },
        { name: "Invites", path: "/my-research/invitations" },
      ],
    },
    {
      name: "Discover Research",
      icon: Globe,
      children: [
        { name: "Trending", path: "/discover/trending" },
        { name: "New", path: "/discover/new" },
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
        { name: "New Thread", path: "/community/new-thread" },
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
    <SidebarWrapper>
      {/* Header */}
<div className="p-5 border-b border-gray-800 bg-[#111214]/90 sticky top-0 z-10 backdrop-blur-sm">
  <Logo />
</div>

      {/* Menu */}
      <nav className="flex-1 px-3 py-5 overflow-y-auto custom-scroll">
        {menuSections.map((section) => {
          const Icon = section.icon;
          const parentActive = isParentActive(section);
          const isExpanded = expanded.includes(section.name) || parentActive;

          return (
            <div key={section.name}>
              <button
                onClick={() =>
                  section.children
                    ? toggleExpand(section.name)
                    : handleNavigation(section.path!)
                }
                className={`flex items-center justify-between w-full px-4 py-2.5 text-sm rounded-lg transition-colors duration-200 ${
                  parentActive
                    ? "bg-blue-600/90 text-white shadow-md"
                    : "text-gray-400 hover:bg-[#1a1b1f]/80 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    size={18}
                    className={parentActive ? "text-white" : "text-blue-400"}
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
                  className={`ml-6 mt-2 space-y-1 overflow-hidden transition-all duration-300 ${
                    isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  {section.children.map((child) => (
                    <button
                      key={child.path}
                      onClick={() => handleNavigation(child.path)}
                      className={`flex items-center w-full px-3 py-1.5 text-sm rounded-md transition-colors duration-200 text-left ${
                        isChildActive(child.path)
                          ? "bg-blue-500/80 text-white"
                          : "text-gray-500 hover:bg-[#1a1b1f]/80 hover:text-white"
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
      <div className="p-4 border-t border-gray-800 bg-[#0d0f13]/90 backdrop-blur-sm">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-2 text-sm text-red-400 rounded-md hover:bg-red-900/30 transition-colors duration-200"
        >
          <LogOut size={18} className="mr-3" />
          Logout
        </button>
      </div>
    </SidebarWrapper>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 bg-[#111214]/80 rounded-md border border-gray-800 text-white backdrop-blur-sm hover:bg-[#1a1b1f]/80 transition"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">{SidebarContent}</div>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div className="w-64 bg-[#0e0f12]/90 backdrop-blur-md shadow-lg">
            {SidebarContent}
          </div>
          <div
            className="flex-1 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          ></div>
        </div>
      )}

      {/* Scrollbar */}
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
