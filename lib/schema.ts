import { company } from '@/data/company';
import { services } from '@/data/services';
import { routing } from '@/i18n/routing';
import { SITE_NAME, SITE_URL } from '@/lib/constants';
import { localizedPath } from '@/lib/seo';

export const ORG_ID = `${SITE_URL}/#organization`;
export const SITE_ID = `${SITE_URL}/#website`;

export function absoluteUrl(locale: string, path: string): string {
  return `${SITE_URL}${localizedPath(locale, path)}`;
}

interface GraphContext {
  description: string;
  catalogName: string;
  serviceName: (id: string) => string;
}

/**
 * Negócio local + site. Só dados que existem e se vêem no site; sem
 * avaliações nem classificações (o Google ignora as auto-avaliadas).
 * ⚠ Sem rua nem coordenadas até haver o pin do mapa — não inventar.
 */
export function siteGraph(locale: string, ctx: GraphContext) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'HomeAndConstructionBusiness',
        '@id': ORG_ID,
        name: SITE_NAME,
        url: `${SITE_URL}/`,
        description: ctx.description,
        logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon.svg` },
        image: `${SITE_URL}/og/vart-og.jpg`,
        telephone: company.phone.value.replace(/\s+/g, ''),
        email: company.email.value,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Talatona',
          addressRegion: 'Luanda',
          addressCountry: 'AO',
        },
        areaServed: { '@type': 'City', name: 'Luanda' },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '08:00',
            closes: '18:00',
          },
        ],
        sameAs: company.socials.map((s) => s.href),
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: ctx.catalogName,
          itemListElement: services.map((s) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: ctx.serviceName(s.id),
              url: `${absoluteUrl(locale, '/servicos')}#${s.slug}`,
              provider: { '@id': ORG_ID },
              areaServed: { '@type': 'City', name: 'Luanda' },
            },
          })),
        },
      },
      {
        '@type': 'WebSite',
        '@id': SITE_ID,
        url: `${SITE_URL}/`,
        name: SITE_NAME,
        inLanguage: [...routing.locales],
        publisher: { '@id': ORG_ID },
      },
    ],
  };
}

/** Migalhas de pão: Início + páginas indicadas (nomes já traduzidos). */
export function breadcrumbList(
  locale: string,
  items: { name: string; path: string }[]
) {
  const all = [{ name: SITE_NAME, path: '/' }, ...items];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(locale, item.path),
    })),
  };
}
