"use client";

import { useEffect, useState } from "react";
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
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  PenTool,
} from "lucide-react";
import { getCurrentUser } from "@/lib/getCurrentUser";
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
  const [trialInfo, setTrialInfo] = useState<string | null>(null);
  useEffect(() => {
    (async () => {
      const user = await getCurrentUser();

      if (user?.isPremium && user?.premiumExpiresAt) {
        const expiresAt = new Date(user.premiumExpiresAt);
        const now = new Date();
        const diff = Math.ceil((expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

        if (diff > 0) {
          setTrialInfo(`${diff} day${diff !== 1 ? "s" : ""} left in free trial`);
        } else {
          setTrialInfo("Trial expired");
        }
      }
    })();
  }, []);
  const toggleExpand = (name: string) => {
    setExpanded((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    setMobileOpen(false);
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
      <div className="p-5 border-b border-gray-800 bg-[#111214]/90 sticky top-0 z-10 backdrop-blur-sm">
        <Logo />
      </div>

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
                className={`flex items-center justify-between w-full px-4 py-2.5 text-sm rounded-lg transition-colors duration-200 focus:outline-none ${
                  parentActive
                    ? "bg-[#1f1f22] text-white"
                    : "text-gray-400 hover:bg-[#1a1b1f] hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    size={18}
                    className={parentActive ? "text-white" : "text-gray-400"}
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
                          ? "bg-[#2a2a2e] text-white"
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

      <div className="p-4 border-t border-gray-800 bg-[#0d0f13]/90 backdrop-blur-sm">
        <div className="flex flex-col items-center text-center">
          <span className="text-[10px] text-zinc-600">v1.8.25</span>
          {trialInfo && (
            <span
              className={`mt-1 text-[11px] font-medium ${
                trialInfo.includes("expired")
                  ? "text-yellow-500/80"
                  : "text-emerald-400/90"
              }`}
            > 
              {trialInfo}    
            </span>  
          )}     
        </div>     
      </div>      
    </SidebarWrapper>  
  );       
     
  return ( 
    <>  
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 bg-[#111214]/80 rounded-md border border-gray-800 text-white backdrop-blur-sm hover:bg-[#1a1b1f] transition"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div className="hidden lg:block">{SidebarContent}</div>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div className="w-64 bg-[#0e0f12]/90 backdrop-blur-md shadow-lg">
            {SidebarContent}
          </div>
          <div
            className="flex-1 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
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
