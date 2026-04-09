"use client";

import { useCallback } from "react";
import { useAtom, useAtomValue, useSetAtom, atom } from "jotai";
import { useAuth } from "./useAuth";
import { authModalOpenAtom } from "@/shared/store/auth";
import {
  addToFavoritesRequest,
  removeFromFavoritesRequest,
  getMyFavoritesRequest,
  type FavoriteEntry,
} from "@/shared/api/favorites";

export const favoritesAtom = atom<FavoriteEntry[]>([]);
export const favoritesLoadingAtom = atom(false);

// Called once by AuthProvider — not inside individual components
export async function loadFavorites(
  setFavorites: (v: FavoriteEntry[]) => void,
  setLoading: (v: boolean) => void,
) {
  setLoading(true);
  try {
    const list = await getMyFavoritesRequest();
    setFavorites(list);
  } catch {
    setFavorites([]);
  } finally {
    setLoading(false);
  }
}

export function useFavorites() {
  const { user } = useAuth();
  const favorites = useAtomValue(favoritesAtom);
  const loading = useAtomValue(favoritesLoadingAtom);
  const setFavorites = useSetAtom(favoritesAtom);
  const openAuthModal = useSetAtom(authModalOpenAtom);

  const favoriteIds = favorites.map((f) => f.product.id);

  const isFavorite = useCallback(
    (id: string) => favoriteIds.includes(id),
    [favoriteIds],
  );

  const toggleFavorite = useCallback(
    async (id: string) => {
      if (!user) {
        openAuthModal(true);
        return;
      }
      const alreadyFav = favoriteIds.includes(id);
      if (alreadyFav) {
        setFavorites((prev) => prev.filter((f) => f.product.id !== id));
        try {
          await removeFromFavoritesRequest(id);
        } catch {
          getMyFavoritesRequest()
            .then(setFavorites)
            .catch(() => {});
        }
      } else {
        // optimistic: add a placeholder so the heart flips immediately
        setFavorites((prev) => [
          ...prev,
          {
            product: {
              id,
              title: "",
              rating: 0,
              reviewCount: 0,
              images: [],
              prices: [],
              location: [],
              ownerId: "",
              owner: { username: "", avatar: null },
            },
          },
        ]);
        try {
          await addToFavoritesRequest(id);
          // refresh to get full product data
          getMyFavoritesRequest()
            .then(setFavorites)
            .catch(() => {});
        } catch {
          // revert optimistic update
          setFavorites((prev) => prev.filter((f) => f.product.id !== id));
        }
      }
    },
    [user, favoriteIds, openAuthModal, setFavorites],
  );

  return { favorites, favoriteIds, isFavorite, toggleFavorite, loading };
}
