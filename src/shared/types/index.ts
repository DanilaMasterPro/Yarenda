// ─── Review ──────────────────────────────────────────────────────────────────

export interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  text: string;
}

// ─── Owner ───────────────────────────────────────────────────────────────────

export interface OwnerProduct {
  id: number;
  title: string;
  price: number;
  period: string;
  rating: number;
  reviews: number;
  location: string;
  owner: string;
  popular: boolean;
  image: string;
}

export interface Owner {
  id: number;
  name: string;
  rating: number;
  reviewCount: number;
  joinedDate: string;
  location: string;
  verified: boolean;
  responseTime: string;
  responseRate: string;
  bio: string;
  reviews: Review[];
  products: OwnerProduct[];
}
