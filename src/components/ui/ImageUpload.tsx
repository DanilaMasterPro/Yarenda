"use client";

import {
  useState,
  useRef,
  useCallback,
  useEffect,
  type DragEvent,
} from "react";
import { Camera, X, Upload, ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/components/ui/utils";

// ── Constants ────────────────────────────────────────────────────────────────

const DEFAULT_ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png"];
const DEFAULT_ACCEPTED_EXTENSIONS = ".jpg,.jpeg,.png";
const DEFAULT_MAX_SIZE = 5 * 1024 * 1024; // 5 MB
const DEFAULT_MAX_FILES = 1;

// ── Types ────────────────────────────────────────────────────────────────────

export interface ImageUploadFile {
  file: File;
  /** Object URL — revoke when done */
  previewUrl: string;
  /** Set for images already uploaded to the server; file will not be re-uploaded */
  existingUrl?: string;
}

export interface ImageUploadProps {
  /** Controlled list of selected files */
  value: ImageUploadFile[];
  /** Called whenever the file list changes */
  onChange: (files: ImageUploadFile[]) => void;
  /** Maximum number of images allowed. Defaults to 1 */
  maxFiles?: number;
  /** Maximum file size in bytes. Defaults to 5 MB */
  maxSize?: number;
  /** Accepted MIME types. Defaults to jpg/jpeg/png */
  acceptedTypes?: string[];
  /** Human-readable accept string for the file input. Defaults to .jpg,.jpeg,.png */
  acceptExtensions?: string;
  /** Error message to display */
  error?: string;
  /** Called when a validation error occurs */
  onError?: (message: string) => void;
  className?: string;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function validateFile(
  file: File,
  acceptedTypes: string[],
  maxSize: number,
): string | null {
  if (!acceptedTypes.includes(file.type)) {
    return "Допустимые форматы: JPG, JPEG, PNG";
  }
  if (file.size > maxSize) {
    const mb = Math.round(maxSize / (1024 * 1024));
    return `Максимальный размер файла — ${mb} МБ`;
  }
  return null;
}

// ── Component ────────────────────────────────────────────────────────────────

export function ImageUpload({
  value,
  onChange,
  maxFiles = DEFAULT_MAX_FILES,
  maxSize = DEFAULT_MAX_SIZE,
  acceptedTypes = DEFAULT_ACCEPTED_TYPES,
  acceptExtensions = DEFAULT_ACCEPTED_EXTENSIONS,
  error,
  onError,
  className,
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Revoke all preview URLs on unmount
  useEffect(() => {
    return () => {
      value.forEach((f) => URL.revokeObjectURL(f.previewUrl));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isMultiple = maxFiles > 1;
  const isFull = value.length >= maxFiles;

  // ── File processing ────────────────────────────────────────────────────

  const processFiles = useCallback(
    (rawFiles: FileList | File[]) => {
      const incoming = Array.from(rawFiles);
      const remaining = maxFiles - value.length;

      if (remaining <= 0) return;

      const toAdd: ImageUploadFile[] = [];

      for (const file of incoming.slice(0, remaining)) {
        const validationError = validateFile(file, acceptedTypes, maxSize);
        if (validationError) {
          onError?.(validationError);
          continue;
        }
        toAdd.push({ file, previewUrl: URL.createObjectURL(file) });
      }

      if (toAdd.length > 0) {
        onChange([...value, ...toAdd]);
      }
    },
    [value, maxFiles, acceptedTypes, maxSize, onChange, onError],
  );

  // ── Remove ─────────────────────────────────────────────────────────────

  const removeFile = useCallback(
    (index: number) => {
      URL.revokeObjectURL(value[index].previewUrl);
      onChange(value.filter((_, i) => i !== index));
    },
    [value, onChange],
  );

  // ── Input handler ──────────────────────────────────────────────────────

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.length) processFiles(e.target.files);
      e.target.value = ""; // allow re-selecting same file
    },
    [processFiles],
  );

  // ── Drag & drop ────────────────────────────────────────────────────────

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      if (e.dataTransfer.files?.length) processFiles(e.dataTransfer.files);
    },
    [processFiles],
  );

  // ── Render ─────────────────────────────────────────────────────────────

  return (
    <div className={cn("space-y-3", className)}>
      {/* Drop zone */}
      <div
        role="button"
        tabIndex={isFull ? -1 : 0}
        aria-label="Загрузить изображение"
        onKeyDown={(e) => {
          if (!isFull && (e.key === "Enter" || e.key === " "))
            fileInputRef.current?.click();
        }}
        onClick={() => !isFull && fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative flex flex-col items-center gap-4 p-6 rounded-2xl border-2 border-dashed transition-colors select-none",
          isDragging && !isFull
            ? "border-yellow-500 bg-yellow-50 cursor-copy"
            : "border-gray-300 bg-white",
          isFull && "opacity-60 cursor-not-allowed",
          error && "border-red-400 bg-red-50",
          !isFull &&
            !isDragging &&
            "hover:border-yellow-400 hover:bg-yellow-50/40 cursor-pointer",
        )}
      >
        {/* Upload icon / hint */}
        {!isFull && (
          <div className="flex flex-col items-center gap-2 text-center pointer-events-none">
            {isMultiple ? (
              <ImagePlus className="w-10 h-10 text-gray-300" />
            ) : (
              <Upload className="w-10 h-10 text-gray-300" />
            )}
            <p className="text-sm text-gray-500">
              Перетащите {isMultiple ? "изображения" : "изображение"} сюда
            </p>
            <p className="text-xs text-gray-400">
              {acceptExtensions
                .replace(/\./g, "")
                .toUpperCase()
                .replace(/,/g, ", ")}{" "}
              · до {Math.round(maxSize / (1024 * 1024))} МБ
              {isMultiple && ` · до ${maxFiles} фото`}
            </p>
          </div>
        )}

        {isFull && (
          <p className="text-sm text-gray-400 pointer-events-none">
            Максимальное количество файлов выбрано
          </p>
        )}

        {/* Previews */}
        {value.length > 0 && (
          <div
            className={cn(
              "grid gap-3",
              isMultiple
                ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
                : "flex justify-center",
            )}
          >
            {value.map((item, index) => (
              <div key={item.previewUrl} className="relative group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.previewUrl}
                  alt={`Предпросмотр ${index + 1}`}
                  className={cn(
                    "object-cover rounded-xl border border-gray-200 shadow-sm",
                    isMultiple
                      ? "w-full aspect-square"
                      : "w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-lg",
                  )}
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  className="absolute -top-1.5 -right-1.5 p-1 bg-red-500 text-white rounded-full shadow hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                  aria-label={`Удалить фото ${index + 1}`}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptExtensions}
          multiple={isMultiple}
          onChange={handleFileInput}
          className="hidden"
          aria-hidden="true"
          tabIndex={-1}
        />
      </div>

      {/* "Choose file" button — separate from drop zone for accessibility */}
      {!isFull && (
        <Button
          type="button"
          variant="outline"
          className="gap-2 w-full sm:w-auto"
          onClick={(e) => {
            e.stopPropagation();
            fileInputRef.current?.click();
          }}
        >
          <Camera className="w-4 h-4" />
          {isMultiple ? "Добавить фото" : "Выбрать фото"}
        </Button>
      )}

      {/* Error */}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
