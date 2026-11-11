import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';

/**
 * Caminho localizado, igual ao `localePrefix: 'as-needed'` de i18n/routing.ts:
 * o idioma por omissão (pt) não leva prefixo; os outros levam /en, /es, /fr.
 */
function localizedPath(locale: string, path: string): string {
  return locale === routing.defaultLocale ? path : `/${locale}${path}`;
}

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
