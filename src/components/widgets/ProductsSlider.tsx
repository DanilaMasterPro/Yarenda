"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/widgets/ProductCard";

interface Product {
  id: number;
  title: string;
  price: number | string;
  period: string;
  rating: number;
  reviews: number;
  location: string;
  owner: string;
  popular?: boolean;
  image: string;
}

interface ProductsSliderProps {
  products: Product[];
  title: string;
  viewAllText?: string;
}

export function ProductsSlider({
  products,
  title,
  viewAllText = "Смотреть все",
}: ProductsSliderProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          {title}
          <span className="ml-2 text-base font-normal text-gray-500">
            ({products.length})
          </span>
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="p-2 rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition-colors disabled:opacity-40"
            aria-label="Назад"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="p-2 rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition-colors disabled:opacity-40"
            aria-label="Вперёд"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      <Swiper
        onSwiper={(s) => (swiperRef.current = s)}
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard
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
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mt-4 text-center">
        <Button variant="outline" className="gap-2">
          {viewAllText}
        </Button>
      </div>
    </div>
  );
}
