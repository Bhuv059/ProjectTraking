"use client";

import Link from "next/link";
import { BarChart3, Briefcase } from "lucide-react";

interface SidebarProps {
  sidebarOpen: boolean;
}

export default function Sidebar({ sidebarOpen }: SidebarProps) {
  return (
    <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
      <div className="sidebar-inner">
        <div className="sidebar-header">
          <h1>ProjectTracker</h1>
        </div>

        <nav className="sidebar-nav">
          <div className="sidebar-links">
            <Link href="/dashboard" className="sidebar-link">
              <BarChart3 />
              Dashboard
            </Link>

            <Link href="/projects" className="sidebar-link">
              <Briefcase />
              Projects
            </Link>
          </div>
        </nav>
      </div>
    </aside>
  );
}
