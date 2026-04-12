"use client";

import { useEffect, useState, useCallback } from "react";
import { getUsersRequest, setUserRoleRequest } from "@/shared/api";
import type { AdminUser } from "@/shared/api";
import type { UserRole } from "@/shared/api";

const PAGE_SIZE = 20;

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [changingRoleId, setChangingRoleId] = useState<string | null>(null);
  const [roleError, setRoleError] = useState<string | null>(null);

  const load = useCallback(async (nextSkip: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getUsersRequest({ take: PAGE_SIZE, skip: nextSkip });
      setUsers((prev) => (nextSkip === 0 ? data : [...prev, ...data]));
      setHasMore(data.length === PAGE_SIZE);
      setSkip(nextSkip);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Не удалось загрузить пользователей",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(0);
  }, [load]);

  const handleRoleChange = useCallback(
    async (user: AdminUser, newRole: UserRole) => {
      if (newRole === user.role) return;
      setChangingRoleId(user.id);
      setRoleError(null);
      try {
        const result = await setUserRoleRequest(user.id, newRole);
        setUsers((prev) =>
          prev.map((u) =>
            u.id === result.id ? { ...u, role: result.role } : u,
          ),
        );
      } catch (err) {
        setRoleError(
          err instanceof Error ? err.message : "Не удалось изменить роль",
        );
      } finally {
        setChangingRoleId(null);
      }
    },
    [],
  );

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Пользователи</h1>
        <button
          onClick={() => load(0)}
          className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
        >
          Обновить
        </button>
      </div>

      {roleError && (
        <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {roleError}
        </div>
      )}

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="overflow-hidden rounded-xl border bg-white">
        <table className="w-full text-sm">
          <thead className="border-b bg-gray-50 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
            <tr>
              <th className="px-4 py-3">Пользователь</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Телефон</th>
              <th className="px-4 py-3">Роль</th>
              <th className="px-4 py-3">Дата регистрации</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="font-medium">{user.username}</div>
                  <div className="text-xs text-gray-400 font-mono">
                    {user.id}
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-700">{user.email}</td>
                <td className="px-4 py-3 text-gray-500">{user.phone ?? "—"}</td>
                <td className="px-4 py-3">
                  <select
                    disabled={changingRoleId === user.id}
                    value={user.role}
                    onChange={(e) =>
                      handleRoleChange(user, e.target.value as UserRole)
                    }
                    className="rounded-lg border px-2 py-1 text-xs disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-purple-300 cursor-pointer"
                  >
                    <option value="user">Пользователь</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="px-4 py-3 text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString("ru-RU", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {loading && (
          <div className="px-4 py-6 text-center text-sm text-gray-400">
            Загрузка...
          </div>
        )}

        {!loading && users.length === 0 && !error && (
          <div className="px-4 py-6 text-center text-sm text-gray-400">
            Пользователей нет
          </div>
        )}
      </div>

      {hasMore && !loading && (
        <div className="mt-4 text-center">
          <button
            onClick={() => load(skip + PAGE_SIZE)}
            className="rounded-lg border px-6 py-2 text-sm hover:bg-gray-100 transition-colors"
          >
            Загрузить ещё
          </button>
        </div>
      )}
    </div>
  );
}
