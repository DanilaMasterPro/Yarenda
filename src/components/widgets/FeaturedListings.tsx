"use client";

import { Button } from "../ui/button";
import Link from "next/link";
import { ProductCard } from "./ProductCard";
import { featuredListings } from "@/shared/data/products.data";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@/styles/swiper.css";

export function FeaturedListings() {
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
            {featuredListings.map((listing) => (
              <SwiperSlide key={listing.id}>
                <ProductCard
                  id={listing.id}
                  title={listing.title}
                  price={listing.price}
                  period={listing.period}
                  rating={listing.rating}
                  reviews={listing.reviews}
                  location={listing.location}
                  owner={listing.owner}
                  popular={listing.popular}
                  image={listing.image}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          {/* <div className="swiper-custom-pagination mt-6 flex justify-center"></div> */}
        </div>

        {/* Desktop Grid - visible at lg breakpoint and above (>= 1024px) */}
        <div className="hidden lg:grid grid-cols-3 gap-6">
          {featuredListings.map((listing) => (
            <div key={listing.id} className="fade-in">
              <ProductCard
                id={listing.id}
                title={listing.title}
                price={listing.price}
                period={listing.period}
                rating={listing.rating}
                reviews={listing.reviews}
                location={listing.location}
                owner={listing.owner}
                popular={listing.popular}
                image={listing.image}
              />
            </div>
          ))}
        </div>

        <div className="fade-in text-center mt-12">
          <Button asChild variant="outline" size="lg">
            <Link href="/catalog">Показать больше</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
