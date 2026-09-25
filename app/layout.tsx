import type { Metadata } from "next";
import "@/app/styles/globals.css";

import AppLayout from "@/app/components/layout/AppLayout";

export const metadata: Metadata = {
  title: "ProjectTracker",
  description: "Project management dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
