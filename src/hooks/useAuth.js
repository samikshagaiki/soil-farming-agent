"use client";

import { useSession }
from "next-auth/react";

export default function useAuth() {

  const {
    data: session,
    status
  } = useSession();

  return {
    user: session?.user,
    loading: status === "loading",
    authenticated:
      status === "authenticated"
  };
}