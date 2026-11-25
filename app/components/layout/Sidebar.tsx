"use client";

import Link from "next/link";
import { BarChart3, Briefcase } from "lucide-react";
import Image from "next/image";
interface SidebarProps {
  sidebarOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ sidebarOpen, onClose }: SidebarProps) {
  return (
    <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
      <div className="sidebar-inner">
        <div className="sidebar-header">
          <Image src="/images/logo_icon.png" alt="ProjectTracker" width={45} height={45} className="object-contain" />

          <h1>ProjectTracker</h1>
        </div>

        <nav className="sidebar-nav">
          <div className="sidebar-links">
            <Link href="/dashboard" className="sidebar-link" onClick={onClose}>
              <BarChart3 />
              Dashboard
            </Link>

            <Link href="/projects" className="sidebar-link" onClick={onClose}>
              <Briefcase />
              Projects
            </Link>
          </div>
        </nav>
      </div>
    </aside>
  );
}
