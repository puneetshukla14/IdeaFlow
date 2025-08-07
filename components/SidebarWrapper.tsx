"use client";

import { ReactNode } from "react";

export default function SidebarWrapper({ children }: { children: ReactNode }) {
  return (
    <aside
      className="
        fixed
        top-0
        left-0
        h-screen
        w-64
        flex
        flex-col
        text-sm
        bg-[#0d0f13]/70
        border-r
        border-gray-800
        backdrop-blur-md
        shadow-md
        text-white
        overflow-y-auto
        z-40
      "
    >
      {children}
    </aside>
  );
}
