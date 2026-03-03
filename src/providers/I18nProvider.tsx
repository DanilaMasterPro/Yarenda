"use client";

import React, { useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import { i18n } from "@/shared/i18n";

interface I18nProviderProps {
  children: React.ReactNode;
  locale?: string;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({
  children,
  locale,
}) => {
  const [ready, setReady] = useState(i18n.isInitialized);

  useEffect(() => {
    if (locale && i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
    if (!ready) {
      i18n.on("initialized", () => setReady(true));
    }
  }, [locale, ready]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};
