"use client";

import {
  PreloaderProvider,
  usePreloaderContext,
  GSAPAnimationsProvider,
} from "@/providers";
import { Preloader } from "@/components/ui/Preloader";
import { useEffect } from "react";

function PreloaderWrapper({ children }: { children: React.ReactNode }) {
  const { setPreloaderComplete, isPreloaderComplete } = usePreloaderContext();

  const handlePreloaderComplete = () => {
    setPreloaderComplete(true);
  };

  useEffect(() => {
    // Предотвращаем скролл во время загрузки
    document.body.style.overflow = isPreloaderComplete ? "" : "hidden";
  }, [isPreloaderComplete]);

  return (
    <>
      <Preloader onComplete={handlePreloaderComplete} />
      <GSAPAnimationsProvider>{children}</GSAPAnimationsProvider>
    </>
  );
}

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <PreloaderProvider>
      <PreloaderWrapper>{children}</PreloaderWrapper>
    </PreloaderProvider>
  );
}
