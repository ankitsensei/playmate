import { getPosts } from "@/app/shared/FirebaseConfig";

export default async function Home() {
  const posts = await getPosts();

  return (
    <main>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.desc}</p>
        </div>
      ))}
    </main>
  );
}
