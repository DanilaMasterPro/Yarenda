"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";
import { EmailLoginModal } from "./EmailLoginModal";
import { EmailVerificationModal } from "./EmailVerificationModal";
import { RegisterModal } from "./RegisterModal";
import { GoogleIcon } from "@/components/ui/GoogleIcon";
import { useEffect } from "react";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AuthModal({ open, onOpenChange }: AuthModalProps) {
  const [showEmailLogin, setShowEmailLogin] = useState(false);
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState("");
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    if (!open) {
      setShowEmailLogin(false);
      setShowEmailVerification(false);
      setShowRegister(false);
      setVerificationEmail("");
    }
  }, [open]);

  if (showEmailVerification) {
    return (
      <EmailVerificationModal
        open={open}
        onOpenChange={onOpenChange}
        email={verificationEmail}
        onVerified={() => onOpenChange(false)}
        onCancel={() => setShowEmailVerification(false)}
      />
    );
  }

  if (showEmailLogin) {
    return (
      <EmailLoginModal
        open={open}
        onOpenChange={onOpenChange}
        onBack={() => setShowEmailLogin(false)}
        onContinue={(email) => {
          setVerificationEmail(email);
          setShowEmailLogin(false);
          setShowEmailVerification(true);
        }}
        onRegister={() => {
          setShowEmailLogin(false);
          setShowRegister(true);
        }}
      />
    );
  }

  if (showRegister) {
    return (
      <RegisterModal
        open={open}
        onOpenChange={onOpenChange}
        onBack={() => setShowRegister(false)}
      />
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">
            Авторизация
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3 py-4">
          <Button
            className="w-full h-12"
            variant="primary"
            onClick={() => setShowEmailLogin(true)}
          >
            Войти через Email
          </Button>

          <Button
            variant="outline"
            className="w-full h-12"
            onClick={() => {
              // Google sign-in logic
            }}
          >
            <GoogleIcon />
            Войти через Google
          </Button>

          <Button
            variant="outline"
            className="w-full h-12 border-black text-white bg-black hover:bg-gray-800"
            onClick={() => {
              // Apple sign-in logic
            }}
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
            Продолжить с Apple
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
