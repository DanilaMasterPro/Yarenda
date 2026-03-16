"use client";

import { useRef } from "react";
import { useParams } from "next/navigation";
import {
  Heart,
  MessageCircle,
  Flag,
  ShieldCheck,
  Clock,
  MessageSquare,
  MapPin,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Header } from "@/components/widgets/Header";
import { Footer } from "@/components/widgets/Footer";
import { ProductCard } from "@/components/widgets/ProductCard";
import { owners } from "@/shared/data/owner.data";

export default function OwnerProfilePage() {
  const { id } = useParams();
  const owner = owners[id as string] ?? owners["1"];

  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Cover gradient — Facebook-style */}
      <div className="relative h-48 sm:h-56 lg:h-64 bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
          <Breadcrumbs items={[{ label: owner.name }]} />
        </div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0djEyaDEyVjE0SDM2ek0xMiAxNHYxMmgxMlYxNEgxMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Profile header (overlaps cover) ─────────────────── */}
        <div className="relative -mt-20 sm:-mt-24 mb-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 sm:p-8">
            {/* Top row: avatar + info + actions */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-end md:items-center gap-4 sm:gap-6">
              {/* Avatar */}
              <div className="-mt-16 sm:-mt-20">
                <Avatar className="w-28 h-28 sm:w-36 sm:h-36 border-4 border-white shadow-lg">
                  <AvatarFallback className="bg-yellow-100 text-yellow-700 text-4xl sm:text-5xl font-bold">
                    {owner.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* Name + meta */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {owner.name}
                  </h1>
                  {owner.verified && (
                    <ShieldCheck className="w-6 h-6 text-blue-500 shrink-0" />
                  )}
                </div>
                <div className="flex items-center gap-3 mt-1 text-sm text-gray-500 flex-wrap">
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                    <span className="font-semibold text-gray-900">
                      {owner.rating}
                    </span>
                    <span>· {owner.reviewCount} отзывов</span>
                  </div>
                  <span className="hidden sm:inline">·</span>
                  <span>На сайте с {owner.joinedDate}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap basis-full lg:basis-auto">
                <Button variant="primary" className="gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Написать
                </Button>
                <Button variant="secondary" className="gap-2">
                  <Flag className="w-4 h-4" />
                  Пожаловаться
                </Button>
                <Button variant="ghost" size="icon" title="В избранное">
                  <Heart className="w-5 h-5 text-gray-400" />
                </Button>
              </div>
            </div>

            {/* Bio */}
            {owner.bio && (
              <p className="mt-5 text-gray-600 text-sm sm:text-base leading-relaxed max-w-3xl">
                {owner.bio}
              </p>
            )}

            {/* Info tags */}
            <div className="mt-5 flex flex-wrap gap-2 sm:gap-3">
              {owner.verified && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs sm:text-sm font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Личность подтверждена
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 text-green-700 text-xs sm:text-sm font-medium">
                <Clock className="w-3.5 h-3.5" />
                Отвечает {owner.responseTime}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50 text-purple-700 text-xs sm:text-sm font-medium">
                <MessageSquare className="w-3.5 h-3.5" />
                Частота ответов: {owner.responseRate}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 text-orange-700 text-xs sm:text-sm font-medium">
                <MapPin className="w-3.5 h-3.5" />
                {owner.location}
              </span>
            </div>
          </div>
        </div>

        {/* ── Reviews slider ──────────────────────────────────── */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Отзывы
              <span className="ml-2 text-base font-normal text-gray-500">
                ({owner.reviewCount})
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
            {owner.reviews.map((review) => (
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

        {/* ── Products catalog ────────────────────────────────── */}
        <div className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            Объявления
            <span className="ml-2 text-base font-normal text-gray-500">
              ({owner.products.length})
            </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {owner.products.map((product) => (
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
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
