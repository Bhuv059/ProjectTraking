"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ redirectTo: "/login" })}
      aria-label="Logout"
      title="Logout"
      className=" flex h-10 w-10 items-center justify-center text-red-500 bg-[#1b1026]  hover:bg-teal-600 rounded-full "
    >
      <LogOut size={20} strokeWidth={2} />
    </button>
  );
}
