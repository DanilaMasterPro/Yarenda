"use client";

import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onLocationClick: () => void;
}

export function SearchBar({ onLocationClick }: SearchBarProps) {
  return (
    <div className="w-full flex items-center bg-gray-50 rounded-full border border-gray-200 hover:shadow-md transition-shadow">
      <button
        onClick={onLocationClick}
        className="flex items-center gap-2 px-6 py-3 border-r border-gray-200 hover:bg-gray-100 rounded-l-full transition-colors"
      >
        <MapPin className="w-4 h-4 text-gray-600" />
        <span className="text-sm text-gray-700 font-medium">Где?</span>
      </button>
      <Input
        type="text"
        placeholder="Что вы ищете?"
        className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-sm px-6"
      />
      <Button
        size="icon"
        variant="primary"
        className="rounded-full m-1.5 h-10 w-10"
      >
        <Search className="h-5 w-5" />
      </Button>
    </div>
  );
}
