"use client";

import { usePathname } from "next/navigation";
import SidebarWrapper from "./SidebarWrapper";
import Sidebar from "./Sidebar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const noSidebarPaths = ["/sign-in", "/sign-up", "/setup-profile"];
  const showSidebar = !noSidebarPaths.includes(pathname);

  return (
    <>
      {showSidebar && (
        <SidebarWrapper>
          <Sidebar />
        </SidebarWrapper>
      )}
      <main className={showSidebar ? "ml-64 flex-1 p-6 overflow-y-auto" : "flex-1 p-6 overflow-y-auto"}>
        {children}
      </main>
    </>
  );
}
