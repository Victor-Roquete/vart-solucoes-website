import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Image from 'next/image';
import { differentials, processSteps } from '@/data/home';
import { PageHero } from '@/components/layout/PageHero';
import { pageHeroes } from '@/data/page-heroes';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { Button } from '@/components/ui/Button';
import { pageSeo } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbList } from '@/lib/schema';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.sobre' });
  return {
    title: t('meta.title'),
    description: t('meta.description'),
    ...pageSeo(locale, '/sobre', t('meta.title'), t('meta.description')),
  };
}

/**
 * /sobre — história, compromissos e forma de trabalhar da VART.
 */
export default async function SobrePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('pages.sobre');
  const tc = await getTranslations('company');
  const tg = await getTranslations('common');
  const td = await getTranslations('home.differentials');
  const tp = await getTranslations('home.process');
  const paragraphs = [tc('long1'), tc('long2')];

  return (
    <>
      <JsonLd
        data={breadcrumbList(locale, [
          { name: t('hero.eyebrow'), path: '/sobre' },
        ])}
      />
      <PageHero
        image={{ ...pageHeroes.sobre, alt: t('hero.imageAlt') }}
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        description={t('hero.description')}
      />

      <section className='py-20 md:py-28'>
        <Container>
          <div className='grid items-start gap-14 lg:grid-cols-2 lg:gap-20'>
            <Reveal className='relative'>
              <div
                aria-hidden='true'
                className='absolute -left-5 -top-5 -z-10 h-full w-full rounded-xl border border-brand-200'
              />
              <div className='relative aspect-[4/3] overflow-hidden rounded-xl shadow-card'>
                <Image
                  src='/assets/services/canalizacao/patriota-vias-express/instalacao-redes-de-agua-reservatorio-elevado-6.webp'
                  alt={t('imageAlt')}
                  fill
                  sizes='(min-width: 1024px) 46vw, 92vw'
                  className='object-cover'
                />
              </div>
            </Reveal>

            <div>
              <SectionHeading
                eyebrow={t('company.eyebrow')}
                title={t('company.title')}
              />
              {paragraphs.map((paragraph, i) => (
                <Reveal key={i} delay={0.1}>
                  <p className='mt-5 leading-relaxed text-muted'>{paragraph}</p>
                </Reveal>
              ))}
              <Reveal delay={0.2}>
                <div className='mt-9'>
                  <Button href='/contato#orcamento'>{tg('nav.quote')}</Button>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <section className='bg-surface py-20 md:py-28'>
        <Container>
          <SectionHeading
            eyebrow={t('commitments.eyebrow')}
            title={t('commitments.title')}
          />
          <div className='mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
            {differentials.map((item, index) => (
              <Reveal key={item.id} delay={index * 0.08} className='h-full'>
                <SpotlightCard className='h-full p-7'>
                  <span
                    aria-hidden='true'
                    className='text-4xl font-extrabold leading-none text-brand-100'
                  >
                    0{index + 1}
                  </span>
                  <h3 className='mt-4 text-lg font-extrabold text-ink'>
                    {td(`items.${item.id}.title`)}
                  </h3>
                  <p className='mt-2.5 text-sm leading-relaxed text-muted'>
                    {td(`items.${item.id}.description`)}
                  </p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className='py-20 md:py-28'>
        <Container>
          <SectionHeading
            eyebrow={t('process.eyebrow')}
            title={t('process.title')}
          />
          <ol className='mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-5'>
            {processSteps.map((step, index) => (
              <li key={step.id}>
                <Reveal delay={index * 0.06}>
                  <span className='text-3xl font-extrabold text-brand-200'>
                    0{index + 1}
                  </span>
                  <h3 className='mt-3 text-lg font-extrabold text-ink'>
                    {tp(`steps.${step.id}.title`)}
                  </h3>
                  <p className='mt-2 text-sm leading-relaxed text-muted'>
                    {tp(`steps.${step.id}.description`)}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </>
  );
}
