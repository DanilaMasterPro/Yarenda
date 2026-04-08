"use client";

import {
  useState,
  useCallback,
  useEffect,
  type FormEvent,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useRouter } from "next/navigation";
import type { ImageUploadFile } from "@/components/ui/ImageUpload";
import type { LocationSelectData } from "@/components/modals/LocationModal";
import { allCategories } from "@/shared/data/categories";
import {
  createLocationRequest,
  updateLocationRequest,
  deleteLocationRequest,
  createProductRequest,
  updateProductRequest,
  getUserLocationsRequest,
} from "@/shared/api";
import { fetchProduct, imageUrl } from "@/shared/api/products";
import { uploadFilesRequest } from "@/shared/api/uploads";

// ── Constants ────────────────────────────────────────────────────────────────

export const TITLE_MAX_LENGTH = 100;
export const DESCRIPTION_MAX_LENGTH = 2000;
export const MAX_PRICE_OPTIONS = 5;
export const MAX_LOCATIONS = 5;
export const MAX_IMAGES = 10;

export const CANCELLATION_POLICIES = [
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

export type CancellationPolicy = (typeof CANCELLATION_POLICIES)[number]["id"];

// ── Types ────────────────────────────────────────────────────────────────────

export interface PriceOption {
  id: string;
  period: string;
  price: string;
}

export interface LocationItem {
  id: string;
  name: string;
  address: string;
  coords?: [number, number];
}

export interface FormState {
  categorySlug: string;
  subcategory: string;
  title: string;
  description: string;
  cancellationPolicy: CancellationPolicy;
  marketValue: string;
}

export interface FormErrors {
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

export function sanitizeText(value: string): string {
  return value.replace(/[<>"'&]/g, "");
}

function generateId(): string {
  return Math.random().toString(36).slice(2, 10);
}

// ── Hook ─────────────────────────────────────────────────────────────────────

export function useProductForm(id: string, isNew: boolean) {
  const router = useRouter();

  // ── Form state ──────────────────────────────────────────────────────────

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
  const [productLoading, setProductLoading] = useState(!isNew);
  const [locationSaving, setLocationSaving] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [deletingLocationId, setDeletingLocationId] = useState<string | null>(
    null,
  );
  const [deleteErrorModalOpen, setDeleteErrorModalOpen] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // ── Location modal state ────────────────────────────────────────────────

  const [locationMapOpen, setLocationMapOpen] = useState(false);
  const [locationNameOpen, setLocationNameOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState<LocationItem | null>(
    null,
  );
  const [pendingLocationData, setPendingLocationData] =
    useState<LocationSelectData | null>(null);
  const [locationNameInput, setLocationNameInput] = useState("");

  // ── Load locations + product data on mount ──────────────────────────────

  useEffect(() => {
    let cancelled = false;

    const locationsPromise = getUserLocationsRequest().then((data) =>
      data.map((l) => ({
        id: l.id,
        name: l.name,
        address: l.address,
        coords: l.coords,
      })),
    );

    const productPromise = !isNew ? fetchProduct(id) : Promise.resolve(null);

    Promise.all([locationsPromise, productPromise])
      .then(([locationItems, product]) => {
        if (cancelled) return;
        setLocations(locationItems);

        if (product) {
          const matchedCategory = allCategories.find((cat) =>
            cat.subcategories.some((sub) => sub.name === product.category),
          );
          setForm({
            categorySlug: matchedCategory?.slug ?? "",
            subcategory: product.category,
            title: product.title,
            description: product.description,
            cancellationPolicy:
              (product.cancelCondition as CancellationPolicy) ?? "flexible",
            marketValue: String(product.marketPrice ?? ""),
          });

          setPriceOptions(
            product.prices.length > 0
              ? product.prices.map((p) => ({
                  id: generateId(),
                  period: String(p.fromDays),
                  price: String(p.price),
                }))
              : [{ id: generateId(), period: "", price: "" }],
          );

          setImages(
            product.images.map((img) => ({
              file: new File([], "existing"),
              previewUrl: imageUrl(img),
              existingUrl: img,
            })),
          );

          const productLocationIds = new Set(product.location.map((l) => l.id));
          const matched = new Set(
            locationItems
              .filter((l) => productLocationIds.has(l.id))
              .map((l) => l.id),
          );
          setCheckedLocationIds(
            matched.size > 0
              ? matched
              : locationItems.length > 0
                ? new Set([locationItems[0].id])
                : new Set(),
          );
        } else {
          if (locationItems.length > 0) {
            setCheckedLocationIds(new Set([locationItems[0].id]));
          }
        }
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) {
          setLocationsLoading(false);
          setProductLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [isNew, id]);

  // ── Field handlers ──────────────────────────────────────────────────────

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
    setErrors((prev) => ({ ...prev, category: undefined }));
  }, []);

  const selectCancellationPolicy = useCallback((policy: CancellationPolicy) => {
    setForm((prev) => ({ ...prev, cancellationPolicy: policy }));
    setErrors((prev) => ({ ...prev, cancellationPolicy: undefined }));
  }, []);

  // ── Price option handlers ───────────────────────────────────────────────

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

  // ── Location handlers ───────────────────────────────────────────────────

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

    setLocationSaving(true);
    setLocationError(null);

    try {
      if (editingLocation) {
        const updated = await updateLocationRequest({
          id: editingLocation.id,
          name,
          address: pendingLocationData.address,
          coords: pendingLocationData.coords ?? [0, 0],
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
        const created = await createLocationRequest({
          name,
          address: pendingLocationData.address,
          coords: pendingLocationData.coords ?? [0, 0],
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
        if (next.size <= 1) return prev;
        next.delete(locationId);
      } else {
        next.add(locationId);
      }
      return next;
    });
    setErrors((prev) => ({ ...prev, locations: undefined }));
  }, []);

  // ── Validation ──────────────────────────────────────────────────────────

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

  // ── Submit ──────────────────────────────────────────────────────────────

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitError(null);

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      document
        .querySelector("[data-error]")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setIsSubmitting(true);

    try {
      const locationIds = locations
        .filter((l) => checkedLocationIds.has(l.id))
        .map((l) => l.id);

      const filledPrices = priceOptions
        .filter((o) => o.period.trim() && o.price.trim())
        .map((o) => ({ fromDays: Number(o.period), price: Number(o.price) }));

      const existingUrls = images
        .filter((img) => img.existingUrl)
        .map((img) => img.existingUrl!);
      const newFiles = images
        .filter((img) => !img.existingUrl)
        .map((img) => img.file);
      const newUrls =
        newFiles.length > 0 ? await uploadFilesRequest(newFiles) : [];
      const imageUrls = [...existingUrls, ...newUrls];

      if (isNew) {
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
      } else {
        await updateProductRequest({
          id,
          category: form.subcategory,
          title: form.title.trim(),
          description: form.description.trim(),
          prices: filledPrices,
          locationIds,
          cancelCondition: form.cancellationPolicy,
          marketPrice: Number(form.marketValue),
          images: imageUrls,
        });
      }

      router.push(isNew ? "/catalog" : `/product/${id}`);
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : isNew
            ? "Не удалось создать объявление"
            : "Не удалось сохранить изменения",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    // Data
    form,
    images,
    priceOptions,
    locations,
    checkedLocationIds,
    // Loading states
    locationsLoading,
    productLoading,
    isSubmitting,
    submitError,
    errors,
    // Location modal state
    locationSaving,
    locationError,
    deletingLocationId,
    deleteErrorModalOpen,
    locationMapOpen,
    locationNameOpen,
    locationNameInput,
    editingLocation,
    // Setters exposed for modal close/open actions
    setImages,
    setErrors,
    setDeleteErrorModalOpen,
    setLocationMapOpen,
    setLocationNameOpen,
    setLocationNameInput,
    // Handlers
    handleChange,
    selectCategory,
    selectCancellationPolicy,
    updatePriceOption,
    addPriceOption,
    removePriceOption,
    openAddLocation,
    openEditLocation,
    handleLocationSelected,
    saveLocation,
    removeLocation,
    toggleLocationChecked,
    handleSubmit,
  } as const;
}
