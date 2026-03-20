"use client";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "favorites";

let cachedRaw: string | null = null;
let cachedResult: number[] = [];

function getSnapshot(): number[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw !== cachedRaw) {
      cachedRaw = raw;
      cachedResult = raw ? JSON.parse(raw) : [];
    }
    return cachedResult;
  } catch {
    return cachedResult;
  }
}

const EMPTY: number[] = [];
function getServerSnapshot(): number[] {
  return EMPTY;
}

let listeners: Array<() => void> = [];

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

function subscribe(listener: () => void) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

export function useFavorites() {
  const favoriteIds = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const isFavorite = useCallback(
    (id: number) => favoriteIds.includes(id),
    [favoriteIds],
  );

  const toggleFavorite = useCallback((id: number) => {
    const current = getSnapshot();
    const next = current.includes(id)
      ? current.filter((fid) => fid !== id)
      : [...current, id];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    emitChange();
  }, []);

  return { favoriteIds, isFavorite, toggleFavorite };
}
