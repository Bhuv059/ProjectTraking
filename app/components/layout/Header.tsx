"use client";

import Image from "next/image";
interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="header">
      <div className="logo">
        <button onClick={onMenuClick} className="toggle-menu" aria-label="Toggle menu">
          ☰
        </button>

        <Image
          src="/images/logo.png"
          alt="Logo"
          width={120}
          height={32}
          className="h-10"
          style={{ width: "auto" }}
          priority
        />
      </div>

      <div className="user-data">
        <span className="user-text">Welcome back</span>

        <div className="user-avatar">B</div>
      </div>
    </header>
  );
}
