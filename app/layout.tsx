import type { Metadata, Viewport } from 'next';
// import { Manrope } from 'next/font/google'; // TEMP: rede indisponível
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ScrollProgress } from '@/components/layout/ScrollProgress';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';
import { SITE_NAME, SITE_URL } from '@/lib/constants';
import { company } from '@/data/company';

// TEMP disabled — // TEMP: sem acesso a Google Fonts — usar stack de sistema
const manrope = { variable: '' };

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Serviços e Soluções Técnicas em Angola`,
    template: `%s | ${SITE_NAME}`,
  },
  description: company.shortDescription,
  keywords: [
    'VART Soluções',
    'canalização Luanda',
    'instalações hidráulicas Angola',
    'eletrobombas',
    'piscinas',
    'manutenção técnica',
    'prestação de serviços Luanda',
    'eletricidade Luanda',
    'ladrilho Luanda',
    'teto falso Luanda',
    'pintura Luanda',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'pt_AO',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Serviços e Soluções Técnicas em Angola`,
    description: company.shortDescription,
  },
  twitter: {
    card: 'summary',
    title: `${SITE_NAME} | Serviços e Soluções Técnicas em Angola`,
    description: company.shortDescription,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#01293f',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='pt' className={manrope.variable}>
      <body>
        <a
          href='#conteudo'
          className='sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-brand-900'
        >
          Saltar para o conteúdo
        </a>
        <CustomCursor />
        <ScrollProgress />
        <Header />
        <main id='conteudo'>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
