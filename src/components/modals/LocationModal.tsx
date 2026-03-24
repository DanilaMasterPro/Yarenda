"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { MapPin, Navigation } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

declare global {
  interface Window {
    ymaps?: any;
  }
}

const DEFAULT_CENTER: [number, number] = [55.7558, 37.6173];
const DEFAULT_ZOOM = 12;

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

// Geocode via server-side API route (avoids CORS/key issues)
async function geocodeAddress(
  query: string,
  results = 1,
): Promise<{ name: string; coords: [number, number] }[]> {
  const params = new URLSearchParams({
    geocode: query,
    results: String(results),
  });
  const res = await fetch(`/api/geocode?${params}`);
  if (!res.ok) return [];
  const data = await res.json();
  const members = data?.response?.GeoObjectCollection?.featureMember ?? [];
  return members.map((m: any) => {
    const obj = m.GeoObject;
    const text =
      obj?.metaDataProperty?.GeocoderMetaData?.text ?? obj?.name ?? "";
    const pos = obj?.Point?.pos ?? "";
    const [lon, lat] = pos.split(" ").map(Number);
    return { name: text, coords: [lat, lon] as [number, number] };
  });
}

// Reverse geocode via server-side API route
async function reverseGeocodePoint(point: [number, number]): Promise<string> {
  const params = new URLSearchParams({
    geocode: `${point[1]},${point[0]}`,
    results: "1",
  });
  const res = await fetch(`/api/geocode?${params}`);
  if (!res.ok) return "";
  const data = await res.json();
  const obj =
    data?.response?.GeoObjectCollection?.featureMember?.[0]?.GeoObject;
  return obj?.metaDataProperty?.GeocoderMetaData?.text ?? obj?.name ?? "";
}

export interface LocationSelectData {
  address: string;
  coords: [number, number];
}

interface LocationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** When provided, the modal returns the selected address + coords via callback */
  onLocationSelect?: (data: LocationSelectData) => void;
  /** When true, hides circle/radius and adjusts title for address picking */
  pickerMode?: boolean;
}

export function LocationModal({
  open,
  onOpenChange,
  onLocationSelect,
  pickerMode = false,
}: LocationModalProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const circleRef = useRef<any>(null);
  const boundsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const suggestTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isUserTypingRef = useRef(false);
  const skipNextBoundsChangeRef = useRef(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<
    { displayName: string; value: string }[]
  >([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [locationName, setLocationName] = useState("");
  const [coords, setCoords] = useState<[number, number]>(DEFAULT_CENTER);
  const [radiusInput, setRadiusInput] = useState("10");
  const [isMapReady, setIsMapReady] = useState(false);

  const radiusKm = Math.max(1, parseInt(radiusInput, 10) || 1);
  const radiusMeters = radiusKm * 1000;

  // Reverse geocode via HTTP API
  const reverseGeocode = useCallback((point: [number, number]) => {
    reverseGeocodePoint(point).then((name) => {
      if (!name) return;
      setLocationName(name);
      if (!isUserTypingRef.current) {
        setSearchQuery(name);
      }
    });
  }, []);

  // Update circle geometry
  const updateCircle = useCallback((center: [number, number], r: number) => {
    if (!circleRef.current || !mapInstanceRef.current) return;
    circleRef.current.geometry.setCoordinates(center);
    circleRef.current.geometry.setRadius(r);
  }, []);

  // Fetch suggestions via HTTP Geocoder
  const fetchSuggestions = useCallback((query: string) => {
    if (!query.trim() || query.length < 2) {
      setSuggestions([]);
      return;
    }
    geocodeAddress(query, 5).then((items) => {
      const mapped = items
        .filter((i) => i.name)
        .map((i) => ({ displayName: i.name, value: i.name }));
      setSuggestions(mapped);
      setShowSuggestions(mapped.length > 0);
    });
  }, []);

  // Select a suggestion → geocode it and move map
  const selectSuggestion = useCallback(
    (value: string) => {
      setSearchQuery(value);
      setSuggestions([]);
      setShowSuggestions(false);
      isUserTypingRef.current = false;
      geocodeAddress(value, 1).then((results) => {
        if (results.length === 0) return;
        const { name, coords: point } = results[0];
        setCoords(point);
        setLocationName(name);
        setSearchQuery(name);
        if (mapInstanceRef.current) {
          skipNextBoundsChangeRef.current = true;
          mapInstanceRef.current.setCenter(point);
        }
        updateCircle(point, radiusMeters);
      });
    },
    [radiusMeters, updateCircle],
  );

  // Search / geocode on Enter
  const handleSearch = useCallback(() => {
    if (!searchQuery.trim()) return;
    setShowSuggestions(false);
    isUserTypingRef.current = false;
    geocodeAddress(searchQuery, 1).then((results) => {
      if (results.length === 0) return;
      const { name, coords: point } = results[0];
      setCoords(point);
      setLocationName(name);
      setSearchQuery(name);
      if (mapInstanceRef.current) {
        skipNextBoundsChangeRef.current = true;
        mapInstanceRef.current.setCenter(point);
      }
      updateCircle(point, radiusMeters);
    });
  }, [searchQuery, radiusMeters, updateCircle]);

  // Use browser geolocation
  const handleUseMyLocation = useCallback(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const point: [number, number] = [
          position.coords.latitude,
          position.coords.longitude,
        ];
        setCoords(point);
        if (mapInstanceRef.current) {
          skipNextBoundsChangeRef.current = true;
          mapInstanceRef.current.setCenter(point);
        }
        updateCircle(point, radiusMeters);
        reverseGeocode(point);
      },
      () => {
        // geolocation denied or unavailable
      },
    );
  }, [radiusMeters, updateCircle, reverseGeocode]);

  // Initialize the map
  useEffect(() => {
    if (!open) return;

    let destroyed = false;

    const init = async () => {
      try {
        await loadYandexMapsScript();
        if (destroyed || !mapContainerRef.current || mapInstanceRef.current)
          return;

        const ymaps = window.ymaps;

        const map = new ymaps.Map(mapContainerRef.current, {
          center: coords,
          zoom: DEFAULT_ZOOM,
          controls: ["zoomControl"],
        });
        mapInstanceRef.current = map;

        // Radius circle — only for global search mode
        if (!pickerMode) {
          const circle = new ymaps.Circle(
            [coords, radiusMeters],
            {},
            {
              fillColor: "rgba(59, 130, 246, 0.1)",
              strokeColor: "rgba(59, 130, 246, 0.4)",
              strokeWidth: 2,
            },
          );
          circleRef.current = circle;
          map.geoObjects.add(circle);
        }

        // When map center changes (user drag/zoom), reverse geocode the new center
        map.events.add("boundschange", () => {
          if (skipNextBoundsChangeRef.current) {
            skipNextBoundsChangeRef.current = false;
            return;
          }
          if (boundsTimerRef.current) clearTimeout(boundsTimerRef.current);
          boundsTimerRef.current = setTimeout(() => {
            const center = map.getCenter();
            setCoords(center);
            if (circleRef.current) {
              circleRef.current.geometry.setCoordinates(center);
            }
            isUserTypingRef.current = false;
            reverseGeocode(center);
          }, 400);
        });

        setIsMapReady(true);
        reverseGeocode(coords);
      } catch (error) {
        console.error("Yandex Maps init error:", error);
      }
    };

    const timer = setTimeout(init, 150);

    return () => {
      destroyed = true;
      clearTimeout(timer);
      if (boundsTimerRef.current) clearTimeout(boundsTimerRef.current);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
        mapInstanceRef.current = null;
        circleRef.current = null;
        setIsMapReady(false);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Sync radius change to circle + fit bounds (only in global search mode)
  useEffect(() => {
    if (pickerMode) return;
    if (!isMapReady || !circleRef.current || !mapInstanceRef.current) return;
    circleRef.current.geometry.setRadius(radiusMeters);
    const bounds = circleRef.current.geometry.getBounds();
    if (bounds) {
      skipNextBoundsChangeRef.current = true;
      mapInstanceRef.current.setBounds(bounds, {
        checkZoomRange: true,
        zoomMargin: 40,
      });
    }
  }, [radiusMeters, isMapReady]);

  const handleApply = () => {
    if (onLocationSelect) {
      onLocationSelect({ address: locationName, coords });
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 overflow-x-hidden">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-2xl text-center">
            {pickerMode ? "Выберите адрес" : "Где вы хотите арендовать?"}
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 pb-6 min-w-0">
          <p className="text-sm text-gray-500 mb-3">
            {pickerMode
              ? "Найдите адрес или переместите карту"
              : "Поиск по городу, району или почтовому индексу"}
          </p>

          {/* Search Input with suggestions */}
          <div className="relative mb-4">
            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 z-10" />
            <Input
              type="text"
              placeholder="Выберите местоположение"
              className="pl-12 h-12"
              value={searchQuery}
              onChange={(e) => {
                const val = e.target.value;
                setSearchQuery(val);
                isUserTypingRef.current = true;
                if (suggestTimerRef.current)
                  clearTimeout(suggestTimerRef.current);
                suggestTimerRef.current = setTimeout(
                  () => fetchSuggestions(val),
                  300,
                );
              }}
              onFocus={() => {
                if (suggestions.length > 0) setShowSuggestions(true);
              }}
              onBlur={() => {
                setTimeout(() => setShowSuggestions(false), 200);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSearch();
                }
              }}
            />
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg py-1 max-h-48 overflow-y-auto">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors flex items-start gap-2"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => selectSuggestion(s.value)}
                  >
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                    <span className="truncate">{s.displayName}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Radius Input — hidden in picker mode */}
          {!pickerMode && (
            <div className="relative mb-4">
              <label className="text-xs text-gray-500 absolute left-4 top-1.5 z-10">
                Радиус
              </label>
              <Input
                type="number"
                min={1}
                max={500}
                value={radiusInput}
                onChange={(e) => setRadiusInput(e.target.value)}
                onBlur={() => {
                  const val = parseInt(radiusInput, 10);
                  if (isNaN(val) || val < 1) setRadiusInput("1");
                }}
                className="h-12 pt-5 pl-4 pr-16"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 pointer-events-none">
                км
              </span>
            </div>
          )}

          {/* Yandex Map with center-pinned marker */}
          <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden">
            <div ref={mapContainerRef} className="w-full h-full" />

            {/* Fixed center pin — always in the middle of the map */}
            {isMapReady && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full z-10 pointer-events-none">
                <MapPin className="w-10 h-10 text-red-500 drop-shadow-lg" />
              </div>
            )}

            {!isMapReady && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-2 animate-pulse" />
                  <p className="text-gray-400 text-sm">Загрузка карты…</p>
                </div>
              </div>
            )}

            {/* Geolocation button */}
            <button
              onClick={handleUseMyLocation}
              className="absolute top-3 right-3 z-10 w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
              title="Моё местоположение"
            >
              <Navigation className="w-5 h-5 text-blue-500" />
            </button>
          </div>

          {/* Location label */}
          {locationName && (
            <p className="mt-2 text-sm text-gray-600 truncate">
              <MapPin className="inline w-4 h-4 mr-1 -mt-0.5" />
              {locationName}
            </p>
          )}

          {/* Apply Button */}
          <div className="mt-4 flex justify-end">
            <Button onClick={handleApply} className="px-8">
              {pickerMode ? "Сохранить" : "Применить"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
