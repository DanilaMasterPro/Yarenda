"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Header } from "@/components/widgets/Header";
import { Footer } from "@/components/widgets/Footer";
import { ProductCard } from "@/components/widgets/ProductCard";
import { catalogProducts } from "@/data/products.data";
import { catalogFilters } from "@/data/filters.data";

export default function CatalogPage() {
  const [showFilters, setShowFilters] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState(catalogProducts);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="overflow-x-auto pb-2 mb-6 -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex items-center gap-2 text-sm text-gray-600 whitespace-nowrap min-w-max">
            <Link href="/" className="hover:text-gray-900">
              Главная
            </Link>
            <ChevronRight className="w-4 h-4 flex-shrink-0" />
            <Link href="/catalog" className="hover:text-gray-900">
              Каталог товаров
            </Link>
            <ChevronRight className="w-4 h-4 flex-shrink-0" />
            <span className="text-gray-900">Дрели и шуруповёрты</span>
          </div>
        </div>

        {/* Title and Description */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Дрели и шуруповёрты
          </h1>
          <p className="text-gray-600 max-w-3xl">
            Вы можете взять напрокат много дрелей и шуруповёртов рядом с вами!
            Используйте профессиональный инструмент для строительства, ремонта
            или личных нужд. Если вам нужен дорогой профессиональный инструмент,
            который вы не хотите покупать, или инструмент для разовых работ, мы
            можем помочь!
          </p>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside
            className={`${showFilters ? "block" : "hidden"} lg:block w-80 flex-shrink-0`}
          >
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Фильтры</h2>
                <button className="text-sm text-yellow-600 hover:underline">
                  Сбросить все
                </button>
              </div>

              <div className="space-y-6">
                {catalogFilters.map((filter) => (
                  <div
                    key={filter.title}
                    className="border-b border-gray-200 pb-6 last:border-0"
                  >
                    <h3 className="font-medium text-gray-900 mb-3">
                      {filter.title}
                    </h3>
                    <div className="space-y-2">
                      {filter.options.map((option) => (
                        <label
                          key={option}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <Checkbox />
                          <span className="text-sm text-gray-700">
                            {option}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="w-full"
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Фильтры
              </Button>
            </div>

            {/* Results count */}
            <p className="text-sm text-gray-600 mb-6">
              Найдено {catalogProducts.length} предложений
            </p>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredProducts.map((product) => (
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

            {/* Load More Button */}
            <div className="mt-12 text-center">
              <Button variant="outline" size="lg">
                Показать больше
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
