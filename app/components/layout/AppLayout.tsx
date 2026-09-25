"use client";

import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="app-layout-container">
      <Sidebar sidebarOpen={sidebarOpen} />

      <div className={`min-h-screen transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-0"}`}>
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="container">
          <div className="container-inner-div">{children}</div>
        </main>
      </div>
    </div>
  );
}
