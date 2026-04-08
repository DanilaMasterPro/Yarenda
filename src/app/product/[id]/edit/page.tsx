"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
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
import { ImageUpload } from "@/components/ui/ImageUpload";
import { Header } from "@/components/widgets/Header";
import { Footer } from "@/components/widgets/Footer";
import { CategoryPicker } from "@/components/widgets/CategoryPicker";
import { useAuth } from "@/hooks/useAuth";
import { LocationModal } from "@/components/modals/LocationModal";
import { cn } from "@/components/ui/utils";
import {
  useProductForm,
  sanitizeText,
  TITLE_MAX_LENGTH,
  DESCRIPTION_MAX_LENGTH,
  MAX_PRICE_OPTIONS,
  MAX_LOCATIONS,
  MAX_IMAGES,
  CANCELLATION_POLICIES,
} from "./useProductForm";

// -- Step section -------------------------------------------------------------

interface StepSectionProps {
  number: number;
  title: string;
  subtitle?: string;
  error?: string;
  children: React.ReactNode;
}

function StepSection({ number, title, subtitle, error, children }: StepSectionProps) {
  return (
    <section className="relative py-8 border-b border-gray-200 last:border-b-0">
      <div className={cn("flex gap-4 mb-5", subtitle ? "items-start" : "items-center")}>
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

// -- Page ---------------------------------------------------------------------

export default function ProductEditPage() {
  const { id } = useParams();
  const router = useRouter();
  const isNew = id === "new";
  const { user, isLoading: authLoading } = useAuth();

  const {
    form,
    images,
    priceOptions,
    locations,
    checkedLocationIds,
    locationsLoading,
    productLoading,
    isSubmitting,
    submitError,
    errors,
    locationSaving,
    locationError,
    deletingLocationId,
    deleteErrorModalOpen,
    locationMapOpen,
    locationNameOpen,
    locationNameInput,
    editingLocation,
    setImages,
    setErrors,
    setDeleteErrorModalOpen,
    setLocationMapOpen,
    setLocationNameOpen,
    setLocationNameInput,
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
  } = useProductForm(String(id), isNew);

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/");
    }
  }, [authLoading, user, router]);

  if (!authLoading && !user) return null;

  if (productLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl ml-0">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {isNew ? "Создать объявление" : "Редактировать объявление"}
            </h1>
            <p className="text-gray-600">Заполните все поля, чтобы разместить ваше объявление</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-0" noValidate>
            {/* Step 1: Category */}
            <StepSection number={1} title="Выберите категорию" error={errors.category}>
              <CategoryPicker
                value={{ slug: form.categorySlug, subcategory: form.subcategory }}
                onChange={selectCategory}
                error={errors.category}
              />
            </StepSection>

            {/* Step 2: Title & Description */}
            <StepSection number={2} title="Название и описание">
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="title">Название объявления</Label>
                  <Input
                    id="title"
                    name="title"
                    value={form.title}
                    onChange={handleChange("title")}
                    placeholder="Например: Дрель-шуруповёрт DeWalt DCD791"
                    maxLength={TITLE_MAX_LENGTH}
                    aria-invalid={!!errors.title}
                    className={cn("!rounded-xl !h-12", errors.title && "!border-red-400")}
                  />
                  <div className="flex items-center justify-between">
                    {errors.title ? (
                      <p className="text-sm text-red-600" data-error>{errors.title}</p>
                    ) : <span />}
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
                      <p className="text-sm text-red-600" data-error>{errors.description}</p>
                    ) : <span />}
                    <span className="text-xs text-gray-400">
                      {form.description.length}/{DESCRIPTION_MAX_LENGTH}
                    </span>
                  </div>
                </div>
              </div>
            </StepSection>

            {/* Step 3: Photos */}
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
                onError={(msg) => setErrors((prev) => ({ ...prev, images: msg }))}
              />
            </StepSection>

            {/* Step 4: Pricing */}
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
                          <Label className="text-xs text-gray-500">Срок аренды (от)</Label>
                        )}
                        <div className="relative">
                          <Input
                            type="number"
                            min="1"
                            value={opt.period}
                            onChange={(e) => updatePriceOption(opt.id, "period", e.target.value)}
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
                          <Label className="text-xs text-gray-500">Цена (₽)</Label>
                        )}
                        <Input
                          type="number"
                          min="0"
                          value={opt.price}
                          onChange={(e) => updatePriceOption(opt.id, "price", e.target.value)}
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
                  <Button type="button" variant="outline" className="gap-2 mt-2" onClick={addPriceOption}>
                    <Plus className="w-4 h-4" />
                    Добавить вариант
                  </Button>
                )}
              </div>
            </StepSection>

            {/* Step 5: Locations */}
            <StepSection
              number={5}
              title="Где можно забрать предмет?"
              subtitle="Ваш точный адрес не будет показан до оплаты и подтверждения аренды."
              error={errors.locations}
            >
              {locationsLoading ? (
                <div className="flex items-center gap-2 text-sm text-gray-500 py-4">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Загрузка локаций...
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
                            onClick={() => toggleLocationChecked(loc.id)}
                            className={cn(
                              "flex items-center gap-3 p-4 bg-white border-2 rounded-xl transition-colors cursor-pointer",
                              isChecked ? "border-[#43c682]" : "border-gray-200 hover:border-gray-300",
                            )}
                          >
                            <div className="w-9 h-9 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                              <MapPin className="w-4 h-4 text-green-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm text-gray-900 truncate">{loc.name}</p>
                              <p className="text-xs text-gray-500 truncate">{loc.address}</p>
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
                                disabled={deletingLocationId === loc.id}
                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                aria-label="Удалить локацию"
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
                    <Button type="button" variant="outline" className="gap-2" onClick={openAddLocation}>
                      <Plus className="w-4 h-4" />
                      Добавить локацию
                    </Button>
                  )}
                </>
              )}
            </StepSection>

            {/* Step 6: Cancellation policy */}
            <StepSection number={6} title="Условия отмены" error={errors.cancellationPolicy}>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-2 p-1 bg-gray-100 rounded-xl">
                  {CANCELLATION_POLICIES.map((policy) => (
                    <button
                      key={policy.id}
                      type="button"
                      onClick={() => selectCancellationPolicy(policy.id)}
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
                          <p className="text-sm font-medium text-gray-900 mb-1">{policy.label}</p>
                          <p className="text-sm text-gray-600">{policy.description}</p>
                        </div>
                      </div>
                    ),
                )}
              </div>
            </StepSection>

            {/* Step 7: Market value */}
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
                  className={cn("!rounded-xl !h-12 !pr-10", errors.marketValue && "!border-red-400")}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  &#8381;
                </span>
              </div>
            </StepSection>

            {/* Actions */}
            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-3 pt-8 pb-4">
              <Button type="button" variant="ghost" className="gap-2" onClick={() => router.back()}>
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
                {isSubmitting ? "Сохранение..." : isNew ? "Опубликовать" : "Сохранить изменения"}
              </Button>
            </div>

            {submitError && (
              <p className="text-sm text-red-600 text-center pb-4">{submitError}</p>
            )}
          </form>
        </div>
      </div>

      <Footer />

      {/* Map picker modal */}
      <LocationModal
        open={locationMapOpen}
        onOpenChange={setLocationMapOpen}
        onLocationSelect={handleLocationSelected}
        pickerMode
      />

      {/* Delete-error modal */}
      {deleteErrorModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setDeleteErrorModalOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Невозможно удалить</h3>
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

      {/* Location name modal */}
      {locationNameOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setLocationNameOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Введите название</h3>
              <button
                type="button"
                onClick={() => setLocationNameOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Название локации будет видно только вам</p>
              <Input
                id="loc-name"
                value={locationNameInput}
                onChange={(e) => setLocationNameInput(sanitizeText(e.target.value))}
                placeholder="Например: Дом"
                className="!rounded-xl !h-11"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter" && locationNameInput.trim() && !locationSaving) {
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
                  Если эта локация используется в других объявлениях, изменения коснутся их тоже.
                </p>
              </div>
            )}
            {locationError && <p className="text-sm text-red-600">{locationError}</p>}
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
                    Сохранение...
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