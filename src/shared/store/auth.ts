import { atom } from "jotai";
import { AuthUser } from "../api/auth";

export interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
}

export const authAtom = atom<AuthState>({ user: null, isLoading: false });
