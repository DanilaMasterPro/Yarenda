"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageTitle } from "@/components/ui/PageTitle";
import { Header } from "@/components/widgets/Header";
import { Footer } from "@/components/widgets/Footer";
import { ProductCard } from "@/components/widgets/ProductCard";
import { CatalogFilters } from "@/components/widgets/CatalogFilters";
import { catalogProducts } from "@/data/products.data";
import { catalogFilters } from "@/data/filters.data";

export default function CatalogPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(catalogProducts);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Breadcrumbs
          items={[
            { label: "Каталог товаров", href: "/catalog" },
            { label: "Дрели и шуруповёрты" },
          ]}
        />

        <PageTitle
          title="Дрели и шуруповёрты"
          description="Вы можете взять напрокат много дрелей и шуруповёртов рядом с вами! Используйте профессиональный инструмент для строительства, ремонта или личных нужд. Если вам нужен дорогой профессиональный инструмент, который вы не хотите покупать, или инструмент для разовых работ, мы можем помочь!"
        />

        <div className="flex gap-8">
          {/* Filters */}
          <CatalogFilters
            filters={catalogFilters}
            mobileOpen={showFilters}
            onMobileOpenChange={setShowFilters}
          />

          {/* Products Grid */}
          <div className="flex-1">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(true)}
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
