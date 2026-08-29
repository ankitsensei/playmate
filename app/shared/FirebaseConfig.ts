import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export interface Post {
  id: string;
  title: string;
  desc: string;
}

export async function getPosts(): Promise<Post[]> {
  const postsCollection = collection(db, "posts");

  const postsSnapshot = await getDocs(postsCollection);

  return postsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Post, "id">),
  }));
}
