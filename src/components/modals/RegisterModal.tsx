"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

interface RegisterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBack: () => void;
}

export function RegisterModal({
  open,
  onOpenChange,
  onBack,
}: RegisterModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { register, isLoading } = useAuth();

  async function handleSubmit() {
    setError("");
    try {
      await register(email, password);
      onOpenChange(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка регистрации");
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">
            Регистрация
          </DialogTitle>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <div>
            <Label htmlFor="register-email" className="text-gray-700">
              Email
            </Label>
            <Input
              id="register-email"
              type="email"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 h-12"
            />
          </div>

          <div>
            <Label htmlFor="register-password" className="text-gray-700">
              Пароль
            </Label>
            <Input
              id="register-password"
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
            {isLoading ? "Загрузка..." : "Зарегистрироваться"}
          </Button>

          <Button variant="ghost" className="w-full" onClick={onBack}>
            Назад
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
