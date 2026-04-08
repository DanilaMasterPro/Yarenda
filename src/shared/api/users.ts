import { gql, imageUrl } from "./client";
import type { IUser } from "@/shared/types";

interface UserProductAPI {
  id: string;
  title: string;
  category: string;
  rating: number;
  marketPrice: number;
  images: string[];
}

interface UserProfileAPI {
  id: string;
  email: string;
  username: string;
  avatar: string | null;
  description: string | null;
  phone: string | null;
  createdAt: string;
  updatedAt: string;
  products: UserProductAPI[];
}

function mapUser(api: UserProfileAPI): IUser {
  return {
    id: parseInt(api.id) || 0,
    name: api.username,
    secondName: "",
    email: api.email,
    phone: api.phone ?? "",
    description: api.description ?? "",
    avatar: api.avatar ? imageUrl(api.avatar) : null,
    joinedDate: new Date(api.createdAt).toLocaleDateString("ru-RU", {
      month: "long",
      year: "numeric",
    }),
    rating: 0,
    reviewCount: 0,
    location: "",
    verified: false,
    responseTime: "",
    responseRate: "",
    reviews: [],
    products: api.products?.map((p) => ({
      id: p.id,
      title: p.title,
      category: p.category,
      price: p.marketPrice,
      rating: p.rating,
      reviews: 0,
      location: "",
      owner: { username: api.username, avatar: api.avatar ? imageUrl(api.avatar) : null },
      popular: false,
      image: p.images?.[0] ? imageUrl(p.images[0]) : "",
    })) ?? [],
  };
}

export async function fetchUser(id: string): Promise<IUser> {
  const data = await gql<{ user: UserProfileAPI }>(
    `
      query GetUser($id: String!) {
        user(id: $id) {
          id
          email
          username
          avatar
          description
          phone
          createdAt
          updatedAt
          products {
            id
            title
            category
            rating
            marketPrice
            images
          }
        }
      }
    `,
    { id },
  );
  return mapUser(data.user);
}
