"use client";

import { Search, MapPin, ArrowRight, Play, Star } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { LocationModal } from "../modals/LocationModal";
import Image from "next/image";

export function Hero() {
  const [showLocationModal, setShowLocationModal] = useState(false);

  return (
    <>
      <section className="relative bg-white py-16 lg:py-24 max-lg:pt-5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column */}
            <div className="max-w-xl order-2 lg:order-1">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 mb-8 shadow-sm">
                <span className="text-lg">✨</span>
                <span className="text-sm font-medium text-gray-700">
                  №1 платформа аренды в России
                </span>
              </div>

              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-gray-900 leading-tight mb-6">
                Арендуй{" "}
                <span className="relative inline-block">
                  что угодно
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 286 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 8.5C50 2.5 100 2 143 5.5C186 9 236 10 284 4"
                      stroke="#FACC15"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-lg text-gray-500 leading-relaxed mb-10 max-w-md">
                Инструменты, электроника, транспорт, спорт — тысячи вещей рядом
                с вами. Экономьте до 90% вместо покупки.
              </p>

              {/* Search Bar */}
              <div className="bg-white rounded-full shadow-lg border border-gray-100 p-1.5 flex items-center gap-1 mb-8 max-w-lg">
                <div className="flex items-center gap-2 flex-1 pl-4">
                  <Search className="h-4 w-4 text-gray-400 shrink-0" />
                  <input
                    type="text"
                    placeholder="Что ищете?"
                    className="w-full bg-transparent text-sm text-gray-700 placeholder:text-gray-400 outline-none"
                  />
                </div>
                <div className="h-6 w-px bg-gray-200 shrink-0" />
                <button
                  onClick={() => setShowLocationModal(true)}
                  className="flex items-center gap-1.5 px-3 text-sm text-gray-600 hover:text-gray-800 transition-colors shrink-0 cursor-pointer"
                >
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span>Москва</span>
                </button>
                <Button
                  variant="primary"
                  className="rounded-full h-10 px-5 text-sm font-semibold gap-1.5 shrink-0"
                >
                  Найти
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Users Strip */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {["А", "Д", "И", "С"].map((letter, i) => (
                    <div
                      key={i}
                      className="h-9 w-9 rounded-full bg-yellow-400 border-2 border-white flex items-center justify-center text-sm font-bold text-gray-900"
                    >
                      {letter}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  <span className="font-semibold text-gray-700">15,000+</span>{" "}
                  довольных пользователей
                </span>
              </div>
            </div>

            {/* Right Column — Image Collage */}
            <div className="relative w-full top-5 left-20 max-lg:left-0 block order-1 lg:order-2 h-[520px]">
              {/* Main tools image */}
              <div className="absolute top-0 left-15 w-[65%] h-[65%] max-lg:top-0  max-lg:left-1/2 max-lg:-translate-x-1/2 max-lg:w-[90%] max-lg:h-[461px] rounded-3xl overflow-hidden shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=600&h=400&fit=crop"
                  alt="Инструменты"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Headphones image */}
              <div className="absolute top-20 right-15 w-[38%] h-[40%] max-lg:top-10 max-lg:right-3 max-lg:w-[170px] max-lg:h-[170px] rounded-3xl overflow-hidden shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=250&fit=crop"
                  alt="Наушники"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Bicycles image */}
              <div className="absolute bottom-15 left-0 w-[42%] h-[38%] max-lg:w-[160px] max-lg:h-[160px] max-lg:bottom-55 rounded-3xl overflow-hidden shadow-lg bg-gray-100">
                <Image
                  src="https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=300&h=250&fit=crop"
                  alt="Велосипеды"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-medium text-gray-700">
                  🚲 Велосипеды
                </div>
              </div>

              {/* Rating Badge */}
              {/* <div className="absolute -top-2 right-[2%] bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3 z-10">
                <div className="h-9 w-9 bg-yellow-400 rounded-xl flex items-center justify-center">
                  <Star className="h-5 w-5 text-white fill-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Рейтинг 4.8</p>
                  <p className="text-xs text-gray-500">
                    на основе 5,200 отзывов
                  </p>
                </div>
              </div> */}

              {/* Stats Card */}
              <div className="absolute bottom-5 right-10 w-[55%] bg-yellow-400 max-lg:right-0 max-lg:w-[300px] rounded-3xl p-6 shadow-lg z-10">
                <p className="text-4xl font-extrabold text-gray-900 mb-1">
                  50K+
                </p>
                <p className="text-sm text-gray-800 leading-snug mb-4">
                  предметов доступно для аренды прямо сейчас
                </p>
                <button className="flex items-center gap-2 text-sm font-semibold text-gray-900 hover:opacity-80 transition-opacity cursor-pointer">
                  <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center">
                    <Play className="h-3.5 w-3.5 text-gray-900 fill-gray-900" />
                  </div>
                  Как это работает
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Modal */}
      <LocationModal
        open={showLocationModal}
        onOpenChange={setShowLocationModal}
      />
    </>
  );
}
