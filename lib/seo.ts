import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import { SITE_NAME } from '@/lib/constants';

/**
 * Caminho localizado, igual ao `localePrefix: 'as-needed'` de i18n/routing.ts:
 * o idioma por omissão (pt) não leva prefixo; os outros levam /en, /es, /fr.
 */
export function localizedPath(locale: string, path: string): string {
  const isDefault = locale === routing.defaultLocale;
  if (path === '/') return isDefault ? '/' : `/${locale}`;
  return isDefault ? path : `/${locale}${path}`;
}

const OG_LOCALE: Record<string, string> = {
  pt: 'pt_AO',
  en: 'en_GB',
  es: 'es_ES',
  fr: 'fr_FR',
};

/** Imagem de partilha por omissão (1200×630), gerada de uma fotografia real. */
export const OG_IMAGE = {
  url: '/og/vart-og.jpg',
  width: 1200,
  height: 630,
  alt: 'VART Soluções',
};

/**
 * canonical + hreflang (com x-default) de uma página. `path` sem prefixo de
 * idioma (ex.: '/sobre'). Os `alternates` de uma página substituem os do
 * layout, por isso o x-default tem de vir também aqui.
 */
export function pageAlternates(
  locale: string,
  path: string
): NonNullable<Metadata['alternates']> {
  return {
    canonical: localizedPath(locale, path),
    languages: {
      ...Object.fromEntries(
        routing.locales.map((l) => [l, localizedPath(l, path)])
      ),
      'x-default': localizedPath(routing.defaultLocale, path),
    },
  };
}

/** alternates + Open Graph + Twitter de uma página interna. */
export function pageSeo(
  locale: string,
  path: string,
  title: string,
  description: string
): Pick<Metadata, 'alternates' | 'openGraph' | 'twitter'> {
  const fullTitle = `${title} | ${SITE_NAME}`;
  return {
    alternates: pageAlternates(locale, path),
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: OG_LOCALE[locale] ?? 'pt_AO',
      alternateLocale: routing.locales
        .filter((l) => l !== locale)
        .map((l) => OG_LOCALE[l] ?? 'pt_AO'),
      url: localizedPath(locale, path),
      title: fullTitle,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
