"use client";

import { Heart, Trash2 } from "lucide-react";
import Link from "next/link";
import { useFavorites } from "@/hooks";
import { Header } from "@/components/widgets/Header";
import { Footer } from "@/components/widgets/Footer";
import { ProductCard } from "@/components/widgets/ProductCard";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { catalogProducts, featuredListings } from "@/shared/data/products.data";
import { productDetails } from "@/shared/data/productDetail.data";

function getAllProducts() {
  const map = new Map<number, (typeof catalogProducts)[number]>();

  for (const p of featuredListings) map.set(p.id, p);
  for (const p of catalogProducts) map.set(p.id, p);
  for (const p of productDetails) {
    map.set(p.id, {
      id: p.id,
      title: p.title,
      price: p.price,
      period: "день",
      rating: p.rating,
      reviews: p.reviewCount,
      location: p.location,
      owner: p.owner.name,
      popular: false,
      image: p.images[0],
    });
  }

  return map;
}

const allProducts = getAllProducts();

export default function FavoritesPage() {
  const { favoriteIds, toggleFavorite } = useFavorites();

  const favoriteProducts = favoriteIds
    .map((id) => allProducts.get(id))
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ label: "Избранное" }]} />

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Избранное</h1>
          {favoriteProducts.length > 0 && (
            <Button
              variant="outline"
              onClick={() => {
                favoriteIds.forEach((id) => toggleFavorite(id));
              }}
              className="text-red-500 hover:text-red-600"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Очистить всё
            </Button>
          )}
        </div>

        {favoriteProducts.length === 0 ? (
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
            {favoriteProducts.map(
              (product) =>
                product && (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    price={product.price}
                    period={product.period}
                    rating={product.rating}
                    reviews={product.reviews}
                    location={product.location}
                    owner={product.owner}
                    popular={product.popular}
                    image={product.image}
                  />
                ),
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
