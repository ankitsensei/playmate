"use client";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import SignInButton from "@/app/components/SignInButton";
import { IoMdLogOut } from "react-icons/io";

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (session) {
    return (
      <div className="flex items-center">
        <button
          onClick={() => signOut()}
          className="px-3 py-2 rounded-full hover:bg-zinc-800 flex items-center gap-2"
        >
          <span className="hidden md:block">Logout</span> <IoMdLogOut />
        </button>
        <Image
          src={session.user?.image ?? "/default-avatar.png"}
          alt="dp"
          width={100}
          height={100}
          className="w-13"
        />
      </div>
    );
  }

  return <SignInButton />;
}
