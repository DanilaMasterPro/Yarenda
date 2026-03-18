import { atom } from "jotai";
import { IUser } from "../types";

export const testAtom = atom<IUser | null>(null);
