import { gql } from "./client";

export interface FavoriteProductOwner {
  username: string;
  avatar: string | null;
}

export interface FavoriteProduct {
  id: string;
  title: string;
  rating: number;
  reviewCount: number;
  images: string[];
  prices: { fromDays: number; price: number }[];
  location: { address: string }[];
  owner: FavoriteProductOwner;
  ownerId: string;
}

export interface FavoriteEntry {
  product: FavoriteProduct;
}

export async function addToFavoritesRequest(productId: string): Promise<void> {
  await gql<{ addToFavorites: { id: string } }>(
    `mutation AddToFavorites($productId: String!) {
      addToFavorites(productId: $productId) {
        id
        productId
        createdAt
      }
    }`,
    { productId },
  );
}

export async function removeFromFavoritesRequest(
  productId: string,
): Promise<void> {
  await gql<{ removeFromFavorites: boolean }>(
    `mutation RemoveFromFavorites($productId: String!) {
      removeFromFavorites(productId: $productId)
    }`,
    { productId },
  );
}

export async function getMyFavoritesRequest(): Promise<FavoriteEntry[]> {
  const data = await gql<{ myFavorites: FavoriteEntry[] }>(
    `query {
      myFavorites {
        product {
          id
          title
          rating
          reviewCount
          images
          prices
          location {
            address
          }
          ownerId
          owner {
            username
            avatar
          }
        }
      }
    }`,
  );
  return data.myFavorites;
}
