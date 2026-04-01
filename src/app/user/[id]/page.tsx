"use client";

import { useParams } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Header } from "@/components/widgets/Header";
import { Footer } from "@/components/widgets/Footer";
import { ReviewsSlider } from "@/components/widgets/ReviewsSlider";
import { ProductsSlider } from "@/components/widgets/ProductsSlider";
import { UserBigCard } from "@/components/widgets/UserBigCard";
import { user as mockUser } from "@/shared/data/user.data";
import { useAuth } from "@/hooks/useAuth";
import type { IUser } from "@/shared/types";

export default function ProfilePage() {
  const { id } = useParams<{ id: string }>();
  const { user: authUser, isLoading } = useAuth();

  // Wait for AuthProvider to finish its initial token check before deciding
  if (isLoading) return null;

  const isOwn = authUser?.id === id;

  const displayUser: IUser =
    isOwn && authUser
      ? {
          ...mockUser,
          name: authUser.username,
          secondName: "",
          email: authUser.email,
          joinedDate: new Date(authUser.createdAt).toLocaleDateString("ru-RU", {
            month: "long",
            year: "numeric",
          }),
          bio: "",
        }
      : mockUser;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Cover gradient */}
      <div className="relative h-48 sm:h-56 lg:h-64 bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
          <Breadcrumbs
            items={[{ label: isOwn ? "Мой профиль" : mockUser.name }]}
          />
        </div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0djEyaDEyVjE0SDM2ek0xMiAxNHYxMmgxMlYxNEgxMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Profile card (overlaps cover) ───────────────────── */}
        <div className="relative -mt-20 sm:-mt-24 mb-6">
          <UserBigCard user={displayUser} isOwn={isOwn} />
        </div>

        {/* ── Reviews slider ──────────────────────────────────── */}
        <ReviewsSlider
          reviews={displayUser.reviews}
          reviewCount={displayUser.reviewCount}
          title={isOwn ? "Мои отзывы" : undefined}
        />

        {/* ── Products catalog ────────────────────────────────── */}
        <ProductsSlider
          products={displayUser.products}
          title={isOwn ? "Мои объявления" : "Объявления"}
          viewAllText="Смотреть все объявления"
        />
      </div>

      <Footer />
    </div>
  );
}
