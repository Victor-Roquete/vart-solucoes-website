/** Código `hl` do Google Maps por idioma do site (língua da interface do mapa). */
const MAP_LANG: Record<string, string> = {
  pt: 'pt-PT',
  en: 'en',
  es: 'es',
  fr: 'fr',
};

/** Morada do mapa — igual à morada mostrada no site. */
const MAP_QUERY = 'Talatona, Luanda, Angola';

/**
 * URL do iframe do Google Maps no idioma do visitante.
 * ⚠ Provisório: procura pela morada. Quando houver o link do Google Maps
 * com o pin certo, substitui-se MAP_QUERY pelo pin.
 */
export function mapEmbedUrl(locale: string): string {
  const hl = MAP_LANG[locale] ?? 'en';
  return `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&z=14&hl=${hl}&output=embed`;
}
