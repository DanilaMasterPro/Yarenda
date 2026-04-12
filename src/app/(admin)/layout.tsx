"use client";

import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { authAtom } from "@/shared/store/auth";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = useAtomValue(authAtom);
  const router = useRouter();

  useEffect(() => {
    if (auth.isLoading) return;
    if (!auth.user || auth.user.role !== "admin") {
      router.replace("/");
    }
  }, [auth, router]);

  if (auth.isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="text-sm text-gray-400">Загрузка...</span>
      </div>
    );
  }

  if (!auth.user || auth.user.role !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center gap-6">
          <span className="text-lg font-semibold">Яренда · Admin</span>
          <nav className="flex gap-4 text-sm">
            <a
              href="/admin/users"
              className="text-gray-600 hover:text-black transition-colors"
            >
              Пользователи
            </a>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
    </div>
  );
}
