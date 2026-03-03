"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { Heart, MapPin, MessageCircle, X, List } from "lucide-react";
import { Button } from "../ui/button";
import type { ProductCard } from "@/shared/data/products.data";

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

// ─── Compact product card (used in desktop sidebar & mobile bottom‑sheet) ───

function MapProductCard({ product }: { product: ProductCard }) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="flex gap-4 p-4 bg-white hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
    >
      {/* Thumbnail */}
      <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex-shrink-0 rounded-xl overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover"
        />
        {product.popular && (
          <span className="absolute top-1.5 left-1.5 px-2 py-0.5 bg-green-500 text-white text-[10px] rounded-full">
            Популярное
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-sm text-gray-900 line-clamp-2 leading-tight">
              {product.title}
            </h3>
            <button
              className="p-1.5 hover:bg-gray-100 rounded-full flex-shrink-0 transition-colors"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <Heart className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          <div className="flex items-center gap-1.5 mt-1">
            <Heart className="w-3 h-3 text-red-500 fill-red-500" />
            <span className="text-xs font-medium text-gray-900">
              {product.rating}
            </span>
            <span className="text-xs text-gray-400">({product.reviews})</span>
          </div>

          <div className="flex items-center text-xs text-gray-500 mt-1">
            <MapPin className="w-3 h-3 mr-0.5 flex-shrink-0" />
            <span className="truncate">{product.location}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div>
            <span className="text-lg font-bold text-gray-900">
              {product.price}₽
            </span>
            <span className="text-gray-500 text-xs ml-0.5">
              /{product.period}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-500 text-gray-900">
              <MessageCircle className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ─── Main component ─────────────────────────────────────────────────────────

export function CatalogMapView({
  products,
  onSwitchToList,
}: CatalogMapViewProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Selected products for a point (can be multiple at same coords)
  const [selectedProducts, setSelectedProducts] = useState<ProductCard[]>([]);

  // Mobile bottom‑sheet state
  const [sheetOpen, setSheetOpen] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ startY: 0, startH: 0, dragging: false });

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

  // ── Mobile bottom‑sheet drag ───────────────────────

  const handleDragStart = (clientY: number) => {
    if (!sheetRef.current) return;
    dragRef.current = {
      startY: clientY,
      startH: sheetRef.current.offsetHeight,
      dragging: true,
    };
  };

  const handleDragMove = (clientY: number) => {
    if (!dragRef.current.dragging || !sheetRef.current) return;
    const delta = dragRef.current.startY - clientY;
    const newH = Math.max(
      120,
      Math.min(window.innerHeight * 0.85, dragRef.current.startH + delta),
    );
    sheetRef.current.style.height = `${newH}px`;
  };

  const handleDragEnd = () => {
    if (!sheetRef.current) return;
    dragRef.current.dragging = false;
    const h = sheetRef.current.offsetHeight;
    if (h < 120) {
      setSheetOpen(false);
      setSelectedProducts([]);
    }
  };

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
            Показать списком
          </Button>
        </div>
      </div>

      {/* ── Mobile bottom‑sheet ── */}
      {sheetOpen && selectedProducts.length > 0 && (
        <div className="lg:hidden fixed inset-0 z-[60] pointer-events-none">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/30 pointer-events-auto"
            onClick={() => {
              setSheetOpen(false);
              setSelectedProducts([]);
            }}
          />

          {/* Sheet */}
          <div
            ref={sheetRef}
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl pointer-events-auto flex flex-col max-h-[85vh]"
          >
            {/* Drag handle */}
            <div
              className="flex justify-center py-3 cursor-grab active:cursor-grabbing flex-shrink-0"
              onTouchStart={(e) => handleDragStart(e.touches[0].clientY)}
              onTouchMove={(e) => handleDragMove(e.touches[0].clientY)}
              onTouchEnd={handleDragEnd}
              onMouseDown={(e) => {
                handleDragStart(e.clientY);
                const onMove = (ev: MouseEvent) => handleDragMove(ev.clientY);
                const onUp = () => {
                  handleDragEnd();
                  window.removeEventListener("mousemove", onMove);
                  window.removeEventListener("mouseup", onUp);
                };
                window.addEventListener("mousemove", onMove);
                window.addEventListener("mouseup", onUp);
              }}
            >
              <div className="w-10 h-1 rounded-full bg-gray-300" />
            </div>

            {/* Header */}
            <div className="px-4 pb-3 flex items-center justify-between border-b border-gray-100 flex-shrink-0">
              <p className="text-sm font-medium text-gray-900">
                {selectedProducts.length}{" "}
                {selectedProducts.length === 1
                  ? "объявление"
                  : selectedProducts.length < 5
                    ? "объявления"
                    : "объявлений"}
              </p>
              <button
                onClick={() => {
                  setSheetOpen(false);
                  setSelectedProducts([]);
                }}
                className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            {/* Scrollable products */}
            <div className="flex-1 overflow-y-auto">
              {selectedProducts.map((product) => (
                <MapProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      )}

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
            Показать списком
          </Button>
        </div>
      )}
    </div>
  );
}
