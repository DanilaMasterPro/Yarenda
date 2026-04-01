// ─── Review ──────────────────────────────────────────────────────────────────

export interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  text: string;
}

// ─── User ───────────────────────────────────────────────────────────────────

export interface IUserProduct {
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
