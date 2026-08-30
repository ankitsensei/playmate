import Image from "next/image";
import Link from "next/link";
import { getPosts } from "@/app/shared/FirebaseConfig";

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8 dark:bg-gray-950">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.id}
            className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
          >
            {/* Image */}
            <Link
              href={`/posts/${post.id}`}
              className="relative block aspect-video overflow-hidden"
            >
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
              />

              {/* Image overlay */}
              <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/10" />
            </Link>

            {/* Content */}
            <div className="flex flex-1 flex-col p-5 sm:p-6">
              {/* Title */}
              <Link href={`/posts/${post.id}`}>
                <h2 className="mb-3 line-clamp-2 text-xl font-bold tracking-tight text-gray-900 transition-colors duration-200 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 sm:text-2xl">
                  {post.title}
                </h2>
              </Link>

              {/* Description */}
              <p className="mb-5 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-400 sm:text-base">
                {post.desc}
              </p>

              {/* Meta information */}
              <div className="mb-6 space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <p className="flex items-center gap-2">
                  <span>📅</span>
                  <span>
                    {(typeof post.date === "string"
                      ? new Date(post.date)
                      : post.date.toDate()
                    ).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </p>

                <p className="flex items-center gap-2">
                  <span>📍</span>
                  <span className="line-clamp-1">{post.location}</span>
                </p>
              </div>

              {/* Read More */}
              <Link
                href={`/posts/${post.id}`}
                className="mt-auto inline-flex w-fit items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
              >
                Read more
                <svg
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 12H5m14 0-4 4m4-4-4-4"
                  />
                </svg>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
