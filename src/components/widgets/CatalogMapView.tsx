"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { List } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { BottomSheet } from "../ui/BottomSheet";
import type { ProductCard } from "@/shared/data/products.data";
import { MapProductCard } from "./MapProductCard";

const DEFAULT_CENTER: [number, number] = [55.7558, 37.6173];
const DEFAULT_ZOOM = 12;

declare global {
  interface Window {
    ymaps?: any;
  }
}

interface CatalogMapViewProps {
  products: ProductCard[];
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
    script.src = "https://api-maps.yandex.ru/2.1/?apikey=&lang=ru_RU";
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

  // Selected products for a point (can be multiple at same coords)
  const [selectedProducts, setSelectedProducts] = useState<ProductCard[]>([]);

  // Mobile bottom‑sheet state
  const [sheetOpen, setSheetOpen] = useState(false);

  // ── Map init ───────────────────────────────────────

  const initMap = useCallback(async () => {
    try {
      await loadYandexMapsScript();
      if (!mapContainerRef.current || mapInstanceRef.current) return;

      const ymaps = window.ymaps;

      const map = new ymaps.Map(mapContainerRef.current, {
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
        controls: ["zoomControl", "geolocationControl"],
      });

      mapInstanceRef.current = map;

      // Group products by coordinate key (rounded to ~11 m so same-building items cluster)
      const coordKey = (c: [number, number]) =>
        `${c[0].toFixed(3)},${c[1].toFixed(3)}`;
      const groups = new Map<
        string,
        { coords: [number, number]; items: ProductCard[] }
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

      groups.forEach(({ coords, items }) => {
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
        });

        placemarks.push(placemark);
      });

      clusterer.add(placemarks);
      map.geoObjects.add(clusterer);

      if (placemarks.length > 1) {
        map.setBounds(clusterer.getBounds(), {
          checkZoomRange: true,
          zoomMargin: 40,
        });
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
      <div className="hidden lg:flex flex-col w-[420px] border-r border-gray-200 bg-white h-full overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
          <p className="text-sm font-medium text-gray-900">
            {selectedProducts.length > 0
              ? `${selectedProducts.length} объявлени${selectedProducts.length === 1 ? "е" : selectedProducts.length < 5 ? "я" : "й"}`
              : `Найдено ${products.length} предложений`}
          </p>
          {selectedProducts.length > 0 && (
            <button
              onClick={() => setSelectedProducts([])}
              className="text-xs text-blue-500 hover:underline"
            >
              Показать все
            </button>
          )}
        </div>

        {/* Scrollable list */}
        <div className="flex-1 overflow-y-auto">
          {(selectedProducts.length > 0 ? selectedProducts : products).map(
            (product) => (
              <MapProductCard key={product.id} product={product} />
            ),
          )}
        </div>
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
          isOpen={sheetOpen && selectedProducts.length > 0}
          onClose={() => {
            setSheetOpen(false);
            setSelectedProducts([]);
          }}
          title={
            selectedProducts.length > 0
              ? `${selectedProducts.length} ${
                  selectedProducts.length === 1
                    ? "объявление"
                    : selectedProducts.length < 5
                      ? "объявления"
                      : "объявлений"
                }`
              : undefined
          }
        >
          {selectedProducts.map((product) => (
            <MapProductCard key={product.id} product={product} />
          ))}
        </BottomSheet>
      </div>

      {/* Mobile: "Show as List" button – hidden when bottom sheet is open */}
      {!sheetOpen && (
        <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
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
