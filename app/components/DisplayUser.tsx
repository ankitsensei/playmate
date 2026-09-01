"use client";
import Image from "next/image";
import { useSession } from "next-auth/react";
import SignInButton from "@/app/components/SignInButton";
import Link from "next/link";

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (session) {
    return (
      <div className="flex items-center">
        <Link href={"/dashboard"}>
          <Image
            src={session.user?.image ?? "/default-avatar.png"}
            alt="dp"
            width={100}
            height={100}
            className="w-13 rounded-full"
          />
        </Link>
      </div>
    );
  }

  return <SignInButton />;
}
