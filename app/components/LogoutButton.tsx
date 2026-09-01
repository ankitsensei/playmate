"use client";
import { signOut } from "next-auth/react";
import { IoMdLogOut } from "react-icons/io";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-red-900 dark:hover:bg-red-950 dark:hover:text-red-400"
    >
      <IoMdLogOut className="text-base" />
      Logout
    </button>
  );
}
