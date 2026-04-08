"use client";

import { Heart, Loader2, Trash2 } from "lucide-react";
import Link from "next/link";
import { useFavorites } from "@/hooks";
import { Header } from "@/components/widgets/Header";
import { Footer } from "@/components/widgets/Footer";
import { ProductCard } from "@/components/widgets/ProductCard";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { imageUrl, getBasePrice } from "@/shared/api/products";

export default function FavoritesPage() {
  const { favorites, toggleFavorite, loading } = useFavorites();

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ label: "Избранное" }]} />

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Избранное</h1>
          {favorites.length > 0 && (
            <Button
              variant="outline"
              onClick={() => favorites.forEach(({ product }) => toggleFavorite(product.id))}
              className="text-red-500 hover:text-red-600"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Очистить всё
            </Button>
          )}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
          </div>
        ) : favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 pt-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <Heart className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              В избранном пока пусто
            </h2>
            <p className="text-gray-500 mb-6 max-w-md">
              Нажмите на сердечко на карточке товара, чтобы добавить его в
              избранное
            </p>
            <Link href="/catalog">
              <Button variant="primary">Перейти в каталог</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {favorites.map(({ product }) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                price={getBasePrice(product.prices)}
                rating={product.rating}
                reviews={product.reviewCount}
                location={product.location[0]?.address ?? ""}
                owner={product.owner}
                image={imageUrl(product.images[0] ?? "")}
              />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
