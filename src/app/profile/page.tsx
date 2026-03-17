"use client";

import { useState, useEffect, useRef } from "react";
import {
  Heart,
  Pen,
  ShieldCheck,
  Clock,
  MessageSquare,
  MapPin,
  Menu,
  Headset,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Header } from "@/components/widgets/Header";
import { Footer } from "@/components/widgets/Footer";
import { ReviewsSlider } from "@/components/widgets/ReviewsSlider";
import { ProductsSlider } from "@/components/widgets/ProductsSlider";
import { owners } from "@/shared/data/owner.data";

export default function ProfilePage() {
  const owner = owners["1"];

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Cover gradient — Facebook-style */}
      <div className="relative h-48 sm:h-56 lg:h-64 bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
          <Breadcrumbs items={[{ label: "Мой профиль" }]} />
        </div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0djEyaDEyVjE0SDM2ek0xMiAxNHYxMmgxMlYxNEgxMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Profile header (overlaps cover) ─────────────────── */}
        <div className="relative -mt-20 sm:-mt-24 mb-6">
          <div className="relative bg-white rounded-2xl shadow-sm border border-gray-200 p-5 sm:p-8">
            {/* More menu — absolute on small screens */}
            <div className="absolute top-4 right-4 lg:hidden" ref={menuRef}>
              <button
                title="Ещё"
                onClick={() => setMenuOpen((v) => !v)}
                className="p-2 rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition-colors shadow-sm"
              >
                <Menu className="w-5 h-5 text-gray-500" />
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-1 z-50">
                  <button className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <Headset className="w-4 h-4" />
                    Тех.поддержка
                  </button>
                  <button className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <Settings className="w-4 h-4" />
                    Настройки
                  </button>
                  <div className="border-t border-gray-100 my-1" />
                  <button className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">
                    <LogOut className="w-4 h-4" />
                    Выйти
                  </button>
                </div>
              )}
            </div>
            {/* Top row: avatar + info + actions */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-end md:items-center gap-4 sm:gap-6">
              {/* Avatar */}
              <div className="-mt-16 sm:-mt-20">
                <Avatar className="w-28 h-28 sm:w-36 sm:h-36 border-4 border-white shadow-lg">
                  <AvatarFallback className="bg-yellow-100 text-yellow-700 text-4xl sm:text-5xl font-bold">
                    {owner.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* Name + meta */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {owner.name}
                  </h1>
                  {owner.verified && (
                    <ShieldCheck className="w-6 h-6 text-blue-500 shrink-0" />
                  )}
                </div>
                <div className="flex items-center gap-3 mt-1 text-sm text-gray-500 flex-wrap">
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                    <span className="font-semibold text-gray-900">
                      {owner.rating}
                    </span>
                    <span>· {owner.reviewCount} отзывов</span>
                  </div>
                  <span className="hidden sm:inline">·</span>
                  <span>На сайте с {owner.joinedDate}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap basis-full lg:basis-auto">
                <Button variant="primary" className="gap-2">
                  <Pen className="w-4 h-4" />
                  Редактировать
                </Button>
                <Button variant="secondary" className="gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  Верификация
                </Button>
                {/* More menu — desktop */}
                <div className="relative hidden lg:block" ref={menuRef}>
                  <Button
                    variant="ghost"
                    size="icon"
                    title="Ещё"
                    onClick={() => setMenuOpen((v) => !v)}
                  >
                    <Menu className="w-5 h-5 text-gray-500" />
                  </Button>
                  {menuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-1 z-50">
                      <button className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        <Headset className="w-4 h-4" />
                        Тех.поддержка
                      </button>
                      <button className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        <Settings className="w-4 h-4" />
                        Настройки
                      </button>
                      <div className="border-t border-gray-100 my-1" />
                      <button className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">
                        <LogOut className="w-4 h-4" />
                        Выйти
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bio */}
            {owner.bio && (
              <p className="mt-5 text-gray-600 text-sm sm:text-base leading-relaxed max-w-3xl">
                {owner.bio}
              </p>
            )}

            {/* Info tags */}
            <div className="mt-5 flex flex-wrap gap-2 sm:gap-3">
              {owner.verified && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs sm:text-sm font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Личность подтверждена
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 text-green-700 text-xs sm:text-sm font-medium">
                <Clock className="w-3.5 h-3.5" />
                Отвечает {owner.responseTime}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50 text-purple-700 text-xs sm:text-sm font-medium">
                <MessageSquare className="w-3.5 h-3.5" />
                Частота ответов: {owner.responseRate}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 text-orange-700 text-xs sm:text-sm font-medium">
                <MapPin className="w-3.5 h-3.5" />
                {owner.location}
              </span>
            </div>
          </div>
        </div>

        {/* ── My Reviews slider ───────────────────────────────── */}
        <ReviewsSlider
          reviews={owner.reviews}
          reviewCount={owner.reviewCount}
          title="Мои отзывы"
        />

        {/* ── Favorites ───────────────────────────────────────── */}
        <ProductsSlider
          products={owner.products}
          title="Избранное"
          viewAllText="Смотреть всё избранное"
        />

        {/* ── My Products catalog ─────────────────────────────── */}
        <ProductsSlider
          products={owner.products}
          title="Мои объявления"
          viewAllText="Смотреть все объявления"
        />
      </div>

      <Footer />
    </div>
  );
}
