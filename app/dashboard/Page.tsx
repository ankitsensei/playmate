import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";
import { IoMdLogOut } from "react-icons/io";

export default async function Dashboard() {
  const session = await auth();

  console.log(session);
  if (!session) {
    redirect("/dashboard");
  }
  return (
    <main>
      <h1>Dashboard</h1>
      <p>Welcome {session.user?.name}</p>
      <p>{session.user?.email}</p>

      <form
        action={async () => {
          "use server";

          await signOut({
            redirectTo: "/login",
          });
        }}
      >
        <button
          type="submit"
          className="px-3 py-2 rounded-full text-black bg-zinc-100 hover:bg-zinc-200 flex items-center gap-2"
        >
          <span className="hidden md:block">Logout</span>
          <IoMdLogOut />
        </button>
      </form>
    </main>
  );
}
