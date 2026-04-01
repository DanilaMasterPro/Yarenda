"use client";

import { useState, useRef, useEffect } from "react";
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
  MessageCircle,
  Flag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { IUser } from "@/shared/types";
import { useAuth } from "@/hooks/useAuth";

interface UserBigCardProps {
  user: IUser;
  isOwn: boolean;
}

export function UserBigCard({ user, isOwn }: UserBigCardProps) {
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
    <div className="relative bg-white rounded-2xl shadow-sm border border-gray-200 p-5 sm:p-8">
      {/* Mobile top-right action */}
      {isOwn ? (
        /* Own profile — More menu */
        <div className="absolute top-4 right-4 lg:hidden" ref={menuRef}>
          <button
            title="Ещё"
            onClick={() => setMenuOpen((v) => !v)}
            className="p-2 rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition-colors shadow-sm"
          >
            <Menu className="w-5 h-5 text-gray-500" />
          </button>
          {menuOpen && <MoreMenuDropdown />}
        </div>
      ) : (
        /* Other's profile — Favorite button */
        <button
          title="В избранное"
          className="absolute top-4 right-4 lg:hidden p-2 rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition-colors shadow-sm"
        >
          <Heart className="w-5 h-5 text-gray-400" />
        </button>
      )}

      {/* Top row: avatar + info + actions */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-end md:items-center gap-4 sm:gap-6">
        {/* Avatar */}
        <div className="-mt-16 sm:-mt-20">
          <Avatar className="w-28 h-28 sm:w-36 sm:h-36 border-4 border-white shadow-lg">
            <AvatarFallback className="bg-yellow-100 text-yellow-700 text-4xl sm:text-5xl font-bold">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Name + meta */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {user.name}
            </h1>
            {user.verified && (
              <ShieldCheck className="w-6 h-6 text-blue-500 shrink-0" />
            )}
          </div>
          <div className="flex items-center gap-3 mt-1 text-sm text-gray-500 flex-wrap">
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              <span className="font-semibold text-gray-900">{user.rating}</span>
              <span>· {user.reviewCount} отзывов</span>
            </div>
            <span className="hidden sm:inline">·</span>
            <span>На сайте с {user.joinedDate}</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap basis-full lg:basis-auto">
          {isOwn ? (
            <>
              <Button variant="primary" className="gap-2" asChild>
                <Link href="/user/edit">
                  <Pen className="w-4 h-4" />
                  Редактировать
                </Link>
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
                {menuOpen && <MoreMenuDropdown />}
              </div>
            </>
          ) : (
            <>
              <Button variant="primary" className="gap-2">
                <MessageCircle className="w-4 h-4" />
                Написать
              </Button>
              <Button variant="secondary" className="gap-2">
                <Flag className="w-4 h-4" />
                Пожаловаться
              </Button>
              <Button
                variant="ghost"
                size="icon"
                title="В избранное"
                className="hidden lg:inline-flex"
              >
                <Heart className="w-5 h-5 text-gray-400" />
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Bio */}
      {user.bio && (
        <p className="mt-5 text-gray-600 text-sm sm:text-base leading-relaxed max-w-3xl">
          {user.bio}
        </p>
      )}

      {/* Info tags */}
      <div className="mt-5 flex flex-wrap gap-2 sm:gap-3">
        {user.verified && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs sm:text-sm font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            Личность подтверждена
          </span>
        )}
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 text-green-700 text-xs sm:text-sm font-medium">
          <Clock className="w-3.5 h-3.5" />
          Отвечает {user.responseTime}
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50 text-purple-700 text-xs sm:text-sm font-medium">
          <MessageSquare className="w-3.5 h-3.5" />
          Частота ответов: {user.responseRate}
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 text-orange-700 text-xs sm:text-sm font-medium">
          <MapPin className="w-3.5 h-3.5" />
          {user.location}
        </span>
      </div>
    </div>
  );
}

function MoreMenuDropdown() {
  const router = useRouter();
  const { logout } = useAuth();
  return (
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
      <button
        onClick={() => {
          logout();
          router.push("/");
        }}
        className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
      >
        <LogOut className="w-4 h-4" />
        Выйти
      </button>
    </div>
  );
}
