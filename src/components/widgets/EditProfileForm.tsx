"use client";

import { useState, useCallback, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUpload, type ImageUploadFile } from "@/components/ui/ImageUpload";
import type { AuthUser } from "@/shared/api/auth";
import { uploadAvatarRequest, updateUserRequest } from "@/shared/api/auth";
import { useAtom } from "jotai";
import { authAtom } from "@/shared/store/auth";

// ── Constants ────────────────────────────────────────────────────────────────

const USERNAME_MAX_LENGTH = 50;
const BIO_MAX_LENGTH = 500;
const PHONE_PATTERN = /^\+?[0-9\s\-()]{7,20}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ── Helpers ──────────────────────────────────────────────────────────────────

function sanitizeText(value: string): string {
  return value.replace(/[<>"'&]/g, "");
}

// ── Types ────────────────────────────────────────────────────────────────────

interface FormState {
  username: string;
  phone: string;
  description: string;
}

interface FormErrors {
  username?: string;
  phone?: string;
  description?: string;
  avatar?: string;
}

// ── Component ────────────────────────────────────────────────────────────────

interface EditProfileFormProps {
  user: AuthUser;
}

export function EditProfileForm({ user }: EditProfileFormProps) {
  const router = useRouter();
  const [, setAuth] = useAtom(authAtom);

  const [form, setForm] = useState<FormState>({
    username: user.username ?? "",
    phone: user.phone ?? "",
    description: user.description ?? "",
  });

  const [avatarFiles, setAvatarFiles] = useState<ImageUploadFile[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // ── Field changes ────────────────────────────────────────────────────────

  const handleChange = useCallback(
    (field: keyof FormState) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm((prev) => ({ ...prev, [field]: sanitizeText(e.target.value) }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      },
    [],
  );

  // ── Validation ───────────────────────────────────────────────────────────

  function validate(): FormErrors {
    const errs: FormErrors = {};
    const username = form.username.trim();
    if (!username) {
      errs.username = "Введите имя пользователя";
    } else if (username.length > USERNAME_MAX_LENGTH) {
      errs.username = `Максимум ${USERNAME_MAX_LENGTH} символов`;
    }
    const phone = form.phone.trim();
    if (phone && !/^[+]?[\d\s\-().]{7,20}$/.test(phone)) {
      errs.phone = "Введите корректный номер телефона";
    }
    if (form.description.length > BIO_MAX_LENGTH) {
      errs.description = `Максимум ${BIO_MAX_LENGTH} символов`;
    }
    return errs;
  }

  // ── Submit ───────────────────────────────────────────────────────────────

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitError("");

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setIsSubmitting(true);
    try {
      // Step 1 — upload avatar if a new file was selected
      let avatarUrl: string | undefined;
      if (avatarFiles[0]?.file) {
        avatarUrl = await uploadAvatarRequest(avatarFiles[0].file);
      }

      // Step 2 — update user via GraphQL mutation
      const updated = await updateUserRequest({
        username: form.username.trim(),
        phone: form.phone.trim() || undefined,
        description: form.description.trim(),
        ...(avatarUrl ? { avatar: avatarUrl } : {}),
      });

      // Step 3 — update Jotai atom so UI reflects changes immediately
      setAuth((prev) => ({
        ...prev,
        user: prev.user ? { ...prev.user, ...updated } : updated,
      }));

      router.push(`/user/${updated.id}`);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Ошибка сохранения");
    } finally {
      setIsSubmitting(false);
    }
  }

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      {/* ── Avatar section ───────────────────────────────── */}
      <div className="space-y-2">
        <Label>Фото профиля</Label>
        <ImageUpload
          value={avatarFiles}
          onChange={setAvatarFiles}
          maxFiles={1}
          error={errors.avatar}
          onError={(msg) => setErrors((prev) => ({ ...prev, avatar: msg }))}
        />
      </div>

      {/* ── Email (read-only) ─────────────────────────────── */}
      <div className="space-y-2">
        <Label htmlFor="email">Электронная почта</Label>
        <Input
          id="email"
          name="email"
          value={user.email}
          readOnly
          disabled
          className="bg-gray-50 text-gray-500 cursor-not-allowed"
        />
        <p className="text-xs text-gray-400">Почта не может быть изменена</p>
      </div>

      {/* ── Username ─────────────────────────────────────── */}
      <div className="space-y-2">
        <Label htmlFor="username">Имя пользователя</Label>
        <Input
          id="username"
          name="username"
          value={form.username}
          onChange={handleChange("username")}
          placeholder="Введите имя пользователя"
          maxLength={USERNAME_MAX_LENGTH}
          autoComplete="username"
          aria-invalid={!!errors.username}
        />
        {errors.username && (
          <p className="text-sm text-red-600">{errors.username}</p>
        )}
      </div>

      {/* ── Phone ──────────────────────── */}
      <div className="space-y-2">
        <Label htmlFor="phone">Номер телефона</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange("phone")}
          placeholder="+7 (999) 123-45-67"
          autoComplete="tel"
          aria-invalid={!!errors.phone}
        />
        {errors.phone && (
          <p className="text-sm text-red-600">{errors.phone}</p>
        )}
      </div>

      {/* ── Description ──────────────────────────────────── */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="description">О себе</Label>
          <span className="text-xs text-gray-400">
            {form.description.length}/{BIO_MAX_LENGTH}
          </span>
        </div>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange("description")}
          placeholder="Расскажите о себе..."
          maxLength={BIO_MAX_LENGTH}
          rows={4}
          autoComplete="off"
          aria-invalid={!!errors.description}
          className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 transition-colors outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-400/50 resize-y min-h-[100px]"
        />
        {errors.description && (
          <p className="text-sm text-red-600">{errors.description}</p>
        )}
      </div>

      {submitError && <p className="text-sm text-red-600">{submitError}</p>}

      {/* ── Actions ──────────────────────────────────────── */}
      <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-3 pt-2">
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
          {isSubmitting ? "Сохранение…" : "Сохранить"}
        </Button>
      </div>
    </form>
  );
}
