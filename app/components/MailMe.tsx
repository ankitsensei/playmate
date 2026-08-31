"use client";
import Image from "next/image";
import { useSession } from "next-auth/react";

const MailMe = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center gap-2 w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 dark:border-gray-700 dark:bg-gray-800">
        <div className="h-5 w-5 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
        <div className="h-3 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="flex items-center gap-2.5 w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-750">
      <Image
        src={session.user?.image ?? "/default-avatar.png"}
        alt="User avatar"
        width={20}
        height={20}
        className="h-6 w-6 shrink-0 rounded-full object-cover"
      />
      <a
        href={`mailto:${session.user?.email}`}
        className="truncate text-xs text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 sm:text-sm"
      >
        {session.user?.email}
      </a>
    </div>
  );
};

export default MailMe;
