import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { company } from '@/data/company';
import { PageHero } from '@/components/layout/PageHero';
import { pageHeroes } from '@/data/page-heroes';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { QuoteForm } from '@/components/forms/QuoteForm';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { whatsappLink } from '@/lib/whatsapp';
import { mapEmbedUrl } from '@/lib/maps';
import { pageAlternates } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.contato' });
  return {
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: pageAlternates(locale, '/contato'),
  };
}

interface Channel {
  label: string;
  value: string;
  href?: string;
  icon: string;
}

/**
 * /contato — canais diretos + âncora #orcamento (destino dos CTAs da Home).
 * O backend do formulário (POST /api/quote) fica para a fase de conversão.
 */
export default async function ContatoPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('pages.contato');
  const tc = await getTranslations('company');
  const tg = await getTranslations('common');
  const th = await getTranslations('home.contact');

  const channels: Channel[] = [
    { label: tc('labels.phone'), value: company.phone.value, href: company.phone.href, icon: '☎' },
    { label: tc('labels.email'), value: company.email.value, href: company.email.href, icon: '@' },
    { label: tc('labels.hours'), value: tg('hours.value'), icon: '⏱' },
    { label: tc('labels.address'), value: company.address.value, icon: '📍' },
  ];

  return (
    <>
      <PageHero
        image={{ ...pageHeroes.contato, alt: t('hero.imageAlt') }}
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        description={t('hero.description')}
      />

      <Container className='py-20 md:py-28'>
        <div className='grid gap-14 lg:grid-cols-2 lg:gap-20'>
          {/* Canais diretos */}
          <div>
            <h2 className='text-2xl font-extrabold text-ink'>
              {t('channelsTitle')}
            </h2>

            <Reveal delay={0.1}>
              <a
                href={whatsappLink(tg('whatsapp.defaultMessage'))}
                target='_blank'
                rel='noopener noreferrer'
                className='group mt-8 flex items-center gap-4 rounded-lg border border-line bg-white p-4 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1faa59]/40'
              >
                <span className='flex h-12 w-12 items-center justify-center rounded-md bg-[#1faa59]/10 text-[#1faa59] transition-colors duration-300 group-hover:bg-[#1faa59] group-hover:text-white'>
                  <WhatsAppIcon className='h-6 w-6' />
                </span>
                <span>
                  <span className='block text-xs font-bold uppercase tracking-[0.18em] text-muted'>
                    {tc('labels.whatsapp')}
                  </span>
                  <span className='block font-bold text-ink'>
                    {company.whatsapp.value}
                  </span>
                </span>
              </a>
            </Reveal>

            <Reveal delay={0.15}>
              <ul className='mt-4 space-y-1'>
                {channels.map((channel) => (
                  <li key={channel.icon}>
                    {channel.href ? (
                      <a
                        href={channel.href}
                        className='group flex items-center gap-4 rounded-lg px-4 py-3.5 transition-colors duration-300 hover:bg-surface'
                      >
                        <ContactIcon>{channel.icon}</ContactIcon>
                        <ContactText label={channel.label} value={channel.value} />
                      </a>
                    ) : (
                      <div className='flex items-center gap-4 rounded-lg px-4 py-3.5'>
                        <ContactIcon>{channel.icon}</ContactIcon>
                        <ContactText label={channel.label} value={channel.value} />
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Mapa + orçamento */}
          <div className='space-y-10' id='orcamento'>
            <Reveal delay={0.2}>
              <div className='overflow-hidden rounded-xl border border-line shadow-card'>
                <iframe
                  src={mapEmbedUrl(locale)}
                  title={th('mapTitle')}
                  loading='lazy'
                  referrerPolicy='no-referrer-when-downgrade'
                  className='h-[280px] w-full border-0'
                  allowFullScreen
                />
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <div className='rounded-xl border border-line bg-white p-7 shadow-card md:p-9'>
                <h2 className='text-2xl font-extrabold text-ink'>
                  {t('formTitle')}
                </h2>
                <p className='mt-2.5 text-sm leading-relaxed text-muted'>
                  {t('formText')}
                </p>
                <QuoteForm />
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </>
  );
}

function ContactIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className='flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-brand-50 font-bold text-brand-700'>
      {children}
    </span>
  );
}

function ContactText({ label, value }: { label: string; value: string }) {
  return (
    <span>
      <span className='block text-xs font-bold uppercase tracking-[0.18em] text-muted'>
        {label}
      </span>
      <span className='block font-bold text-ink'>{value}</span>
    </span>
  );
}
