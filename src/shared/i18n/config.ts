import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import ru from './locales/ru.json';

export const defaultNS = 'translation';

export const resources = {
  en: { translation: en },
  ru: { translation: ru },
} as const;

export type TranslationKeys = typeof en;
export type SupportedLocale = keyof typeof resources;
export const supportedLocales: SupportedLocale[] = ['ru', 'en'];

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    lng: 'ru',
    fallbackLng: 'en',
    defaultNS,
    resources,
    interpolation: { escapeValue: false },
    initImmediate: false, // force synchronous init so keys resolve on first render
  });
}

export default i18n;
