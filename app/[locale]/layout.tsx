import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import '../globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ScrollProgress } from '@/components/layout/ScrollProgress';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';
import { routing } from '@/i18n/routing';
import { SITE_NAME, SITE_URL } from '@/lib/constants';
import { OG_IMAGE } from '@/lib/seo';
import { siteGraph } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';

// import { Manrope } from 'next/font/google'; // TEMP: rede indisponível
// TEMP disabled — // TEMP: sem acesso a Google Fonts — usar stack de sistema
const manrope = { variable: '' };

const OG_LOCALE: Record<string, string> = {
  pt: 'pt_AO',
  en: 'en_GB',
  es: 'es_ES',
  fr: 'fr_FR',
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: Pick<Props, 'params'>): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'common.seo' });

  const title = `${SITE_NAME} | ${t('titleSuffix')}`;
  const description = t('description');
  const pathFor = (l: string) => (l === routing.defaultLocale ? '/' : `/${l}`);

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: `%s | ${SITE_NAME}` },
    description,
    keywords: t.raw('keywords') as string[],
    alternates: {
      canonical: pathFor(locale),
      languages: {
        ...Object.fromEntries(routing.locales.map((l) => [l, pathFor(l)])),
        'x-default': '/',
      },
    },
    openGraph: {
      type: 'website',
      locale: OG_LOCALE[locale] ?? 'pt_AO',
      url: `${SITE_URL}${pathFor(locale) === '/' ? '' : pathFor(locale)}`,
      siteName: SITE_NAME,
      title,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_IMAGE.url],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
  };
}

export const viewport: Viewport = {
  themeColor: '#01293f',
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const [messages, t] = await Promise.all([
    getMessages(),
    getTranslations({ locale, namespace: 'common.aria' }),
  ]);

  const [ts, tseo] = await Promise.all([
    getTranslations({ locale, namespace: 'services' }),
    getTranslations({ locale, namespace: 'common.seo' }),
  ]);
  const graph = siteGraph(locale, {
    description: tseo('description'),
    catalogName: ts('page.hero.eyebrow'),
    serviceName: (id) => ts(`items.${id}.title`),
  });

  return (
    <html lang={locale} className={manrope.variable}>
      <body>
        <JsonLd data={graph} />
        <NextIntlClientProvider messages={messages}>
          <a
            href='#conteudo'
            className='sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-brand-900'
          >
            {t('skipToContent')}
          </a>
          <CustomCursor />
          <ScrollProgress />
          <Header />
          <main id='conteudo'>{children}</main>
          <Footer />
          <WhatsAppFloat />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
