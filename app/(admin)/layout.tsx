import type { Metadata } from "next";

import SidebarLayout from "@/components/admin-sidebar";

export const metadata: Metadata = {
  title: "NIT Admin",
  description: "Admin dashboard for NIT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-full">
      <SidebarLayout>{children}</SidebarLayout>
    </div>
  );
}
