import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { SITE_URL } from '@/lib/constants';
import { projects } from '@/data/projects';

const routes = [
  '/',
  '/servicos',
  '/projetos',
  '/sobre',
  '/contato',
  ...projects.map((p) => `/projetos/${p.slug}`),
];

/** URL absoluto de uma rota num idioma (português sem prefixo). */
function urlFor(locale: string, route: string): string {
  const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
  const path = route === '/' ? (prefix ? '' : '/') : route;
  return `${SITE_URL}${prefix}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap((route) => {
    const languages = Object.fromEntries(
      routing.locales.map((locale) => [locale, urlFor(locale, route)])
    );
    return routing.locales.map((locale) => ({
      url: urlFor(locale, route),
      changeFrequency: route === '/' ? ('weekly' as const) : ('monthly' as const),
      priority: route === '/' ? 1 : 0.7,
      alternates: { languages },
    }));
  });
}
