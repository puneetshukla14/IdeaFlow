import "./globals.css";

import ClientLayout from "@/components/ClientLayout";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="text-white min-h-screen flex">

        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
