"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  ChevronDown,
  ChevronRight,
  SlidersHorizontal,
  Map,
  Check,
  Loader2,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageTitle } from "@/components/ui/PageTitle";
import { Header } from "@/components/widgets/Header";
import { Footer } from "@/components/widgets/Footer";
import { ProductCard } from "@/components/widgets/ProductCard";
import { CatalogFilters } from "@/components/widgets/CatalogFilters";
import { CatalogMapView } from "@/components/widgets/CatalogMapView";
import {
  fetchProducts,
  imageUrl,
  getBasePrice,
  type Product,
} from "@/shared/api/products";
import { catalogFilters } from "@/shared/data/filters.data";

const PAGE_SIZE = 10;

type SortOption = "default" | "cheap" | "expensive" | "date";

export function CatalogClient() {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [sortOpen, setSortOpen] = useState(false);

  // ── Products state ──────────────────────────────────────────────
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const skipRef = useRef(0);
  const loadingRef = useRef(false);
  const hasMoreRef = useRef(true);

  const loadProducts = useCallback(async () => {
    if (loadingRef.current || !hasMoreRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    try {
      const data = await fetchProducts(skipRef.current, PAGE_SIZE);
      setProducts((prev) => [...prev, ...data]);
      skipRef.current += data.length;
      if (data.length < PAGE_SIZE) {
        hasMoreRef.current = false;
        setHasMore(false);
      }
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Infinite scroll ─────────────────────────────────────────────
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadProducts();
      },
      { rootMargin: "200px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadProducts]);

  // ── Sorting ─────────────────────────────────────────────────────
  const SORT_OPTIONS: { value: SortOption; label: string }[] = [
    { value: "default", label: t("catalog.sortDefault") },
    { value: "cheap", label: t("catalog.sortCheap") },
    { value: "expensive", label: t("catalog.sortExpensive") },
    { value: "date", label: t("catalog.sortDate") },
  ];

  const sortedProducts = [...products].sort((a, b) => {
    const pa = getBasePrice(a.prices);
    const pb = getBasePrice(b.prices);
    if (sortBy === "cheap") return pa - pb;
    if (sortBy === "expensive") return pb - pa;
    return 0;
  });

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
                  {t("catalog.filters")}
                </Button>
              </div>

              <div className="flex items-center mb-6">
                {/* Desktop: Show on Map button above filters */}
                <div className="hidden lg:flex">
                  <Button
                    variant="primary"
                    onClick={openMap}
                    className="shadow-xl rounded-full px-6 gap-2"
                  >
                    <Map className="w-5 h-5" />
                    {t("catalog.showOnMap")}
                  </Button>
                </div>

                {/* Results count */}
                <p className="text-sm text-gray-600 ml-4">
                  {t("catalog.foundCount", { count: products.length })}
                </p>

                <div className="sort-select relative ml-auto">
                  <button
                    onClick={() => setSortOpen((o) => !o)}
                    className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    <svg
                      className="w-4 h-4 text-gray-500"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M2 4h12M4 8h8M6 12h4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    {t("catalog.sort")}
                    <ChevronDown
                      className={`w-4 h-4 text-gray-500 transition-transform ${sortOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {sortOpen && (
                    <>
                      {/* Backdrop */}
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setSortOpen(false)}
                      />
                      {/* Dropdown */}
                      <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-20">
                        {SORT_OPTIONS.map((opt) => (
                          <button
                            key={opt.value}
                            onClick={() => {
                              setSortBy(opt.value);
                              setSortOpen(false);
                            }}
                            className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            {opt.label}
                            {sortBy === opt.value && (
                              <Check className="w-4 h-4 text-yellow-500" />
                            )}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    price={getBasePrice(product.prices)}
                    location={product.location[0]?.address ?? ""}
                    owner={product.owner}
                    image={imageUrl(product.images[0] ?? "")}
                  />
                ))}
              </div>

              {/* Infinite scroll sentinel */}
              <div ref={sentinelRef} className="mt-8 flex justify-center py-4">
                {loading && (
                  <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                )}
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
              {t("catalog.showOnMap")}
            </Button>
          </div>
        </div>
      )}

      {/* ── Map View ──────────────────────────────────────────────── */}
      {viewMode === "map" && (
        <div className="relative w-full h-[calc(100vh-80px)]">
          <CatalogMapView
            products={[]}
            onSwitchToList={openList}
          />
        </div>
      )}

      {viewMode === "list" && <Footer />}
    </div>
  );
}
