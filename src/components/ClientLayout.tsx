"use client";

import {
  PreloaderProvider,
  usePreloaderContext,
  GSAPAnimationsProvider,
  I18nProvider,
} from "@/providers";
import { Provider as JotaiProvider } from "jotai";
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
    <I18nProvider>
      <PreloaderProvider>
        <PreloaderWrapper>{children}</PreloaderWrapper>
      </PreloaderProvider>
    </I18nProvider>
  );
}
