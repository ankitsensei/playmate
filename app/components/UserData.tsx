import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";

const UserData = async () => {
  const session = await auth();
  if (!session) {
    redirect("/dashboard");
  }
  return <div>{session.user?.email}</div>;
};

export default UserData;
