"use client";

import { useAtom } from "jotai";
import { authAtom } from "@/shared/store/auth";
import {
  loginRequest,
  registerRequest,
  getProfileRequest,
  saveTokens,
  clearTokens,
} from "@/shared/api/auth";

export function useAuth() {
  const [auth, setAuth] = useAtom(authAtom);

  async function login(email: string, password: string) {
    setAuth((prev) => ({ ...prev, isLoading: true }));
    try {
      const tokens = await loginRequest(email, password);
      saveTokens(tokens);
      const user = await getProfileRequest();
      setAuth({ user, isLoading: false });
      return user;
    } catch (err) {
      setAuth((prev) => ({ ...prev, isLoading: false }));
      throw err;
    }
  }

  async function register(email: string, password: string) {
    setAuth((prev) => ({ ...prev, isLoading: true }));
    try {
      const tokens = await registerRequest(email, password);
      saveTokens(tokens);
      const user = await getProfileRequest();
      setAuth({ user, isLoading: false });
      return user;
    } catch (err) {
      setAuth((prev) => ({ ...prev, isLoading: false }));
      throw err;
    }
  }

  function logout() {
    clearTokens();
    setAuth({ user: null, isLoading: false });
  }

  return {
    user: auth.user,
    isLoading: auth.isLoading,
    login,
    register,
    logout,
  };
}
