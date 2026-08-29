import { auth } from "@/auth";

export async function GET() {
  const session = await auth();

  if (!session) {
    return Response.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      },
    );
  }
  return Response.json({
    message: "Protected data",
    user: session.user,
  });
}
