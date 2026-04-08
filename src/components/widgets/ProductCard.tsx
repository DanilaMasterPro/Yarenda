"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, MapPin, Pencil } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ImageWithFallback } from "../ui/ImageWithFallback";
import { useFavorites } from "@/hooks";
import { useAuth } from "@/hooks/useAuth";
import { imageUrl } from "@/shared/api/products";
import type { ProductOwner } from "@/shared/types/product.types";

export interface ProductCardProps {
  id: string | number;
  title: string;
  price: number | string;
  rating?: number;
  reviews?: number;
  location: string;
  owner: ProductOwner;
  ownerId?: string;
  popular?: boolean;
  image: string;
}

export function ProductCard({
  id,
  title,
  price,
  rating,
  reviews,
  location,
  owner,
  ownerId,
  popular = false,
  image,
}: ProductCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { user } = useAuth();
  const router = useRouter();
  const liked = isFavorite(String(id));
  const isOwner = !!ownerId && !!user && user.id === ownerId;

  return (
    <Link
      href={`/product/${id}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 block"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {isOwner ? (
          <button
            className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
            onClick={(e) => {
              e.preventDefault();
              router.push(`/product/${id}/edit`);
            }}
          >
            <Pencil className="w-5 h-5 text-gray-700" />
          </button>
        ) : (
          <button
            className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(String(id));
            }}
          >
            <Heart
              className={`w-5 h-5 ${liked ? "text-red-500 fill-red-500" : "text-gray-700"}`}
            />
          </button>
        )}
        {popular && (
          <span className="absolute top-4 left-4 px-3 py-1 bg-green-500 text-white text-sm rounded-full">
            Популярное
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-semibold text-lg text-gray-900 mb-2">{title}</h3>

        <div className="flex items-center gap-2 mb-3 relative">
          {rating != null && (
            <div className="flex items-center">
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              <span className="ml-1 text-sm font-medium text-gray-900">
                {rating}
              </span>
            </div>
          )}
          {reviews != null && (
            <span className="text-sm text-gray-500">({reviews} отзывов)</span>
          )}

          {/* Owner Avatar */}
          <Avatar className="absolute top-1 right-0 w-10 h-10 border-2 border-gray-100">
            {owner.avatar && (
              <AvatarImage src={imageUrl(owner.avatar)} alt={owner.username} />
            )}
            <AvatarFallback className="bg-yellow-500 text-dark-500 text-sm font-semibold">
              {owner.username.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="flex items-center text-sm text-gray-600 mb-4">
          <MapPin className="w-4 h-4 mr-1" />
          {location}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <span className="text-2xl font-bold text-gray-900">{price}₽</span>
            <span className="text-gray-600 ml-1">/день</span>
          </div>
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-dark-500">
            Подробнее
          </Button>
        </div>
      </div>
    </Link>
  );
}
