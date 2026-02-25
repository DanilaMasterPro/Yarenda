"use client";

import Link from "next/link";
import { Heart, User, PlusCircle, Home, List, Grid3x3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SlideInModal } from "@/components/ui/SlideInModal";

interface MobileMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAuthClick: () => void;
}

export function MobileMenu({
  open,
  onOpenChange,
  onAuthClick,
}: MobileMenuProps) {
  const handleLinkClick = () => {
    onOpenChange(false);
  };

  return (
    <SlideInModal
      open={open}
      onOpenChange={onOpenChange}
      title="Меню"
    >
      <div className="p-6">
        <nav className="space-y-1">
          <Link
            href="/"
            onClick={handleLinkClick}
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Home className="w-5 h-5" />
            <span className="font-medium">Главная</span>
          </Link>
          <Link
            href="/catalog"
            onClick={handleLinkClick}
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <List className="w-5 h-5" />
            <span className="font-medium">Каталог</span>
          </Link>
          <Link
            href="/categories"
            onClick={handleLinkClick}
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Grid3x3 className="w-5 h-5" />
            <span className="font-medium">Категории</span>
          </Link>
          <button
            onClick={() => {
              handleLinkClick();
              onAuthClick();
            }}
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors w-full"
          >
            <Heart className="w-5 h-5" />
            <span className="font-medium">Избранное</span>
          </button>
          <button
            onClick={() => {
              handleLinkClick();
              onAuthClick();
            }}
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors w-full"
          >
            <User className="w-5 h-5" />
            <span className="font-medium">Профиль</span>
          </button>
        </nav>

        <div className="mt-6 pt-6 border-t">
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={handleLinkClick}
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            Разместить объявление
          </Button>
        </div>
      </div>
    </SlideInModal>
  );
}
