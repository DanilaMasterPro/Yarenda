"use client";

import { useState, useEffect, useMemo } from "react";
import type { DateRange } from "react-day-picker";
import { getToday, countDays, addYears } from "@/shared/utils";
import { useParams } from "next/navigation";
import { Star, MapPin, Heart } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/thumbs";
import { useFavorites } from "@/hooks";
import { usePreloaderContext } from "@/providers";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { Header } from "@/components/widgets/Header";
import { Footer } from "@/components/widgets/Footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { OwnerCard } from "@/components/widgets/OwnerCard";
import { ProductCard } from "@/components/widgets/ProductCard";
import {
  fetchProduct,
  imageUrl,
  getBasePrice,
  type ProductDetail,
  type Product,
} from "@/shared/api/products";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { setPreloaderComplete } = usePreloaderContext();

  useEffect(() => {
    if (!id || typeof id !== "string") return;
    setPreloaderComplete(false);
    setError(null);
    fetchProduct(id)
      .then(setProduct)
      .catch((err) => setError(err.message))
      .finally(() => setPreloaderComplete(true));
  }, [id]);

  const today = useMemo(() => getToday(), []);
  const daysCount = useMemo(() => countDays(dateRange), [dateRange]);

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Товар не найден
          </h1>
          <p className="text-gray-500">{error ?? "Попробуйте позже"}</p>
        </div>
        <Footer />
      </div>
    );
  }

  const liked = isFavorite(product.id);
  const basePrice = getBasePrice(product.prices);
  const totalPrice = daysCount * basePrice;
  const primaryLocation = product.location[0];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Breadcrumbs
          items={[
            { label: product.category, href: "/catalog" },
            { label: product.title },
          ]}
        />

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column - Images */}
          <div className="lg:sticky lg:top-24 self-start min-w-0 overflow-hidden">
            {/* Main Image Swiper */}
            <div className="relative mb-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
                <Swiper
                  modules={[Thumbs]}
                  thumbs={{
                    swiper:
                      thumbsSwiper && !thumbsSwiper.destroyed
                        ? thumbsSwiper
                        : null,
                  }}
                  spaceBetween={0}
                  slidesPerView={1}
                  className="!absolute !inset-0 !w-full !h-full"
                >
                  {product.images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={imageUrl(image)}
                        alt={`${product.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Favorite Button */}
              <button
                onClick={() => toggleFavorite(product.id)}
                className="absolute top-4 right-4 z-10 p-3 bg-white rounded-full shadow-lg hover:scale-110 transition-transform"
              >
                <Heart
                  className={`w-6 h-6 ${liked ? "text-red-500 fill-red-500" : "text-gray-700"}`}
                />
              </button>
            </div>

            {/* Thumbnail Gallery Swiper */}
            <Swiper
              modules={[Thumbs]}
              onSwiper={setThumbsSwiper}
              spaceBetween={16}
              slidesPerView="auto"
              watchSlidesProgress
              className="product-thumbs [&_.swiper-slide]:!outline-none [&_.swiper-slide]:!w-20 sm:[&_.swiper-slide]:!w-24 [&_.swiper-slide]:!aspect-square [&_.swiper-slide]:!rounded-lg [&_.swiper-slide]:!overflow-hidden [&_.swiper-slide]:!border-2 [&_.swiper-slide]:!border-transparent [&_.swiper-slide]:!transition-all [&_.swiper-slide]:!cursor-pointer [&_.swiper-slide-thumb-active]:!border-yellow-500 [&_.swiper-slide:hover:not(.swiper-slide-thumb-active)]:!border-gray-300"
            >
              {product.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <ImageWithFallback
                    src={imageUrl(image)}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Right Column - Booking */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.title}
            </h1>

            {/* Owner Card */}
            <OwnerCard
              ownerId={product.owner.id}
              name={product.owner.username}
              avatar={
                product.owner.avatar ? imageUrl(product.owner.avatar) : null
              }
              rating={product.rating}
              joinedDate={product.owner.createdAt}
              description={product.owner.description}
              phone={product.owner.phone}
            />

            {/* Description */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
              <h3 className="font-semibold text-base sm:text-lg lg:text-lg mb-4">
                Описание
              </h3>
              <p className="text-gray-700 whitespace-pre-line text-sm sm:text-base lg:text-base">
                {product.description}
              </p>
            </div>

            {/* Map */}
            {primaryLocation && (
              <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
                <h3 className="font-semibold text-base sm:text-lg lg:text-lg mb-4">
                  Местоположение
                </h3>

                {primaryLocation && (
                  <div className="flex items-center gap-2 text-gray-600 mb-6">
                    <MapPin className="w-5 h-5" />
                    <span>{primaryLocation.address}</span>
                  </div>
                )}
                <div className="relative w-full h-64 rounded-xl overflow-hidden">
                  <iframe
                    src={`https://yandex.ru/map-widget/v1/?ll=${primaryLocation.coords[1]}%2C${primaryLocation.coords[0]}&z=15&pt=${primaryLocation.coords[1]}%2C${primaryLocation.coords[0]}%2Cpm2rdm&l=map`}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allowFullScreen
                    className="rounded-xl"
                    title="Яндекс Карта"
                  />
                </div>
              </div>
            )}

            {/* Calendar */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
              <h3 className="font-semibold text-base sm:text-lg lg:text-lg mb-4">
                Выберите даты
              </h3>
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                disabled={{ before: today }}
                fromMonth={today}
                toDate={addYears(today, 2)}
                numberOfMonths={1}
              />
            </div>

            {/* Pricing */}
            <div className="bg-gray-50 rounded-2xl p-6 mb-6">
              {/* <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-bold text-gray-900">
                  {basePrice}₽
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">за день аренды</p> */}

              {product.prices.length > 1 && (
                <div className="bg-white rounded-xl p-4 mb-4 space-y-1">
                  {product.prices
                    .slice()
                    .sort((a, b) => a.fromDays - b.fromDays)
                    .map((tier) => (
                      <div
                        key={tier.fromDays}
                        className="flex justify-between text-sm text-gray-600"
                      >
                        <span>
                          от {tier.fromDays}{" "}
                          {tier.fromDays === 1 ? "дня" : "дней"}
                        </span>
                        <span className="font-medium text-gray-900">
                          {tier.price}₽/день
                        </span>
                      </div>
                    ))}
                </div>
              )}

              {daysCount > 0 && (
                <div className="bg-white rounded-xl p-4 mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>
                      {basePrice}₽ × {daysCount}{" "}
                      {daysCount === 1
                        ? "день"
                        : daysCount < 5
                          ? "дня"
                          : "дней"}
                    </span>
                    <span className="font-medium text-gray-900">
                      {totalPrice}₽
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 flex justify-between font-semibold text-gray-900">
                    <span>Итого</span>
                    <span>{totalPrice}₽</span>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <Button variant="primary" size="lg" className="w-full text-lg">
                  Отправить запрос
                </Button>
                <p className="text-xs text-center text-gray-500">
                  🔒 Вы не будете платить до подтверждения
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        {product.reviews.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Отзывы ({product.reviewCount})
            </h2>
            <div className="space-y-6">
              {product.reviews.map((review) => (
                <div key={review.id} className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-yellow-100 text-yellow-600">
                          ?
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? "text-orange-400 fill-orange-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">
                            {new Date(review.createdAt).toLocaleDateString(
                              "ru-RU",
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Products */}
        {product.owner.products.filter((p) => p.id !== product.id).length >
          0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Другие предложения от {product.owner.username}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {product.owner.products
                .filter((p) => p.id !== product.id)
                .map((p) => (
                  <ProductCard
                    key={p.id}
                    id={p.id}
                    title={p.title}
                    price={getBasePrice(p.prices)}
                    location={p.location[0]?.address ?? ""}
                    owner={product.owner}
                    ownerId={product.owner.id}
                    image={imageUrl(p.images[0] ?? "")}
                  />
                ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
