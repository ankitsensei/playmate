import { initializeApp, getApps } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  query,
  where,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const db = getFirestore(app);

export interface Post {
  id: string;
  title: string;
  desc: string;
  date: string;
  location: string;
  game: string;
  image: string;
  postedBy: string;
}

export async function getPosts(game?: string): Promise<Post[]> {
  const ref = collection(db, "posts");
  const q = game ? query(ref, where("game", "==", game)) : ref;
  const postsSnapshot = await getDocs(q);

  return postsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Post[];
}

export async function createPost(data: {
  title: string;
  desc: string;
  date: string;
  location: string;
  game: string;
  image: string;
  postedBy: string;
}) {
  const docRef = await addDoc(collection(db, "posts"), {
    ...data,
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}
