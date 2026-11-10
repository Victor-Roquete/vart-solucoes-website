import { defineRouting } from 'next-intl/routing';

export const locales = ['pt', 'en', 'es', 'fr'] as const;
export type AppLocale = (typeof locales)[number];

/** Português em "/" (sem prefixo, para não quebrar os URLs existentes); os outros em /en, /es, /fr. */
export const routing = defineRouting({
  locales,
  defaultLocale: 'pt',
  localePrefix: 'as-needed',
});
