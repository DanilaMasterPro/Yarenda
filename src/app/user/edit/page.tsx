"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/widgets/Header";
import { Footer } from "@/components/widgets/Footer";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { EditProfileForm } from "@/components/widgets/EditProfileForm";
import { user as mockUser } from "@/shared/data/user.data";

export default function EditProfilePage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    try {
      const userData = JSON.parse(localStorage.getItem("User") ?? "null");
      if (!userData?.id) {
        router.replace("/");
        return;
      }
      setAuthorized(true);
    } catch {
      router.replace("/");
    }
  }, [router]);

  if (!authorized) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Cover gradient */}
      <div className="relative h-48 sm:h-56 lg:h-64 bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
          <Breadcrumbs
            items={[
              { label: "Мой профиль", href: `/user/${mockUser.id}` },
              { label: "Редактирование" },
            ]}
          />
        </div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0djEyaDEyVjE0SDM2ek0xMiAxNHYxMmgxMlYxNEgxMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Form card overlapping the cover */}
        <div className="relative -mt-20 sm:-mt-24 mb-8 bg-white rounded-2xl shadow-sm border border-gray-200 p-5 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
            Редактирование профиля
          </h1>

          <EditProfileForm user={mockUser} />
        </div>
      </div>

      <Footer />
    </div>
  );
}
