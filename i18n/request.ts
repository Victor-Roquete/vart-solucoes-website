import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

/**
 * Ficheiros em messages/<idioma>/<namespace>.json.
 * Acrescentar aqui cada namespace novo à medida que as secções são traduzidas.
 */
const NAMESPACES = ['common', 'home', 'services', 'projects', 'company'] as const;

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const entries = await Promise.all(
    NAMESPACES.map(
      async (ns) =>
        [ns, (await import(`../messages/${locale}/${ns}.json`)).default] as const
    )
  );

  return { locale, messages: Object.fromEntries(entries) };
});
