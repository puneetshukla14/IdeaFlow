import "./globals.css";
import SidebarWrapper from "@/components/SidebarWrapper";
import Sidebar from "@/components/Sidebar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0e0f12] text-white min-h-screen flex">
        <SidebarWrapper>
          <Sidebar />
        </SidebarWrapper>
<main className="ml-64 flex-1 p-6 overflow-y-auto">{children}</main>

      </body>
    </html>
  );
}
