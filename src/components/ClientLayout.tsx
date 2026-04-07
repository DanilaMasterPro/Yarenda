"use client";

import {
  PreloaderProvider,
  usePreloaderContext,
  GSAPAnimationsProvider,
  I18nProvider,
  AuthProvider,
} from "@/providers";
import { Provider as JotaiProvider } from "jotai";
import { Preloader } from "@/components/ui/Preloader";
import { useEffect } from "react";

function PreloaderWrapper({ children }: { children: React.ReactNode }) {
  const { isPreloaderComplete } = usePreloaderContext();

  useEffect(() => {
    document.body.style.overflow = isPreloaderComplete ? "" : "hidden";
  }, [isPreloaderComplete]);

  return (
    <>
      <Preloader visible={!isPreloaderComplete} />
      <GSAPAnimationsProvider>
        <AuthProvider>{children}</AuthProvider>
      </GSAPAnimationsProvider>
    </>
  );
}

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <JotaiProvider>
      <I18nProvider>
        <PreloaderProvider>
          <PreloaderWrapper>{children}</PreloaderWrapper>
        </PreloaderProvider>
      </I18nProvider>
    </JotaiProvider>
  );
}
