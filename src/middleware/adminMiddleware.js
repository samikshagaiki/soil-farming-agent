import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

export async function adminMiddleware() {

  const session =
    await getServerSession(authOptions);

  if (!session) {
    throw new Error("Unauthorized");
  }

  if (session.user.role !== "admin") {
    throw new Error("Admin access required");
  }

  return session;
}