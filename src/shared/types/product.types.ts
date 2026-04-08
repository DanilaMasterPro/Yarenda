// ── API response types (from GraphQL) ────────────────────────────────────────

export interface ProductPrice {
  price: number;
  fromDays: number;
}

export interface ProductLocation {
  address: string;
  coords: [number, number];
}

export interface ProductOwner {
  username: string;
  avatar: string | null;
}

/** Extended owner info returned by the product detail query */
export interface ProductDetailOwnerAPI {
  id: string;
  email: string;
  username: string;
  avatar: string | null;
  description: string | null;
  phone: string | null;
  createdAt: string;
  products: Omit<Product, "owner">[];
}

/** Review returned by the product detail query */
export interface ProductReview {
  id: string;
  rating: number;
  comment: string;
  userId: string;
  createdAt: string;
}

/** Location returned by the product detail query */
export interface ProductLocationDetail {
  id: string;
  name: string;
  address: string;
  coords: [number, number];
}

/** Product as returned by the products list query */
export interface Product {
  id: string;
  title: string;
  ownerId: string;
  images: string[];
  prices: ProductPrice[];
  location: ProductLocation[];
  owner: ProductOwner;
}

/** Full product as returned by the product(id) query */
export interface ProductDetail {
  id: string;
  title: string;
  category: string;
  description: string;
  prices: ProductPrice[];
  rating: number;
  reviewCount: number;
  images: string[];
  cancelCondition: string;
  marketPrice: number;
  createdAt: string;
  owner: ProductDetailOwnerAPI;
  location: ProductLocationDetail[];
  reviews: ProductReview[];
}

// ── Display types (used by UI components) ────────────────────────────────────

/** Flat product shape used by cards, sliders, and mock data */

export interface ProductCardData {
  id: string | number;
  title: string;
  category?: string;
  price: number | string;
  /** @deprecated Always displayed as /день */
  period?: string;
  rating: number;
  reviews: number;
  location: string;
  owner: ProductOwner;
  popular: boolean;
  image: string;
  /** [latitude, longitude] */
  coords?: [number, number];
}

// ── Product detail types ─────────────────────────────────────────────────────

export interface ProductDetailOwner {
  id?: number;
  name: string;
  avatar: string;
  rating: number;
  joinedDate: string;
}

export interface ProductDetailFeature {
  /** Feather / icon name — each platform resolves to its own icon component */
  icon: string;
  label: string;
}

// ── Mutation input types ─────────────────────────────────────────────────────

export interface PriceInput {
  fromDays: number;
  price: number;
}

export interface CreateProductInput {
  category: string;
  title: string;
  description: string;
  prices: PriceInput[];
  locationIds: string[];
  cancelCondition: string;
  marketPrice: number;
  images: string[];
}

export interface CreateProductResult {
  id: string;
  title: string;
  category: string;
}

export interface UpdateProductInput {
  id: string;
  category?: string;
  title?: string;
  description?: string;
  prices?: PriceInput[];
  locationIds?: string[];
  cancelCondition?: string;
  marketPrice?: number;
  images?: string[];
}

export interface UpdateProductResult {
  id: string;
  title: string;
  description: string;
  updatedAt: string;
}
