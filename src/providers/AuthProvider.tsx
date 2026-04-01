"use client";

import { useEffect } from "react";
import { useAtom } from "jotai";
import { authAtom } from "@/shared/store/auth";
import { getProfileRequest, clearTokens } from "@/shared/api/auth";

/**
 * Hydrates auth state on mount by reading stored tokens and fetching the
 * user profile. If the access token is expired (and refresh isn't implemented
 * yet), clears stored tokens and leaves the user logged out.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [, setAuth] = useAtom(authAtom);

  useEffect(() => {
    const raw = localStorage.getItem("auth_tokens");
    if (!raw) return;

    setAuth((prev) => ({ ...prev, isLoading: true }));
    getProfileRequest()
      .then((user) => setAuth({ user, isLoading: false }))
      .catch(() => {
        // Token expired — clear storage, user will need to log in again
        clearTokens();
        setAuth({ user: null, isLoading: false });
      });
  }, [setAuth]);

  return <>{children}</>;
}
