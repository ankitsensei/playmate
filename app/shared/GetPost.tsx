import Image from "next/image";
import Link from "next/link";
import { getPosts } from "@/app/shared/FirebaseConfig";

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
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="mb-6 text-6xl">🏟️</div>
      <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
        No posts yet
      </h2>
      <p className="max-w-sm text-gray-500 dark:text-gray-400">
        Be the first to share a game or activity in your area. Check back soon
        for updates!
      </p>
    </div>
  );
}

export default async function Home() {
  const posts = await getPosts();

  if (!posts.length) {
    return (
      <main className="w-full px-0 py-8">
        <EmptyState />
      </main>
    );
  }

  return (
    <main className="w-full px-0 py-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => {
          const formattedDate = formatDate(post.date);

          return (
            <article
              key={post.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900 dark:hover:shadow-xl dark:hover:shadow-blue-500/5"
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
                  <span className="absolute left-3 top-3 z-10 inline-flex items-center rounded-full bg-blue-600/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm dark:bg-blue-500/90">
                    {post.game}
                  </span>
                )}
              </Link>

              {/* Content */}
              <div className="flex flex-1 flex-col p-4 sm:p-5">
                {/* Title */}
                <Link href={`/posts/${post.id}`}>
                  <h2 className="mb-2 line-clamp-2 text-lg font-bold tracking-tight text-gray-900 transition-colors duration-200 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 sm:text-xl">
                    {post.title}
                  </h2>
                </Link>

                {/* Description */}
                <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {post.desc}
                </p>

                {/* Meta information */}
                <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
                  {formattedDate && (
                    <span className="inline-flex items-center gap-1.5">
                      <svg
                        className="h-3.5 w-3.5 shrink-0"
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
                    <span className="inline-flex items-center gap-1.5">
                      <svg
                        className="h-3.5 w-3.5 shrink-0"
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

                {/* Read More */}
                <Link
                  href={`/posts/${post.id}`}
                  className="mt-auto inline-flex w-fit items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-blue-500 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
                >
                  Read more
                  <svg
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}
