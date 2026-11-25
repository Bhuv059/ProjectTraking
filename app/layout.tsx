import type { Metadata } from "next";
import "@/app/styles/globals.css";
import ToastProvider from "@/app/components/ui/ToastProvider";

export const metadata: Metadata = {
  title: "ProjectTracker",
  description: "Project management dashboard",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ToastProvider />
        {children}
      </body>
    </html>
  );
}
