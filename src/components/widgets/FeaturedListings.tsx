"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ProductCard } from "./ProductCard";
import {
  fetchProducts,
  imageUrl,
  getBasePrice,
  type Product,
} from "@/shared/api/products";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@/styles/swiper.css";

export function FeaturedListings() {
  const [listings, setListings] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts(0, 6)
      .then(setListings)
      .catch((err) => console.error("Failed to load featured listings:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="fade-in text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Популярные предложения
          </h2>
          <p className="fade-in text-lg text-gray-600">
            Проверенные предметы от надежных арендодтелей
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
          </div>
        ) : (
          <>
            {/* Mobile Slider - visible below lg breakpoint (< 1024px) */}
            <div className="lg:hidden">
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={24}
                slidesPerView={1.2}
                navigation={false}
                pagination={false}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 24,
                  },
                }}
              >
                {listings.map((listing) => (
                  <SwiperSlide key={listing.id}>
                    <ProductCard
                      id={listing.id}
                      title={listing.title}
                      price={getBasePrice(listing.prices)}
                      location={listing.location[0]?.address ?? ""}
                      owner={listing.owner}
                      ownerId={listing.ownerId}
                      image={imageUrl(listing.images[0] ?? "")}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Desktop Grid - visible at lg breakpoint and above (>= 1024px) */}
            <div className="hidden lg:grid grid-cols-3 gap-6">
              {listings.map((listing) => (
                <div key={listing.id} className="fade-in">
                  <ProductCard
                    id={listing.id}
                    title={listing.title}
                    price={getBasePrice(listing.prices)}
                    location={listing.location[0]?.address ?? ""}
                    owner={listing.owner}
                    ownerId={listing.ownerId}
                    image={imageUrl(listing.images[0] ?? "")}
                  />
                </div>
              ))}
            </div>
          </>
        )}

        <div className="fade-in text-center mt-12">
          <Button asChild variant="outline" size="lg">
            <Link href="/catalog">Показать больше</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
