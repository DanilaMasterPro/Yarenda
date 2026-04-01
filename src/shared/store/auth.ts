import { atom } from "jotai";
import { AuthUser } from "../api/auth";

export interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
}

// Start as loading so components wait for AuthProvider to finish its initial check
export const authAtom = atom<AuthState>({ user: null, isLoading: true });
