"use client";

import * as React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { SlideInModal } from "@/components/ui/SlideInModal";
import { CatalogFilter } from "@/data/filters.data";

interface CatalogFiltersProps {
  filters: CatalogFilter[];
  mobileOpen: boolean;
  onMobileOpenChange: (open: boolean) => void;
}

export function CatalogFilters({
  filters,
  mobileOpen,
  onMobileOpenChange,
}: CatalogFiltersProps) {
  // Shared filter content
  const FilterContent = () => (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Фильтры</h2>
        <button className="text-sm text-red-300 hover:underline">
          Сбросить
        </button>
      </div>

      <div className="space-y-6">
        {filters.map((filter) => (
          <div
            key={filter.title}
            className="border-b border-gray-200 pb-6 last:border-0"
          >
            <h3 className="font-medium text-gray-900 mb-3">{filter.title}</h3>
            <div className="space-y-2">
              {filter.options.map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Checkbox />
                  <span className="text-sm text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-80 flex-shrink-0">
        <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
          <FilterContent />
        </div>
      </aside>

      {/* Mobile Modal */}
      <SlideInModal
        open={mobileOpen}
        onOpenChange={onMobileOpenChange}
        title="Фильтры"
        footer={
          <>
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={() => onMobileOpenChange(false)}
            >
              Применить фильтры
            </Button>
            <Button variant="outline" size="lg" className="w-full">
              Сбросить
            </Button>
          </>
        }
      >
        <div className="p-6">
          <div className="space-y-6">
            {filters.map((filter) => (
              <div
                key={filter.title}
                className="border-b border-gray-200 pb-6 last:border-0"
              >
                <h3 className="font-medium text-gray-900 mb-3">
                  {filter.title}
                </h3>
                <div className="space-y-2">
                  {filter.options.map((option) => (
                    <label
                      key={option}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Checkbox />
                      <span className="text-sm text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </SlideInModal>
    </>
  );
}
