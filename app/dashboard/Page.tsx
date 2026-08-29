import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }
  return (
    <main>
      <h1>Dashboard</h1>
      <p>Welcome {session.user?.name}</p>
      <p>{session.user?.email}</p>
    </main>
  );
}
