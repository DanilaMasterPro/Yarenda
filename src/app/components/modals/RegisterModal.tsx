"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Camera, User } from "lucide-react";
import { useState } from "react";
import { EmailVerificationModal } from "./EmailVerificationModal";
import { PhoneVerificationModal } from "./PhoneVerificationModal";

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
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [showPhoneVerification, setShowPhoneVerification] = useState(false);

  if (showEmailVerification) {
    return (
      <EmailVerificationModal
        open={open}
        onOpenChange={onOpenChange}
        email={email}
        onVerified={() => {
          setShowEmailVerification(false);
          setShowPhoneVerification(true);
        }}
        onCancel={() => setShowEmailVerification(false)}
      />
    );
  }

  if (showPhoneVerification) {
    return (
      <PhoneVerificationModal
        open={open}
        onOpenChange={onOpenChange}
        phone={phone}
        onVerified={() => {
          // Registration complete
          onOpenChange(false);
        }}
        onCancel={() => setShowPhoneVerification(false)}
      />
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">
            Регистрация
          </DialogTitle>
        </DialogHeader>

        <div className="py-4 space-y-6">
          {/* Profile Photo */}
          <div className="flex justify-center">
            <button className="relative w-32 h-32 rounded-full border-4 border-orange-400 bg-gray-100 flex items-center justify-center group hover:bg-gray-200 transition-colors">
              <User className="w-16 h-16 text-gray-400" />
              <div className="absolute bottom-2 right-2 w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
                <Camera className="w-4 h-4 text-white" />
              </div>
            </button>
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="register-email" className="text-gray-700">
              Email
            </Label>
            <Input
              id="register-email"
              type="email"
              placeholder="daniilbortvin@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 h-12"
            />
          </div>

          {/* Phone Number */}
          <div>
            <Label htmlFor="phone" className="text-gray-700">
              Номер телефона
            </Label>
            <div className="flex gap-2 mt-2">
              <div className="w-24">
                <Input type="text" value="+7" readOnly className="h-12" />
              </div>
              <Input
                id="phone"
                type="tel"
                placeholder="999 123 4567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-12 flex-1"
              />
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              Аккаунты Яренда являются личными. Пожалуйста, введите ваше
              настоящее имя, как указано в паспорте
            </p>
            <button className="text-sm text-blue-600 hover:underline mt-1">
              Читать далее
            </button>
          </div>

          {/* First Name */}
          <div>
            <Label htmlFor="firstName" className="text-gray-700">
              Имя
            </Label>
            <Input
              id="firstName"
              type="text"
              placeholder="Иван"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-2 h-12"
            />
          </div>

          {/* Buttons */}
          <div className="space-y-3 pt-4">
            <Button
              className="w-full h-12 bg-purple-600 hover:bg-purple-700"
              onClick={() => setShowEmailVerification(true)}
            >
              Зарегистрироваться
            </Button>
            <Button variant="ghost" className="w-full" onClick={onBack}>
              Назад
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
