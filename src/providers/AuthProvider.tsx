"use client";

import { useEffect } from "react";
import { useAtom } from "jotai";
import { authAtom } from "@/shared/store/auth";
import { getProfileRequest } from "@/shared/api/auth";

/**
 * Hydrates auth state on mount by reading stored tokens and fetching the
 * user profile. If the access token is expired the `gql()` layer will
 * transparently refresh tokens and retry before reaching this code.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [, setAuth] = useAtom(authAtom);

  // When tokens are force-cleared (e.g. refresh failed), reset the Jotai atom.
  useEffect(() => {
    const handler = () => setAuth({ user: null, isLoading: false });
    window.addEventListener("auth:force-logout", handler);
    return () => window.removeEventListener("auth:force-logout", handler);
  }, [setAuth]);

  // Hydrate auth on first mount
  useEffect(() => {
    const raw = localStorage.getItem("auth_tokens");
    if (!raw) {
      setAuth({ user: null, isLoading: false });
      return;
    }

    getProfileRequest()
      .then((user) => setAuth({ user, isLoading: false }))
      .catch(() => {
        setAuth({ user: null, isLoading: false });
      });
  }, [setAuth]);

  return <>{children}</>;
}
