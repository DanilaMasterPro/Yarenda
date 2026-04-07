"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { List, ArrowLeft, SlidersHorizontal, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { BottomSheet } from "../ui/BottomSheet";
import { CatalogFilters } from "./CatalogFilters";
import type { ProductCardData } from "@/shared/types/product.types";
import { catalogFilters } from "@/shared/data/filters.data";
import { MapProductCard } from "./MapProductCard";

const DEFAULT_CENTER: [number, number] = [55.7558, 37.6173];
const DEFAULT_ZOOM = 12;

declare global {
  interface Window {
    ymaps?: any;
  }
}

interface CatalogMapViewProps {
  products: ProductCardData[];
  onSwitchToList: () => void;
}

// ─── Yandex Maps loader ─────────────────────────────────────────────────────

function loadYandexMapsScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.ymaps) {
      window.ymaps.ready(resolve);
      return;
    }

    const existingScript = document.querySelector(
      'script[src*="api-maps.yandex.ru"]',
    );
    if (existingScript) {
      const check = () => {
        if (window.ymaps) {
          window.ymaps.ready(resolve);
        } else {
          setTimeout(check, 100);
        }
      };
      check();
      return;
    }

    const script = document.createElement("script");
    script.src = `https://api-maps.yandex.ru/2.1/?apikey=${process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY}&lang=ru_RU`;
    script.async = true;
    script.onload = () => {
      if (window.ymaps) {
        window.ymaps.ready(resolve);
      }
    };
    script.onerror = () => reject(new Error("Failed to load Yandex Maps"));
    document.head.appendChild(script);
  });
}

// ─── Main component ─────────────────────────────────────────────────────────

export function CatalogMapView({
  products,
  onSwitchToList,
}: CatalogMapViewProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Stable refs so Yandex Maps event closures always see the latest values
  const routerRef = useRef(router);
  const searchParamsRef = useRef(searchParams);
  useEffect(() => {
    routerRef.current = router;
    searchParamsRef.current = searchParams;
  });

  // Selected products for a point (can be multiple at same coords)
  const [selectedProducts, setSelectedProducts] = useState<ProductCardData[]>([]);

  // Mobile bottom‑sheet state
  const [sheetOpen, setSheetOpen] = useState(false);

  // Desktop sidebar filters panel
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Mobile filters panel (inside bottom sheet)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // ── URL helpers ─────────────────────────────────────

  const clearPoint = useCallback(() => {
    setSelectedProducts([]);

    const params = new URLSearchParams(searchParamsRef.current.toString());
    params.delete("point");
    routerRef.current.replace(`?${params.toString()}`, { scroll: false });
  }, []);

  const closeSheet = useCallback(() => {
    setSheetOpen(false);
    clearPoint();
  }, [clearPoint]);

  // ── Map init ───────────────────────────────────────

  const initMap = useCallback(async () => {
    try {
      await loadYandexMapsScript();
      if (!mapContainerRef.current || mapInstanceRef.current) return;

      const ymaps = window.ymaps;

      // Snapshot URL params before any async work
      const latParam = searchParamsRef.current.get("lat");
      const lngParam = searchParamsRef.current.get("lng");
      const zoomParam = searchParamsRef.current.get("zoom");
      const pointParam = searchParamsRef.current.get("point");

      const initialCenter: [number, number] =
        latParam && lngParam
          ? [parseFloat(latParam), parseFloat(lngParam)]
          : DEFAULT_CENTER;
      const initialZoom = zoomParam ? parseInt(zoomParam) : DEFAULT_ZOOM;

      const map = new ymaps.Map(mapContainerRef.current, {
        center: initialCenter,
        zoom: initialZoom,
        controls: ["zoomControl", "geolocationControl"],
      });

      mapInstanceRef.current = map;

      // Group products by coordinate key (rounded to ~11 m so same-building items cluster)
      const coordKey = (c: [number, number]) =>
        `${c[0].toFixed(3)},${c[1].toFixed(3)}`;
      const groups = new Map<
        string,
        { coords: [number, number]; items: ProductCardData[] }
      >();

      products.forEach((product) => {
        const coords = product.coords;
        if (!coords) return;
        const key = coordKey(coords);
        if (!groups.has(key)) {
          groups.set(key, { coords, items: [] });
        }
        groups.get(key)!.items.push(product);
      });

      const clusterer = new ymaps.Clusterer({
        preset: "islands#invertedBlueClusterIcons",
        groupByCoordinates: false,
        clusterDisableClickZoom: false,
        clusterOpenBalloonOnClick: false,
        maxZoom: 14,
      });

      const placemarks: any[] = [];

      groups.forEach(({ coords, items }, key) => {
        const label =
          items.length > 1
            ? `${items.length} от ${Math.min(...items.map((i) => Number(i.price)))}₽`
            : `${items[0].price}₽`;

        const placemark = new ymaps.Placemark(
          coords,
          {
            iconContent: label,
          },
          {
            preset: "islands#blueStretchyIcon",
          },
        );

        placemark.events.add("click", () => {
          setSelectedProducts(items);
          setSheetOpen(true);
          // Capture current map state and write to URL
          const center = mapInstanceRef.current?.getCenter() ?? DEFAULT_CENTER;
          const zoom = mapInstanceRef.current?.getZoom() ?? DEFAULT_ZOOM;
          const params = new URLSearchParams(
            searchParamsRef.current.toString(),
          );
          params.set("zoom", String(Math.round(zoom)));
          params.set("lat", (center[0] as number).toFixed(4));
          params.set("lng", (center[1] as number).toFixed(4));
          params.set("point", key);
          routerRef.current.replace(`?${params.toString()}`, { scroll: false });
        });

        placemarks.push(placemark);
      });

      clusterer.add(placemarks);
      map.geoObjects.add(clusterer);

      // Only auto-fit bounds on first load — skip when restoring a saved position
      if (placemarks.length > 1 && !latParam) {
        map.setBounds(clusterer.getBounds(), {
          checkZoomRange: true,
          zoomMargin: 40,
        });
      }

      // Restore active point from URL (page reload / back-navigation)
      if (pointParam && groups.has(pointParam)) {
        setSelectedProducts(groups.get(pointParam)!.items);
        setSheetOpen(true);
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Yandex Maps init error:", error);
      setIsLoading(false);
    }
  }, [products]);

  useEffect(() => {
    initMap();
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
        mapInstanceRef.current = null;
      }
    };
  }, [initMap]);

  // ── Render ─────────────────────────────────────────

  return (
    <div className="relative w-full h-full flex">
      {/* ── Desktop sidebar (left panel with product list) ── */}
      <div className="hidden lg:flex flex-col w-[420px] border-r border-gray-200 bg-white h-full overflow-hidden relative">
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2 flex-shrink-0">
          {/* Back arrow — only when a pin is selected */}
          {selectedProducts.length > 0 && (
            <button
              onClick={clearPoint}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
            >
              <ArrowLeft className="w-4 h-4 text-gray-500" />
            </button>
          )}

          <p className="text-sm font-medium text-gray-900 flex-1 min-w-0 truncate">
            {selectedProducts.length > 0
              ? `${selectedProducts.length} объявлени${selectedProducts.length === 1 ? "е" : selectedProducts.length < 5 ? "я" : "й"}`
              : `Найдено ${products.length} предложений`}
          </p>

          {/* Filters button */}
          <button
            onClick={() => setFiltersOpen(true)}
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-900 transition-colors flex-shrink-0 ml-auto"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            {t("catalog.filters")}
          </button>
        </div>

        {/* Scrollable list */}
        <div className="flex-1 overflow-y-auto">
          {(selectedProducts.length > 0 ? selectedProducts : products).map(
            (product) => (
              <MapProductCard key={product.id} product={product} />
            ),
          )}
        </div>

        {/* ── Filters overlay panel ── */}
        {filtersOpen && (
          <div className="absolute inset-0 bg-white flex flex-col z-10">
            {/* Panel header */}
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
              <p className="text-sm font-semibold text-gray-900">
                {t("catalog.filters")}
              </p>
              <button
                onClick={() => setFiltersOpen(false)}
                className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            {/* Filters content */}
            <div className="flex-1 min-h-0 px-4 py-4">
              <CatalogFilters
                filters={catalogFilters}
                mobileOpen={false}
                onMobileOpenChange={() => {}}
                variant="inline"
              />
            </div>
          </div>
        )}
      </div>

      {/* ── Map ── */}
      <div className="flex-1 relative">
        <div ref={mapContainerRef} className="w-full h-full min-h-[400px]" />

        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-3 border-yellow-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-gray-600">Загрузка карты...</p>
            </div>
          </div>
        )}

        {/* Desktop: "Show as List" button pinned at bottom of map area */}
        <div className="hidden lg:block absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
          <Button
            variant="outline"
            size="lg"
            onClick={onSwitchToList}
            className="bg-white shadow-xl rounded-full px-6 gap-2"
          >
            <List className="w-5 h-5" />
            {t("catalog.showAsList")}
          </Button>
        </div>
      </div>

      {/* ── Mobile bottom‑sheet ── */}
      <div className="lg:hidden">
        <BottomSheet
          isOpen={
            sheetOpen && (selectedProducts.length > 0 || products.length > 0)
          }
          onOpen={() => setSheetOpen(true)}
          onClose={closeSheet}
          onFilters={() => setMobileFiltersOpen(true)}
          closeButton={selectedProducts.length > 0}
          title={
            selectedProducts.length > 0 || products.length > 0
              ? `${selectedProducts.length > 0 ? selectedProducts.length : products.length} ${
                  selectedProducts.length === 1
                    ? "объявление"
                    : selectedProducts.length < 5
                      ? "объявления"
                      : "объявлений"
                }`
              : undefined
          }
        >
          {(selectedProducts.length > 0 ? selectedProducts : products).map(
            (product) => (
              <MapProductCard key={product.id} product={product} />
            ),
          )}
        </BottomSheet>
      </div>

      {/* Mobile: filters overlay */}
      {mobileFiltersOpen && (
        <div className="lg:hidden fixed inset-0 z-[70] bg-white flex flex-col">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-gray-500" />
            </button>
            <p className="text-sm font-semibold text-gray-900">
              {t("catalog.filters")}
            </p>
          </div>
          <div className="flex-1 min-h-0 px-4 py-4">
            <CatalogFilters
              filters={catalogFilters}
              mobileOpen={false}
              onMobileOpenChange={() => {}}
              variant="inline"
            />
          </div>
        </div>
      )}

      {/* Mobile: "Show as List" button – hidden when bottom sheet is open */}
      {!sheetOpen && (
        <div className="lg:hidden fixed bottom-12 left-1/2 -translate-x-1/2 z-50">
          <Button
            variant="primary"
            size="lg"
            onClick={onSwitchToList}
            className="shadow-xl rounded-full px-6 gap-2"
          >
            <List className="w-5 h-5" />
            {t("catalog.showAsList")}
          </Button>
        </div>
      )}
    </div>
  );
}
