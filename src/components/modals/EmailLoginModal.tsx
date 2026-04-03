"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

interface EmailLoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBack: () => void;
  onSuccess: () => void;
  onRegister: () => void;
}

export function EmailLoginModal({
  open,
  onOpenChange,
  onBack,
  onSuccess,
  onRegister,
}: EmailLoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, isLoading } = useAuth();
  const router = useRouter();

  async function handleSubmit() {
    setError("");
    try {
      const user = await login(email, password);
      onSuccess();
      router.push(`/user/${user.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка входа");
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">Войти</DialogTitle>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <div>
            <Label htmlFor="email" className="text-gray-700">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 h-12"
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-gray-700">
              Пароль
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              className="mt-2 h-12"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button
            className="w-full h-12"
            onClick={handleSubmit}
            disabled={isLoading || !email || !password}
          >
            {isLoading ? "Вход..." : "Войти"}
          </Button>

          <Button variant="ghost" className="w-full" onClick={onRegister}>
            Нет аккаунта? Зарегистрироваться
          </Button>

          <Button variant="ghost" className="w-full" onClick={onBack}>
            Назад
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
