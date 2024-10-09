import type { Metadata } from "next";

import SidebarLayout from "@/components/client-sidebar";

export const metadata: Metadata = {
  title: "NIT Client",
  description: "Client dashboard for NIT",
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
