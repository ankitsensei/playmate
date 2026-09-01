"use server";

import { auth } from "@/auth";
import { db } from "@/app/shared/FirebaseConfig";
import { collection, deleteDoc, doc, getDoc } from "firebase/firestore";
import { revalidatePath } from "next/cache";

export async function deletePost(postId: string) {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const postRef = doc(collection(db, "posts"), postId);

  const postSnapshot = await getDoc(postRef);

  if (!postSnapshot.exists()) {
    throw new Error("Post not found");
  }

  const post = postSnapshot.data();

  // Make sure the logged-in user owns this post
  if (post.postedBy !== session.user.email) {
    throw new Error("You are not allowed to delete this post");
  }

  // Delete from Firebase
  await deleteDoc(postRef);

  // Tell Next.js that this page needs fresh data
  revalidatePath("/dashboard/myposts");
}
