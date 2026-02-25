"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/components/ui/utils";

interface SlideInModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function SlideInModal({
  open,
  onOpenChange,
  title,
  children,
  footer,
}: SlideInModalProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className={cn(
            "fixed inset-y-0 left-0 z-50 h-full w-[85%] max-w-sm translate-x-0 translate-y-0 rounded-none border-r bg-white shadow-lg duration-200 data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm"
          )}
        >
          <div className="flex h-full flex-col">
            {/* Header */}
            <div className="flex items-center justify-between border-b p-6 flex-shrink-0">
              <DialogPrimitive.Title className="text-xl font-semibold">
                {title}
              </DialogPrimitive.Title>
              <button
                onClick={() => onOpenChange(false)}
                className="rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
              >
                <X className="h-6 w-6" />
                <span className="sr-only">Закрыть</span>
              </button>
            </div>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden">
              {children}
            </div>

            {/* Footer (optional) */}
            {footer && (
              <div className="border-t p-6 space-y-3 flex-shrink-0">
                {footer}
              </div>
            )}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
