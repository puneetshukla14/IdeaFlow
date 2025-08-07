import "./globals.css";
import SidebarWrapper from "@/components/SidebarWrapper";
import Sidebar from "@/components/Sidebar";
import ClientLayout from "@/components/ClientLayout";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0e0f12] text-white min-h-screen flex">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
