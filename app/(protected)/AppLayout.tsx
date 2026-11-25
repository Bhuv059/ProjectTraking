"use client";
import { useState, useEffect } from "react";

import Header from "@/app/components/layout/Header";
import Sidebar from "@/app/components/layout/Sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
  userName?: string | null;
  userImage?: string | null;
}

export default function AppLayout({ children, userName, userImage }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 1024);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="app-layout-container">
      <Sidebar sidebarOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className={`min-h-screen transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-0"}`}>
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} userName={userName} userImage={userImage} />

        <main className="container">
          <div className="container-inner-div">{children}</div>
        </main>
      </div>
    </div>
  );
}
