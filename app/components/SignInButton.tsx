"use client";

import { signIn } from "next-auth/react";
import { GoSignIn } from "react-icons/go";

export default function SingInButton() {
  return (
    <button
      onClick={() => signIn("google")}
      className="px-3 py-2 rounded-full hover:bg-zinc-800 flex items-center gap-2"
    >
      <span className="hidden md:block">SIGNIN</span> <GoSignIn />
    </button>
  );
}
