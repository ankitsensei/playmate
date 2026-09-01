import Image from "next/image";
import Link from "next/link";
import { getPosts } from "@/app/shared/FirebaseConfig";
import MailMe from "../components/MailMe";

function formatDate(dateValue: unknown): string {
  try {
    const d =
      typeof dateValue === "string"
        ? new Date(dateValue)
        : dateValue && typeof dateValue === "object" && "toDate" in dateValue
          ? (dateValue as { toDate: () => Date }).toDate()
          : new Date(String(dateValue));

    if (isNaN(d.getTime())) return "";

    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center sm:py-20 lg:py-24">
      <div className="mb-4 text-5xl sm:mb-6 sm:text-6xl lg:text-7xl">🏟️</div>
      <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white sm:text-xl lg:text-2xl">
        No posts yet
      </h2>
      <p className="max-w-sm px-4 text-sm text-gray-500 dark:text-gray-400 sm:text-base">
        Be the first to share a game or activity in your area. Check back soon
        for updates!
      </p>
    </div>
  );
}

export default async function GetPost({ game }: { game?: string }) {
  const posts = await getPosts(game);

  if (!posts.length) {
    return (
      <main className="w-full py-8">
        <EmptyState />
      </main>
    );
  }

  return (
    <main className="w-full py-4 sm:py-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {posts.map((post) => {
          const formattedDate = formatDate(post.date);

          return (
            <article
              key={post.id}
              className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:rounded-2xl dark:border-gray-800 dark:bg-gray-900 dark:hover:shadow-xl dark:hover:shadow-blue-500/5"
            >
              {/* Image */}
              <Link
                href={`/posts/${post.id}`}
                className="relative block aspect-video overflow-hidden"
                aria-label={`View post: ${post.title}`}
              >
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Gradient overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Game badge */}
                {post.game && (
                  <span className="absolute left-2 top-2 z-10 inline-flex items-center rounded-full bg-blue-600/90 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm sm:left-3 sm:top-3 sm:px-3 sm:py-1 sm:text-xs dark:bg-blue-500/90">
                    {post.game}
                  </span>
                )}
              </Link>

              {/* Content */}
              <div className="flex flex-1 flex-col p-3 sm:p-4 lg:p-5">
                {/* Title */}
                <Link href={`/posts/${post.id}`}>
                  <h2 className="mb-1.5 line-clamp-2 text-base font-bold tracking-tight text-gray-900 transition-colors duration-200 group-hover:text-blue-600 sm:mb-2 sm:text-lg lg:text-xl dark:text-white dark:group-hover:text-blue-400">
                    {post.title}
                  </h2>
                </Link>

                {/* Description */}
                <p className="mb-3 line-clamp-3 text-xs leading-relaxed text-gray-600 sm:mb-4 sm:text-sm lg:text-sm dark:text-gray-400">
                  {post.desc}
                </p>

                {/* Meta information */}
                <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-gray-500 sm:mb-4 sm:gap-x-4 sm:text-xs dark:text-gray-400">
                  {formattedDate && (
                    <span className="inline-flex items-center gap-1 sm:gap-1.5">
                      <svg
                        className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                        />
                      </svg>
                      <time>{formattedDate}</time>
                    </span>
                  )}

                  {post.location && (
                    <span className="inline-flex items-center gap-1 sm:gap-1.5">
                      <svg
                        className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                        />
                      </svg>
                      <span className="line-clamp-1">{post.location}</span>
                    </span>
                  )}
                </div>

                {/* MailMe */}
                <div className="mt-auto">
                  {/* <MailMe /> */}
                  <a
                    href={`mailto:${post.postedBy}`}
                    className="truncate text-xs text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 sm:text-sm"
                  >
                    {post.postedBy}
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}
