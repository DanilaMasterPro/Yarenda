"use client";

import Link from "next/link";
import { Heart, MapPin, MessageCircle } from "lucide-react";
import type { ProductCard } from "@/shared/data/products.data";

interface MapProductCardProps {
  product: ProductCard;
}

export function MapProductCard({ product }: MapProductCardProps) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="flex gap-4 p-4 bg-white hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
    >
      {/* Thumbnail */}
      <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex-shrink-0 rounded-xl overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover"
        />
        {product.popular && (
          <span className="absolute top-1.5 left-1.5 px-2 py-0.5 bg-green-500 text-white text-[10px] rounded-full">
            Популярное
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-sm text-gray-900 line-clamp-2 leading-tight">
              {product.title}
            </h3>
            <button
              className="p-1.5 hover:bg-gray-100 rounded-full flex-shrink-0 transition-colors"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <Heart className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          <div className="flex items-center gap-1.5 mt-1">
            <Heart className="w-3 h-3 text-red-500 fill-red-500" />
            <span className="text-xs font-medium text-gray-900">
              {product.rating}
            </span>
            <span className="text-xs text-gray-400">({product.reviews})</span>
          </div>

          <div className="flex items-center text-xs text-gray-500 mt-1">
            <MapPin className="w-3 h-3 mr-0.5 flex-shrink-0" />
            <span className="truncate">{product.location}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div>
            <span className="text-lg font-bold text-gray-900">
              {product.price}₽
            </span>
            <span className="text-gray-500 text-xs ml-0.5">
              /{product.period}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-500 text-gray-900">
              <MessageCircle className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
