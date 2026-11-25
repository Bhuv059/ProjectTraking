"use client";

import Image from "next/image";
import LogoutButton from "../auth/LogoutButton";
import Link from "next/link";

interface HeaderProps {
  onMenuClick: () => void;
  userName?: string | null;
  userImage?: string | null;
}

export default function Header({ onMenuClick, userName, userImage }: HeaderProps) {
  return (
    <header className="header">
      <div className="logo">
        <div>
          <button type="button" onClick={onMenuClick} className="cursor-pointer">
            ☰
          </button>
        </div>
        <Link className="logo" href="/dashboard">
          <Image src="/images/logo_icon.png" alt="ProjectTracker" width={45} height={45} className="object-contain " />
          <h1>ProjectTracker</h1>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="font-light text-white">{userName?.slice(0, 4).toUpperCase() || "User"}</p>
        </div>

        {userImage ? (
          <Image
            src={userImage}
            alt={userName?.toUpperCase() || "User"}
            width={40}
            height={40}
            className="rounded-full"
          />
        ) : (
          <div className="user-avatar"> {userName?.toUpperCase() || "USER"}</div>
        )}

        <LogoutButton />
      </div>
    </header>
  );
}
