"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState } from "react";

interface EmailLoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBack: () => void;
  onRegister: () => void;
}

export function EmailLoginModal({
  open,
  onOpenChange,
  onBack,
  onRegister,
}: EmailLoginModalProps) {
  const [email, setEmail] = useState("");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">
            Войти или зарегистрироваться
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <div className="mb-6">
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

          <Button
            className="w-full h-12 bg-purple-200 hover:bg-purple-300 text-purple-900"
            onClick={() => {
              // Continue logic
            }}
          >
            Продолжить
          </Button>

          <div className="mt-4 flex items-center justify-center">
            <div className="h-px bg-gray-300 flex-1" />
            <div className="h-px bg-gray-300 flex-1" />
          </div>

          <Button variant="ghost" className="w-full mt-4" onClick={onBack}>
            Назад
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
