import type { Metadata } from "next";

import SidebarLayout, { MountainIcon } from "@/components/admin-sidebar";

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
      <SidebarLayout
        links={[
          { href: "/admin", icon: MountainIcon, label: "Dashboard" },
          { href: "/admin/users", icon: MountainIcon, label: "Users" },
          { href: "/admin/posts", icon: MountainIcon, label: "Posts" },
        ]}
      >
        {children}
      </SidebarLayout>
    </div>
  );
}
