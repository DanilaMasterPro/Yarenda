// ─── Review ──────────────────────────────────────────────────────────────────

export interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  text: string;
}

// ─── User ───────────────────────────────────────────────────────────────────

import type { ProductCardData } from "./product.types";

/** @deprecated Use ProductCardData from @/shared/types/product.types */
export type IUserProduct = ProductCardData;

export interface IUser {
  id: number;
  name: string;
  secondName: string;
  email: string;
  phone: string;
  rating: number;
  reviewCount: number;
  joinedDate: string;
  location: string;
  verified: boolean;
  responseTime: string;
  responseRate: string;
  description: string;
  avatar?: string | null;
  reviews: Review[];
  products: IUserProduct[];
}
