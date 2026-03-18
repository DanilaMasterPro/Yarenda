"use client";

import { useState, useCallback, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUpload, type ImageUploadFile } from "@/components/ui/ImageUpload";
import type { IUser } from "@/shared/types";

// ── Constants ────────────────────────────────────────────────────────────────

const NAME_MAX_LENGTH = 50;
const BIO_MAX_LENGTH = 500;
const PHONE_PATTERN = /^\+?[0-9\s\-()]{7,20}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ── Helpers ──────────────────────────────────────────────────────────────────

function sanitizeText(value: string): string {
  return value.replace(/[<>"'&]/g, "");
}

// ── Types ────────────────────────────────────────────────────────────────────

interface FormState {
  firstName: string;
  secondName: string;
  phone: string;
  email: string;
  bio: string;
}

interface FormErrors {
  firstName?: string;
  secondName?: string;
  phone?: string;
  email?: string;
  bio?: string;
  avatar?: string;
}

// ── Component ────────────────────────────────────────────────────────────────

interface EditProfileFormProps {
  user: IUser;
}

export function EditProfileForm({ user }: EditProfileFormProps) {
  const router = useRouter();

  // Form state
  const [form, setForm] = useState<FormState>({
    firstName: user.name,
    secondName: user.secondName,
    phone: user.phone ?? "",
    email: user.email ?? "",
    bio: user.bio ?? "",
  });

  const [avatarFiles, setAvatarFiles] = useState<ImageUploadFile[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ── Field changes ────────────────────────────────────────────────────────

  const handleChange = useCallback(
    (field: keyof FormState) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const raw = e.target.value;
        const value =
          field === "phone" || field === "email" ? raw : sanitizeText(raw);
        setForm((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      },
    [],
  );

  // ── Validation ───────────────────────────────────────────────────────────

  function validate(): FormErrors {
    const errs: FormErrors = {};

    const firstName = form.firstName.trim();
    if (!firstName) {
      errs.firstName = "Введите имя";
    } else if (firstName.length > NAME_MAX_LENGTH) {
      errs.firstName = `Максимум ${NAME_MAX_LENGTH} символов`;
    }

    const secondName = form.secondName.trim();
    if (!secondName) {
      errs.secondName = "Введите фамилию";
    } else if (secondName.length > NAME_MAX_LENGTH) {
      errs.secondName = `Максимум ${NAME_MAX_LENGTH} символов`;
    }

    if (form.phone && !PHONE_PATTERN.test(form.phone)) {
      errs.phone = "Неверный формат телефона";
    }

    if (form.email && !EMAIL_PATTERN.test(form.email)) {
      errs.email = "Неверный формат email";
    }

    if (form.bio.length > BIO_MAX_LENGTH) {
      errs.bio = `Максимум ${BIO_MAX_LENGTH} символов`;
    }

    return errs;
  }

  // ── Submit ───────────────────────────────────────────────────────────────

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setIsSubmitting(true);

    // Build FormData — ready for multipart/form-data API call
    const payload = new FormData();
    payload.append("firstName", form.firstName.trim());
    payload.append("secondName", form.secondName.trim());
    if (form.phone) payload.append("phone", form.phone.trim());
    if (form.email) payload.append("email", form.email.trim());
    payload.append("bio", form.bio.trim());
    if (avatarFiles[0]) payload.append("avatar", avatarFiles[0].file);

    // TODO: Replace with actual API call
    // await fetch("/api/profile", { method: "PUT", body: payload });

    // Simulate network delay
    await new Promise((r) => setTimeout(r, 600));

    // Persist updated fields to localStorage
    try {
      const stored = JSON.parse(localStorage.getItem("User") ?? "null");
      const updated = {
        ...(stored ?? user),
        name: form.firstName.trim(),
        secondName: form.secondName.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        bio: form.bio.trim(),
      };
      localStorage.setItem("User", JSON.stringify(updated));
    } catch {
      // localStorage unavailable — silently skip
    }

    setIsSubmitting(false);
    router.push(`/user/${user.id}`);
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

      {/* ── Name fields ──────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="firstName">Имя</Label>
          <Input
            id="firstName"
            name="firstName"
            value={form.firstName}
            onChange={handleChange("firstName")}
            placeholder="Введите имя"
            maxLength={NAME_MAX_LENGTH}
            autoComplete="given-name"
            aria-invalid={!!errors.firstName}
          />
          {errors.firstName && (
            <p className="text-sm text-red-600">{errors.firstName}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="secondName">Фамилия</Label>
          <Input
            id="secondName"
            name="secondName"
            value={form.secondName}
            onChange={handleChange("secondName")}
            placeholder="Введите фамилию"
            maxLength={NAME_MAX_LENGTH}
            autoComplete="family-name"
            aria-invalid={!!errors.secondName}
          />
          {errors.secondName && (
            <p className="text-sm text-red-600">{errors.secondName}</p>
          )}
        </div>
      </div>

      {/* ── Contact fields ───────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="phone">Телефон</Label>
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

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange("email")}
            placeholder="ivan@example.com"
            autoComplete="email"
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email}</p>
          )}
        </div>
      </div>

      {/* ── Bio ──────────────────────────────────────────── */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="bio">О себе</Label>
          <span className="text-xs text-gray-400">
            {form.bio.length}/{BIO_MAX_LENGTH}
          </span>
        </div>
        <textarea
          id="bio"
          name="bio"
          value={form.bio}
          onChange={handleChange("bio")}
          placeholder="Расскажите о себе..."
          maxLength={BIO_MAX_LENGTH}
          rows={4}
          autoComplete="off"
          aria-invalid={!!errors.bio}
          className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 transition-colors outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-400/50 resize-y min-h-[100px]"
        />
        {errors.bio && <p className="text-sm text-red-600">{errors.bio}</p>}
      </div>

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
