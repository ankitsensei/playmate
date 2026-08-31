import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/app/shared/FirebaseConfig";
import Image from "next/image";
import Link from "next/link";

interface Post {
  id: string;
  title: string;
  desc: string;
  date: string;
  location: string;
  game: string;
  image: string;
  postedBy: string;
  createdAt?: { seconds: number; nanoseconds: number };
}

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

const MyPosts = async () => {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/");
  }

  const postRef = collection(db, "posts");

  const q = query(postRef, where("postedBy", "==", session.user.email));

  const snapshot = await getDocs(q);

  const posts = (
    snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Post[]
  ).sort((a, b) => {
    const aTime = a.createdAt?.seconds ?? 0;
    const bTime = b.createdAt?.seconds ?? 0;
    return bTime - aTime;
  });

  return (
    <main className="min-h-[calc(100vh-120px)] px-4 py-10">
      <div className="mx-auto max-w-2xl space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            My Posts
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {posts.length} {posts.length === 1 ? "post" : "posts"} created
          </p>
        </div>

        {/* Posts */}
        {posts.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-4xl">📝</p>
            <h2 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
              No posts yet
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              You haven&apos;t posted anything yet.
            </p>
            <Link
              href="/create-post"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500"
            >
              Create your first post
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => {
              const formattedDate = formatDate(post.date);

              return (
                <article
                  key={post.id}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
                >
                  <div className="flex flex-col sm:flex-row">
                    {/* Thumbnail */}
                    {post.image && (
                      <div className="relative h-40 w-full shrink-0 sm:h-auto sm:w-40">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex flex-1 flex-col p-4 sm:p-5">
                      <h2 className="text-base font-bold tracking-tight text-gray-900 dark:text-white sm:text-lg">
                        {post.title}
                      </h2>

                      <p className="mt-1.5 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
                        {post.desc}
                      </p>

                      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
                        {post.game && (
                          <span className="rounded-full bg-blue-600/10 px-2.5 py-0.5 text-xs font-medium text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                            {post.game}
                          </span>
                        )}
                        {formattedDate && <span>{formattedDate}</span>}
                        {post.location && <span>{post.location}</span>}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
};

export default MyPosts;
