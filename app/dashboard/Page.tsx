import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";
import { IoMdLogOut } from "react-icons/io";
import { IoCreate, IoDocuments } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return (
    <main className="min-h-[calc(100vh-120px)] px-4 py-10">
      <div className="mx-auto max-w-2xl space-y-8">
        {/* Profile Card */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-8">
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
            {/* Avatar */}
            {session.user?.image ? (
              <Image
                src={session.user.image}
                alt={session.user.name || "User avatar"}
                width={96}
                height={96}
                className="h-20 w-20 rounded-full object-cover ring-4 ring-gray-100 dark:ring-gray-800 sm:h-24 sm:w-24"
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-3xl font-bold text-white sm:h-24 sm:w-24">
                {session.user?.name?.charAt(0) || "U"}
              </div>
            )}

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-2xl">
                {session.user?.name}
              </h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {session.user?.email}
              </p>
              <p className="mt-3 text-xs text-gray-400 dark:text-gray-500">
                Manage your posts and account from here.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            href="/create-post"
            className="group flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:shadow-lg dark:hover:shadow-blue-500/5"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white transition-colors group-hover:bg-blue-500">
              <IoCreate className="text-xl" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900 dark:text-white">
                Create Post
              </h2>
              <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                Share a new game or activity
              </p>
            </div>
          </Link>

          <Link
            href="/dashboard/myposts"
            className="group flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:shadow-lg dark:hover:shadow-blue-500/5"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-white transition-colors group-hover:bg-emerald-500">
              <IoDocuments className="text-xl" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900 dark:text-white">
                My Posts
              </h2>
              <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                View and manage your posts
              </p>
            </div>
          </Link>
        </section>

        {/* Logout */}
        <section>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-red-900 dark:hover:bg-red-950 dark:hover:text-red-400"
            >
              <IoMdLogOut className="text-base" />
              Logout
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
