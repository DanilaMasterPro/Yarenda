"use client";

import { Search, MapPin, Play } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { LocationModal } from "../modals/LocationModal";
import Image from "next/image";

export function Hero() {
  const [showLocationModal, setShowLocationModal] = useState(false);

  return (
    <>
      <section className="relative bg-white py-16 lg:py-24 max-lg:pt-5 overflow-hidden min-h-[90vh] flex items-center">
        {/* Full screen background image */}
        <div className="absolute inset-0">
          {/* Mobile/Tablet image */}
          <Image
            src="/assets/bg_hero.png"
            alt=""
            fill
            className="object-cover lg:hidden"
            priority
          />
          {/* Desktop image */}
          <Image
            src="/assets/bg_hero-full.png"
            alt=""
            fill
            className="object-cover hidden lg:block"
            priority
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/30 rounded-full px-4 py-2 mb-8 shadow-sm">
              <span className="text-lg">✨</span>
              <span className="text-sm font-medium text-white">
                №1 платформа аренды в России
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-white leading-tight mb-6">
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
            <p className="text-lg text-white/80 leading-relaxed mb-10 max-w-md">
              Инструменты, электроника, транспорт, спорт — тысячи вещей рядом с
              вами. Экономьте до 90% вместо покупки.
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
              <span className="text-sm text-white/80">
                <span className="font-semibold text-white">15,000+</span>{" "}
                довольных пользователей
              </span>
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
