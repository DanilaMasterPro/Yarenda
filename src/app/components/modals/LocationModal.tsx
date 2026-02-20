"use client";

import { X, MapPin } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface LocationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LocationModal({ open, onOpenChange }: LocationModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-2xl text-center">
            Где вы хотите арендовать?
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 pb-6">
          {/* Search Input */}
          <div className="relative mb-4">
            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Выберите местоположение"
              className="pl-12 h-12"
            />
          </div>

          {/* Map Placeholder */}
          <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden">
            {/* Map placeholder - you can integrate Google Maps or other map service */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-teal-600 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">
                  Увеличьте или переместите карту, чтобы найти адрес
                </p>
                <Button className="bg-teal-600 hover:bg-teal-700">
                  Использовать моё местоположение
                </Button>
              </div>
            </div>

            {/* Map controls */}
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-2">
              <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50">
                <span className="text-xl">+</span>
              </button>
              <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50">
                <span className="text-xl">−</span>
              </button>
            </div>
          </div>

          {/* Popular Locations */}
          <div className="mt-6">
            <p className="text-sm text-gray-600 mb-3">Популярные города:</p>
            <div className="flex flex-wrap gap-2">
              {[
                "Москва",
                "Санкт-Петербург",
                "Казань",
                "Екатеринбург",
                "Новосибирск",
              ].map((city) => (
                <button
                  key={city}
                  className="px-4 py-2 bg-gray-100 rounded-full text-sm hover:bg-teal-50 hover:text-teal-600 transition-colors"
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
