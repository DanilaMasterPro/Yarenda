"use client";

import { useState, useCallback } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { allCategories } from "@/shared/data/categories";
import { cn } from "@/components/ui/utils";

interface CategoryPickerProps {
  value: { slug: string; subcategory: string };
  onChange: (slug: string, subcategory: string) => void;
  error?: string;
}

export function CategoryPicker({ value, onChange, error }: CategoryPickerProps) {
  const [open, setOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const selectedCategory = allCategories.find((c) => c.slug === value.slug);
  const selectedSubcategory = selectedCategory?.subcategories.find(
    (s) => s.name === value.subcategory,
  );
  const label = selectedSubcategory
    ? `${selectedCategory!.title} → ${selectedSubcategory.name}`
    : selectedCategory
      ? selectedCategory.title
      : "";

  const handleSelect = useCallback(
    (slug: string, subcategory: string) => {
      onChange(slug, subcategory);
      setOpen(false);
    },
    [onChange],
  );

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "w-full flex items-center justify-between px-4 py-3 rounded-xl border text-left transition-colors",
          error
            ? "border-red-400 bg-red-50"
            : "border-gray-300 bg-white hover:border-yellow-400",
        )}
      >
        <span className={label ? "text-gray-900" : "text-gray-400"}>
          {label || "Выберите категорию"}
        </span>
        <ChevronDown
          className={cn("w-5 h-5 text-gray-400 transition-transform", open && "rotate-180")}
        />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute z-20 mt-2 w-full bg-white rounded-xl border border-gray-200 shadow-lg max-h-80 overflow-y-auto">
            {allCategories.map((cat) => (
              <div key={cat.slug}>
                <button
                  type="button"
                  onClick={() =>
                    setExpandedCategory((prev) => (prev === cat.slug ? null : cat.slug))
                  }
                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">{cat.title}</span>
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
                          onClick={() => handleSelect(cat.slug, sub.name)}
                          className={cn(
                            "w-full flex items-center gap-3 px-6 py-2.5 text-sm hover:bg-yellow-50 transition-colors",
                            value.subcategory === sub.name && value.slug === cat.slug
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
                            <Icon className={cn("w-4 h-4", sub.iconColor)} />
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
  );
}
