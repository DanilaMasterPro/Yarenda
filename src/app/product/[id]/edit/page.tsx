"use client";

import { useState, useCallback, useEffect, type FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ChevronDown,
  ChevronRight,
  Plus,
  Trash2,
  MapPin,
  Save,
  ArrowLeft,
  X,
  Pencil,
  Info,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUpload, type ImageUploadFile } from "@/components/ui/ImageUpload";
import { Header } from "@/components/widgets/Header";
import { Footer } from "@/components/widgets/Footer";
import { useAuth } from "@/hooks/useAuth";
import {
  LocationModal,
  type LocationSelectData,
} from "@/components/modals/LocationModal";
import { allCategories } from "@/shared/data/categories";
import { cn } from "@/components/ui/utils";
import {
  createLocationRequest,
  updateLocationRequest,
  deleteLocationRequest,
  createProductRequest,
  getUserLocationsRequest,
} from "@/shared/api";
import { uploadFilesRequest } from "@/shared/api/uploads";
// ── Constants ────────────────────────────────────────────────────────────────

const TITLE_MAX_LENGTH = 100;
const DESCRIPTION_MAX_LENGTH = 2000;
const MAX_PRICE_OPTIONS = 5;
const MAX_LOCATIONS = 5;
const MAX_IMAGES = 10;

const CANCELLATION_POLICIES = [
  {
    id: "flexible" as const,
    label: "Гибкие",
    description:
      "При отмене за 2 дня до начала аренды — 100% возврат. При отмене за 1 день — возврат 50%.",
  },
  {
    id: "medium" as const,
    label: "Средние",
    description:
      "При отмене за 7 дней до начала аренды — 100% возврат. При отмене за 3 дня — возврат 50%.",
  },
  {
    id: "strict" as const,
    label: "Строгие",
    description:
      "При отмене за 30 дней до начала аренды — 100% возврат. При отмене за 14 дней — возврат 50%.",
  },
] as const;

type CancellationPolicy = (typeof CANCELLATION_POLICIES)[number]["id"];

// ── Types ────────────────────────────────────────────────────────────────────

interface PriceOption {
  id: string;
  period: string;
  price: string;
}

interface LocationItem {
  id: string;
  name: string;
  address: string;
  coords?: [number, number];
}

interface FormState {
  categorySlug: string;
  subcategory: string;
  title: string;
  description: string;
  cancellationPolicy: CancellationPolicy;
  marketValue: string;
}

interface FormErrors {
  category?: string;
  title?: string;
  description?: string;
  images?: string;
  pricing?: string;
  locations?: string;
  cancellationPolicy?: string;
  marketValue?: string;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function sanitizeText(value: string): string {
  return value.replace(/[<>"'&]/g, "");
}

function generateId(): string {
  return Math.random().toString(36).slice(2, 10);
}

// ── Step section ─────────────────────────────────────────────────────────────

interface StepSectionProps {
  number: number;
  title: string;
  subtitle?: string;
  error?: string;
  children: React.ReactNode;
}

function StepSection({
  number,
  title,
  subtitle,
  error,
  children,
}: StepSectionProps) {
  return (
    <section className="relative py-8 border-b border-gray-200 last:border-b-0">
      <div
        className={cn(
          "flex gap-4 mb-5",
          subtitle ? "items-start" : "items-center",
        )}
      >
        <div className="w-9 h-9 rounded-full bg-yellow-500 text-gray-900 flex items-center justify-center text-sm font-bold shrink-0">
          {number}
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
      </div>
      <div className="ml-0 sm:ml-[52px]">
        {children}
        {error && (
          <p className="text-sm text-red-600 mt-2" data-error>
            {error}
          </p>
        )}
      </div>
    </section>
  );
}

// ── Page component ───────────────────────────────────────────────────────────

export default function ProductEditPage() {
  const { id } = useParams();
  const router = useRouter();
  const isNew = id === "new";
  const { user, isLoading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/");
    }
  }, [authLoading, user, router]);

  // ── Form state ─────────────────────────────────────────────────────────

  const [form, setForm] = useState<FormState>({
    categorySlug: "",
    subcategory: "",
    title: "",
    description: "",
    cancellationPolicy: "flexible",
    marketValue: "",
  });

  const [images, setImages] = useState<ImageUploadFile[]>([]);
  const [priceOptions, setPriceOptions] = useState<PriceOption[]>([
    { id: generateId(), period: "", price: "" },
  ]);
  const [locations, setLocations] = useState<LocationItem[]>([]);
  const [checkedLocationIds, setCheckedLocationIds] = useState<Set<string>>(
    new Set(),
  );
  const [locationsLoading, setLocationsLoading] = useState(true);
  const [locationSaving, setLocationSaving] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [deletingLocationId, setDeletingLocationId] = useState<string | null>(
    null,
  );
  const [deleteErrorModalOpen, setDeleteErrorModalOpen] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // ── Category UI state ──────────────────────────────────────────────────

  const [categoryOpen, setCategoryOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  // ── Location modal state ───────────────────────────────────────────────

  const [locationMapOpen, setLocationMapOpen] = useState(false);
  const [locationNameOpen, setLocationNameOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState<LocationItem | null>(
    null,
  );
  const [pendingLocationData, setPendingLocationData] =
    useState<LocationSelectData | null>(null);
  const [locationNameInput, setLocationNameInput] = useState("");

  // ── Load user locations on mount ───────────────────────────────────────

  useEffect(() => {
    let cancelled = false;
    setLocationsLoading(true);
    getUserLocationsRequest()
      .then((data) => {
        if (cancelled) return;
        const items: LocationItem[] = data.map((l) => ({
          id: l.id,
          name: l.name,
          address: l.address,
          coords: l.coords,
        }));
        setLocations(items);
        // Auto-check the first location
        if (items.length > 0) {
          setCheckedLocationIds(new Set([items[0].id]));
        }
      })
      .catch(() => {
        // User may not be logged in yet — just leave empty
      })
      .finally(() => {
        if (!cancelled) setLocationsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // ── Derived ────────────────────────────────────────────────────────────

  const selectedCategory = allCategories.find(
    (c) => c.slug === form.categorySlug,
  );
  const selectedSubcategoryObj = selectedCategory?.subcategories.find(
    (s) => s.name === form.subcategory,
  );

  const categoryLabel = selectedSubcategoryObj
    ? `${selectedCategory!.title} → ${selectedSubcategoryObj.name}`
    : selectedCategory
      ? selectedCategory.title
      : "";

  // ── Field handlers ─────────────────────────────────────────────────────

  const handleChange = useCallback(
    (field: keyof FormState) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const raw = e.target.value;
        const value = field === "marketValue" ? raw : sanitizeText(raw);
        setForm((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      },
    [],
  );

  const selectCategory = useCallback((slug: string, subcategory: string) => {
    setForm((prev) => ({ ...prev, categorySlug: slug, subcategory }));
    setCategoryOpen(false);
    setErrors((prev) => ({ ...prev, category: undefined }));
  }, []);

  // ── Price option handlers ──────────────────────────────────────────────

  const updatePriceOption = useCallback(
    (optionId: string, field: "period" | "price", value: string) => {
      if (field === "period") {
        const duplicate = priceOptions.some(
          (o) => o.id !== optionId && o.period !== "" && o.period === value,
        );
        if (duplicate) return;
      }
      setPriceOptions((prev) =>
        prev.map((o) => (o.id === optionId ? { ...o, [field]: value } : o)),
      );
      setErrors((prev) => ({ ...prev, pricing: undefined }));
    },
    [priceOptions],
  );

  const addPriceOption = useCallback(() => {
    if (priceOptions.length >= MAX_PRICE_OPTIONS) return;
    setPriceOptions((prev) => [
      ...prev,
      { id: generateId(), period: "", price: "" },
    ]);
  }, [priceOptions.length]);

  const removePriceOption = useCallback(
    (optionId: string) => {
      if (priceOptions.length <= 1) return;
      setPriceOptions((prev) => prev.filter((o) => o.id !== optionId));
    },
    [priceOptions.length],
  );

  // ── Location handlers ──────────────────────────────────────────────────

  const openAddLocation = useCallback(() => {
    setEditingLocation(null);
    setLocationNameInput("");
    setLocationError(null);
    setLocationMapOpen(true);
  }, []);

  const openEditLocation = useCallback((loc: LocationItem) => {
    setEditingLocation(loc);
    setLocationNameInput(loc.name);
    setLocationError(null);
    setLocationMapOpen(true);
  }, []);

  const handleLocationSelected = useCallback(
    (data: LocationSelectData) => {
      console.log("Location selected:", data);
      setPendingLocationData(data);
      if (editingLocation) {
        setLocationNameInput(editingLocation.name);
      }
      setLocationNameOpen(true);
    },
    [editingLocation],
  );

  const saveLocation = useCallback(async () => {
    const name = locationNameInput.trim();
    if (!name || !pendingLocationData) return;

    const address = pendingLocationData.address;
    const coords = pendingLocationData.coords;

    setLocationSaving(true);
    setLocationError(null);

    try {
      if (editingLocation) {
        // Update existing location via API
        const updated = await updateLocationRequest({
          id: editingLocation.id,
          name,
          address,
          coords: coords ?? [0, 0],
        });
        setLocations((prev) =>
          prev.map((l) =>
            l.id === editingLocation.id
              ? {
                  ...l,
                  name: updated.name,
                  address: updated.address,
                  coords: updated.coords,
                }
              : l,
          ),
        );
      } else {
        // Create new location via API
        const created = await createLocationRequest({
          name,
          address,
          coords: coords ?? [0, 0],
        });
        setLocations((prev) => [
          ...prev,
          {
            id: created.id,
            name: created.name,
            address: created.address,
            coords: created.coords,
          },
        ]);
        // Auto-check newly created locations
        setCheckedLocationIds((prev) => new Set([...prev, created.id]));
      }

      setLocationNameOpen(false);
      setPendingLocationData(null);
      setErrors((prev) => ({ ...prev, locations: undefined }));
    } catch (err) {
      setLocationError(
        err instanceof Error ? err.message : "Не удалось сохранить локацию",
      );
    } finally {
      setLocationSaving(false);
    }
  }, [locationNameInput, pendingLocationData, editingLocation]);

  const removeLocation = useCallback(async (locationId: string) => {
    setDeletingLocationId(locationId);
    setLocationError(null);

    try {
      await deleteLocationRequest(locationId);
      setLocations((prev) => prev.filter((l) => l.id !== locationId));
      setCheckedLocationIds((prev) => {
        const next = new Set(prev);
        next.delete(locationId);
        return next;
      });
    } catch {
      setDeleteErrorModalOpen(true);
    } finally {
      setDeletingLocationId(null);
    }
  }, []);

  const toggleLocationChecked = useCallback((locationId: string) => {
    setCheckedLocationIds((prev) => {
      const next = new Set(prev);
      if (next.has(locationId)) {
        // Don't allow unchecking the last one
        if (next.size <= 1) return prev;
        next.delete(locationId);
      } else {
        next.add(locationId);
      }
      return next;
    });
    setErrors((prev) => ({ ...prev, locations: undefined }));
  }, []);

  // ── Validation ─────────────────────────────────────────────────────────

  function validate(): FormErrors {
    const errs: FormErrors = {};

    if (!form.categorySlug || !form.subcategory) {
      errs.category = "Выберите категорию и подкатегорию";
    }

    const title = form.title.trim();
    if (!title) {
      errs.title = "Введите название";
    } else if (title.length > TITLE_MAX_LENGTH) {
      errs.title = `Максимум ${TITLE_MAX_LENGTH} символов`;
    }

    const desc = form.description.trim();
    if (!desc) {
      errs.description = "Введите описание";
    } else if (desc.length > DESCRIPTION_MAX_LENGTH) {
      errs.description = `Максимум ${DESCRIPTION_MAX_LENGTH} символов`;
    }

    if (images.length === 0) {
      errs.images = "Добавьте хотя бы одно фото";
    }

    const filledOptions = priceOptions.filter(
      (o) => o.period.trim() && o.price.trim(),
    );
    if (filledOptions.length === 0) {
      errs.pricing = "Заполните хотя бы один вариант цены";
    }
    for (const opt of priceOptions) {
      if (opt.period.trim() || opt.price.trim()) {
        if (!opt.period.trim() || !opt.price.trim()) {
          errs.pricing = "Заполните оба поля в каждом варианте цены";
          break;
        }
        if (isNaN(Number(opt.price)) || Number(opt.price) <= 0) {
          errs.pricing = "Цена должна быть положительным числом";
          break;
        }
      }
    }

    if (locations.length === 0 || checkedLocationIds.size === 0) {
      errs.locations = "Выберите хотя бы одну локацию";
    }

    if (!form.cancellationPolicy) {
      errs.cancellationPolicy = "Выберите условия отмены";
    }

    const mv = form.marketValue.trim();
    if (!mv) {
      errs.marketValue = "Укажите рыночную стоимость";
    } else if (isNaN(Number(mv)) || Number(mv) <= 0) {
      errs.marketValue = "Укажите корректную стоимость";
    }

    return errs;
  }

  // ── Submit ─────────────────────────────────────────────────────────────

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitError(null);

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const firstErrorEl = document.querySelector("[data-error]");
      firstErrorEl?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setIsSubmitting(true);

    try {
      // All locations are already persisted — just collect checked IDs
      const locationIds = locations
        .filter((l) => checkedLocationIds.has(l.id))
        .map((l) => l.id);

      // Upload images
      const imageUrls = await uploadFilesRequest(images.map((img) => img.file));

      // Step 3: Create product with location IDs and uploaded image URLs
      const filledPrices = priceOptions
        .filter((o) => o.period.trim() && o.price.trim())
        .map((o) => ({ fromDays: Number(o.period), price: Number(o.price) }));

      await createProductRequest({
        category: form.subcategory,
        title: form.title.trim(),
        description: form.description.trim(),
        prices: filledPrices,
        locationIds,
        cancelCondition: form.cancellationPolicy,
        marketPrice: Number(form.marketValue),
        images: imageUrls,
      });

      router.push("/catalog");
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Не удалось создать объявление",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  // ── Render ─────────────────────────────────────────────────────────────

  if (!authLoading && !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl ml-0 ">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {isNew ? "Создать объявление" : "Редактировать объявление"}
            </h1>
            <p className="text-gray-600">
              Заполните все поля, чтобы разместить ваше объявление
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-0" noValidate>
            {/* ═══ Step 1: Category ═══════════════════════════════════════ */}
            <StepSection
              number={1}
              title="Выберите категорию"
              error={errors.category}
            >
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setCategoryOpen((o) => !o)}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-3 rounded-xl border text-left transition-colors",
                    errors.category
                      ? "border-red-400 bg-red-50"
                      : "border-gray-300 bg-white hover:border-yellow-400",
                  )}
                >
                  <span
                    className={
                      categoryLabel ? "text-gray-900" : "text-gray-400"
                    }
                  >
                    {categoryLabel || "Выберите категорию"}
                  </span>
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 text-gray-400 transition-transform",
                      categoryOpen && "rotate-180",
                    )}
                  />
                </button>

                {categoryOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setCategoryOpen(false)}
                    />
                    <div className="absolute z-20 mt-2 w-full bg-white rounded-xl border border-gray-200 shadow-lg max-h-80 overflow-y-auto">
                      {allCategories.map((cat) => (
                        <div key={cat.slug}>
                          <button
                            type="button"
                            onClick={() => {
                              setExpandedCategory((prev) =>
                                prev === cat.slug ? null : cat.slug,
                              );
                            }}
                            className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
                          >
                            <span className="font-medium text-gray-900">
                              {cat.title}
                            </span>
                            <ChevronRight
                              className={cn(
                                "w-4 h-4 text-gray-400 transition-transform",
                                expandedCategory === cat.slug && "rotate-90",
                              )}
                            />
                          </button>
                          {expandedCategory === cat.slug && (
                            <div className="bg-gray-50">
                              {cat.subcategories.map((sub) => {
                                const Icon = sub.icon;
                                return (
                                  <button
                                    type="button"
                                    key={sub.name}
                                    onClick={() =>
                                      selectCategory(cat.slug, sub.name)
                                    }
                                    className={cn(
                                      "w-full flex items-center gap-3 px-6 py-2.5 text-sm hover:bg-yellow-50 transition-colors",
                                      form.subcategory === sub.name &&
                                        form.categorySlug === cat.slug
                                        ? "bg-yellow-50 text-yellow-700"
                                        : "text-gray-700",
                                    )}
                                  >
                                    <div
                                      className={cn(
                                        "w-8 h-8 rounded-lg flex items-center justify-center",
                                        sub.iconBg,
                                      )}
                                    >
                                      <Icon
                                        className={cn("w-4 h-4", sub.iconColor)}
                                      />
                                    </div>
                                    {sub.name}
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </StepSection>

            {/* ═══ Step 2: Title & Description ════════════════════════════ */}
            <StepSection number={2} title="Название и описание">
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="title">Название объявления</Label>
                  <Input
                    id="title"
                    name="title"
                    value={form.title} // cath value from data, if not then shoul be empty
                    onChange={handleChange("title")}
                    placeholder="Например: Дрель-шуруповёрт DeWalt DCD791"
                    maxLength={TITLE_MAX_LENGTH}
                    aria-invalid={!!errors.title}
                    className={cn(
                      "!rounded-xl !h-12",
                      errors.title && "!border-red-400",
                    )}
                  />
                  <div className="flex items-center justify-between">
                    {errors.title ? (
                      <p className="text-sm text-red-600" data-error>
                        {errors.title}
                      </p>
                    ) : (
                      <span />
                    )}
                    <span className="text-xs text-gray-400">
                      {form.title.length}/{TITLE_MAX_LENGTH}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Описание</Label>
                  <textarea
                    id="description"
                    name="description"
                    value={form.description}
                    onChange={handleChange("description")}
                    placeholder="Подробно опишите ваш предмет: состояние, комплектация, особенности использования..."
                    maxLength={DESCRIPTION_MAX_LENGTH}
                    rows={5}
                    aria-invalid={!!errors.description}
                    className={cn(
                      "flex w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 transition-colors outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-400/50 resize-y min-h-[120px]",
                      errors.description ? "border-red-400" : "border-gray-300",
                    )}
                  />
                  <div className="flex items-center justify-between">
                    {errors.description ? (
                      <p className="text-sm text-red-600" data-error>
                        {errors.description}
                      </p>
                    ) : (
                      <span />
                    )}
                    <span className="text-xs text-gray-400">
                      {form.description.length}/{DESCRIPTION_MAX_LENGTH}
                    </span>
                  </div>
                </div>
              </div>
            </StepSection>

            {/* ═══ Step 3: Photos ═════════════════════════════════════════ */}
            <StepSection
              number={3}
              title="Фотографии"
              subtitle={`До ${MAX_IMAGES} фото. Первое фото станет обложкой объявления.`}
            >
              <ImageUpload
                value={images}
                onChange={setImages}
                maxFiles={MAX_IMAGES}
                error={errors.images}
                onError={(msg) =>
                  setErrors((prev) => ({ ...prev, images: msg }))
                }
              />
            </StepSection>

            {/* ═══ Step 4: Pricing ════════════════════════════════════════ */}
            <StepSection
              number={4}
              title="Стоимость аренды"
              subtitle={`Добавьте до ${MAX_PRICE_OPTIONS} вариантов цены. Укажите срок и стоимость.`}
              error={errors.pricing}
            >
              <div className="space-y-3">
                {priceOptions.map((opt, index) => (
                  <div key={opt.id} className="flex items-start gap-3">
                    <div className="flex-1 grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        {index === 0 && (
                          <Label className="text-xs text-gray-500">
                            Срок аренды (от)
                          </Label>
                        )}
                        <div className="relative">
                          <Input
                            type="number"
                            min="1"
                            value={opt.period}
                            onChange={(e) =>
                              updatePriceOption(
                                opt.id,
                                "period",
                                e.target.value,
                              )
                            }
                            placeholder="1"
                            className="!h-11 pr-10"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 pointer-events-none">
                            дн.
                          </span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        {index === 0 && (
                          <Label className="text-xs text-gray-500">
                            Цена (₽)
                          </Label>
                        )}
                        <Input
                          type="number"
                          min="0"
                          value={opt.price}
                          onChange={(e) =>
                            updatePriceOption(opt.id, "price", e.target.value)
                          }
                          placeholder="500"
                          className="!rounded-xl !h-11"
                        />
                      </div>
                    </div>
                    {priceOptions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removePriceOption(opt.id)}
                        className={cn(
                          "p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0",
                          index === 0 && "mt-6",
                        )}
                        aria-label="Удалить вариант цены"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}

                {priceOptions.length < MAX_PRICE_OPTIONS && (
                  <Button
                    type="button"
                    variant="outline"
                    className="gap-2 mt-2"
                    onClick={addPriceOption}
                  >
                    <Plus className="w-4 h-4" />
                    Добавить вариант
                  </Button>
                )}
              </div>
            </StepSection>

            {/* ═══ Step 5: Locations ══════════════════════════════════════ */}
            <StepSection
              number={5}
              title="Где можно забрать предмет?"
              subtitle="Ваш точный адрес не будет показан до оплаты и подтверждения аренды."
              error={errors.locations}
            >
              {locationsLoading ? (
                <div className="flex items-center gap-2 text-sm text-gray-500 py-4">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Загрузка локаций…
                </div>
              ) : (
                <>
                  {locations.length > 0 && (
                    <div className="space-y-3 mb-4">
                      {locations.map((loc) => {
                        const isChecked = checkedLocationIds.has(loc.id);
                        return (
                          <div
                            key={loc.id}
                            className={cn(
                              "flex items-center gap-3 p-4 bg-white border-2 rounded-xl transition-colors cursor-pointer",
                              isChecked
                                ? "border-[#43c682]"
                                : "border-gray-200 hover:border-gray-300",
                            )}
                            onClick={() => toggleLocationChecked(loc.id)}
                          >
                            <div className="w-9 h-9 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                              <MapPin className="w-4 h-4 text-green-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm text-gray-900 truncate">
                                {loc.name}
                              </p>
                              <p className="text-xs text-gray-500 truncate">
                                {loc.address}
                              </p>
                            </div>
                            <div
                              className="flex items-center gap-1 shrink-0"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <button
                                type="button"
                                onClick={() => openEditLocation(loc)}
                                className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                aria-label="Редактировать локацию"
                              >
                                <Pencil className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => removeLocation(loc.id)}
                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                aria-label="Удалить локацию"
                                disabled={deletingLocationId === loc.id}
                              >
                                {deletingLocationId === loc.id ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                  <Trash2 className="w-4 h-4" />
                                )}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {locations.length < MAX_LOCATIONS && (
                    <Button
                      type="button"
                      variant="outline"
                      className="gap-2"
                      onClick={openAddLocation}
                    >
                      <Plus className="w-4 h-4" />
                      Добавить локацию
                    </Button>
                  )}
                </>
              )}
            </StepSection>

            {/* ═══ Step 6: Cancellation terms ═════════════════════════════ */}
            <StepSection
              number={6}
              title="Условия отмены"
              error={errors.cancellationPolicy}
            >
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-2 p-1 bg-gray-100 rounded-xl">
                  {CANCELLATION_POLICIES.map((policy) => (
                    <button
                      key={policy.id}
                      type="button"
                      onClick={() => {
                        setForm((prev) => ({
                          ...prev,
                          cancellationPolicy: policy.id,
                        }));
                        setErrors((prev) => ({
                          ...prev,
                          cancellationPolicy: undefined,
                        }));
                      }}
                      className={cn(
                        "px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                        form.cancellationPolicy === policy.id
                          ? "bg-white text-gray-900 shadow-sm"
                          : "text-gray-500 hover:text-gray-700",
                      )}
                    >
                      {policy.label}
                    </button>
                  ))}
                </div>

                {CANCELLATION_POLICIES.map(
                  (policy) =>
                    form.cancellationPolicy === policy.id && (
                      <div
                        key={policy.id}
                        className="flex gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-xl"
                      >
                        <Info className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-900 mb-1">
                            {policy.label}
                          </p>
                          <p className="text-sm text-gray-600">
                            {policy.description}
                          </p>
                        </div>
                      </div>
                    ),
                )}
              </div>
            </StepSection>

            {/* ═══ Step 7: Market value ═══════════════════════════════════ */}
            <StepSection
              number={7}
              title="Рыночная стоимость предмета"
              subtitle="Укажите примерную стоимость предмета при покупке нового. Это поможет определить залог."
              error={errors.marketValue}
            >
              <div className="relative">
                <Input
                  id="marketValue"
                  name="marketValue"
                  type="number"
                  min="0"
                  value={form.marketValue}
                  onChange={handleChange("marketValue")}
                  placeholder="Например: 25000"
                  aria-invalid={!!errors.marketValue}
                  className={cn(
                    "!rounded-xl !h-12 !pr-10",
                    errors.marketValue && "!border-red-400",
                  )}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  ₽
                </span>
              </div>
            </StepSection>

            {/* ═══ Actions ═══════════════════════════════════════════════ */}
            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-3 pt-8 pb-4">
              <Button
                type="button"
                variant="ghost"
                className="gap-2"
                onClick={() => router.back()}
              >
                <ArrowLeft className="w-4 h-4" />
                Назад
              </Button>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="gap-2 sm:ml-auto"
                disabled={isSubmitting}
              >
                <Save className="w-4 h-4" />
                {isSubmitting
                  ? "Сохранение…"
                  : isNew
                    ? "Опубликовать"
                    : "Сохранить изменения"}
              </Button>
            </div>

            {submitError && (
              <p className="text-sm text-red-600 text-center pb-4">
                {submitError}
              </p>
            )}
          </form>
        </div>
      </div>

      <Footer />

      {/* ── Step 1: Map picker (LocationModal) ──────────────────────── */}
      <LocationModal
        open={locationMapOpen}
        onOpenChange={setLocationMapOpen}
        onLocationSelect={handleLocationSelected}
        pickerMode
      />

      {/* ── Delete-error info modal ───────────────────────────────── */}
      {deleteErrorModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setDeleteErrorModalOpen(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Невозможно удалить
              </h3>
              <button
                type="button"
                onClick={() => setDeleteErrorModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-gray-600">
              Локация используется другими товарами и не может быть удалена.
            </p>
            <Button
              type="button"
              variant="primary"
              className="w-full"
              onClick={() => setDeleteErrorModalOpen(false)}
            >
              Понятно
            </Button>
          </div>
        </div>
      )}

      {/* ── Step 2: Name input modal ────────────────────────────────── */}
      {locationNameOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setLocationNameOpen(false)}
          />

          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Введите название
              </h3>
              <button
                type="button"
                onClick={() => setLocationNameOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-500">
                Название локации будет видно только вам
              </p>
              <Input
                id="loc-name"
                value={locationNameInput}
                onChange={(e) =>
                  setLocationNameInput(sanitizeText(e.target.value))
                }
                placeholder="Например: Дом"
                className="!rounded-xl !h-11"
                autoFocus
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" &&
                    locationNameInput.trim() &&
                    !locationSaving
                  ) {
                    e.preventDefault();
                    saveLocation();
                  }
                }}
              />
            </div>

            {editingLocation && (
              <div className="flex gap-3 p-3 bg-amber-50 border border-amber-200 rounded-xl">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-700">
                  Если эта локация используется в других объявлениях, изменения
                  коснутся их тоже.
                </p>
              </div>
            )}

            {locationError && (
              <p className="text-sm text-red-600">{locationError}</p>
            )}

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setLocationNameOpen(false);
                  setLocationMapOpen(true);
                }}
              >
                Назад
              </Button>
              <Button
                type="button"
                variant="primary"
                className="flex-1"
                disabled={!locationNameInput.trim() || locationSaving}
                onClick={saveLocation}
              >
                {locationSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Сохранение…
                  </>
                ) : (
                  "Сохранить"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
