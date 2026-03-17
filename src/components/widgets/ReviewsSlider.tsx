"use client";

import { useRef } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  text: string;
}

interface ReviewsSliderProps {
  reviews: Review[];
  reviewCount: number;
  title?: string;
}

export function ReviewsSlider({
  reviews,
  reviewCount,
  title = "Отзывы",
}: ReviewsSliderProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          {title}
          <span className="ml-2 text-base font-normal text-gray-500">
            ({reviewCount})
          </span>
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="p-2 rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition-colors disabled:opacity-40"
            aria-label="Предыдущий отзыв"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="p-2 rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition-colors disabled:opacity-40"
            aria-label="Следующий отзыв"
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
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <div className="bg-white rounded-2xl border border-gray-200 p-5 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-yellow-100 text-yellow-600 text-sm font-semibold">
                    {review.author.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="font-semibold text-sm text-gray-900 truncate">
                    {review.author}
                  </p>
                  <p className="text-xs text-gray-500">{review.date}</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating
                        ? "text-orange-400 fill-orange-400"
                        : "text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-700 leading-relaxed line-clamp-4 flex-1">
                {review.text}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mt-4 text-center">
        <Button variant="outline" className="gap-2">
          Смотреть все отзывы
        </Button>
      </div>
    </div>
  );
}
