"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  ChevronDown,
  ChevronRight,
  SlidersHorizontal,
  Map,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageTitle } from "@/components/ui/PageTitle";
import { Header } from "@/components/widgets/Header";
import { Footer } from "@/components/widgets/Footer";
import { ProductCard } from "@/components/widgets/ProductCard";
import { CatalogFilters } from "@/components/widgets/CatalogFilters";
import { CatalogMapView } from "@/components/widgets/CatalogMapView";
import { catalogProducts } from "@/shared/data/products.data";
import { catalogFilters } from "@/shared/data/filters.data";

export function CatalogClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(catalogProducts);

  const viewMode = searchParams.get("view") === "map" ? "map" : "list";
  const openMap = () => router.push("?view=map");
  const openList = () => router.replace("/catalog");

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* ── List View ─────────────────────────────────────────────── */}
      {viewMode === "list" && (
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

          {/* Desktop: Show on Map button above filters */}
          <div className="hidden lg:flex mb-6">
            <Button variant="outline" onClick={openMap} className="gap-2">
              <Map className="w-4 h-4" />
              Показать на карте
            </Button>
          </div>

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

          {/* Mobile: Fixed bottom "Show on Map" button */}
          <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
            <Button
              variant="primary"
              size="lg"
              onClick={openMap}
              className="shadow-xl rounded-full px-6 gap-2"
            >
              <Map className="w-5 h-5" />
              Показать на карте
            </Button>
          </div>
        </div>
      )}

      {/* ── Map View ──────────────────────────────────────────────── */}
      {viewMode === "map" && (
        <div className="relative w-full h-[calc(100vh-80px)]">
          <CatalogMapView
            products={filteredProducts}
            onSwitchToList={openList}
          />
        </div>
      )}

      {viewMode === "list" && <Footer />}
    </div>
  );
}
