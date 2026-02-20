import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";

interface PhoneVerificationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  phone: string;
  onVerified: () => void;
  onCancel: () => void;
}

export function PhoneVerificationModal({
  open,
  onOpenChange,
  phone,
  onVerified,
  onCancel,
}: PhoneVerificationModalProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleVerify = () => {
    // Simulate verification
    if (code === "2222") {
      setError("Неверный код подтверждения номера телефона");
    } else {
      onVerified();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">
            Регистрация
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <h3 className="text-lg font-medium text-center mb-4">
            Подтвердите номер телефона
          </h3>
          <p className="text-center text-gray-600 mb-6">
            Код отправлен на +7{phone}!
          </p>

          <button className="text-sm text-gray-500 hover:text-teal-600 mb-4 block mx-auto">
            Отправить код повторно
          </button>

          <Input
            type="text"
            placeholder="Введите код"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setError("");
            }}
            className={`h-12 mb-2 ${error ? "border-red-500" : ""}`}
          />

          {error && (
            <p className="text-sm text-red-500 mb-4">{error}</p>
          )}

          <div className="space-y-3 mt-6">
            <Button
              className="w-full h-12 bg-purple-600 hover:bg-purple-700"
              onClick={handleVerify}
            >
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
