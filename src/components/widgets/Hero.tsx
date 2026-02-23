"use client";

import { Search, MapPin } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { LocationModal } from "../modals/LocationModal";

export function Hero() {
  const [showLocationModal, setShowLocationModal] = useState(false);

  return (
    <>
      <section className="relative bg-gradient-to-br from-gray-50 to-blue-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Аренда всего, что вам нужно
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-10">
              От строительных инструментов до электроники и садовой техники.
              Экономьте деньги — арендуйте вместо покупки.
            </p>

            {/* Search Box */}
            <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Что вы ищете?"
                    className="pl-12 h-12 border-gray-200"
                  />
                </div>
                <div className="flex-1 relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Где?"
                    className="pl-12 h-12 border-gray-200 cursor-pointer"
                    onClick={() => setShowLocationModal(true)}
                    readOnly
                  />
                </div>
                <Button variant="primary" size="lg" className="h-12 px-8">
                  Найти
                </Button>
              </div>
            </div>

            {/* Popular Searches */}
            <div className="mt-8 flex flex-wrap justify-center items-center gap-3">
              <span className="text-sm text-gray-600">Популярно:</span>
              {[
                "Перфоратор",
                "Ноутбук",
                "Камера",
                "Газонокосилка",
                "Велосипед",
              ].map((item) => (
                <button
                  key={item}
                  className="text-sm px-4 py-2 bg-white rounded-full border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all"
                >
                  {item}
                </button>
              ))}
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
