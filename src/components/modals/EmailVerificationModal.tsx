"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/router";

interface EmailVerificationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email: string;
  onVerified: () => void;
  onCancel: () => void;
}

export function EmailVerificationModal({
  open,
  onOpenChange,
  email,
  onVerified,
  onCancel,
}: EmailVerificationModalProps) {
  const [code, setCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [countdown, setCountdown] = useState(24);
  const router = useRouter();

  const handleVerify = () => {
    // Simulate verification
    setIsVerified(true);
    setTimeout(() => {
      router.push("/profile");
    }, 1500);
  };

  if (isVerified) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center">
              Регистрация
            </DialogTitle>
          </DialogHeader>

          <div className="py-8 text-center">
            <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 " />
            </div>
            <p className="text-lg mb-6">Ваш email подтвержден!</p>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => router.push("/profile")}
            >
              Отлично!
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">
            Подтвердите email
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <p className="text-center text-gray-600 mb-6">
            Мы отправили код на {email}
          </p>

          <button className="text-sm text-gray-500 mb-4 block mx-auto">
            Отправить код повторно ({countdown})
          </button>

          <Input
            type="text"
            placeholder="Введите код"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="h-12 mb-6"
          />

          <div className="space-y-3">
            <Button className="w-full h-12" onClick={handleVerify}>
              Подтвердить
            </Button>
            <Button variant="outline" className="w-full" onClick={onCancel}>
              Отмена
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
