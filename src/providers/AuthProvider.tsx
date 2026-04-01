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
    if (!raw) {
      // No token — hydration done, user is a guest
      setAuth({ user: null, isLoading: false });
      return;
    }

    getProfileRequest()
      .then((user) => setAuth({ user, isLoading: false }))
      .catch(() => {
        clearTokens();
        setAuth({ user: null, isLoading: false });
      });
  }, [setAuth]);

  return <>{children}</>;
}
