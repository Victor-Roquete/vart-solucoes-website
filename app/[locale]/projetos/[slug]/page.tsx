import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { MapPin } from 'lucide-react';
import { projects } from '@/data/projects';
import { PageHero } from '@/components/layout/PageHero';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { routing } from '@/i18n/routing';
import { pageSeo } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbList } from '@/lib/schema';

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  const t = await getTranslations({ locale, namespace: 'projects' });
  return {
    title: t(`items.${project.id}.title`),
    description: t(`items.${project.id}.description`),
    ...pageSeo(
      locale,
      `/projetos/${slug}`,
      t(`items.${project.id}.title`),
      t(`items.${project.id}.description`)
    ),
  };
}

/**
 * /projetos/<slug> — uma obra: cabeçalho com a fotografia de capa, local,
 * descrição e galeria de fotografias reais. Textos em messages/<idioma>/projects.json.
 */
export default async function ProjetoPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const t = await getTranslations('projects');
  const tp = await getTranslations('pages.projetos');
  const th = await getTranslations('home.projects');
  const tg = await getTranslations('common');
  const key = `items.${project.id}`;
  const title = t(`${key}.title`);

  return (
    <>
      <JsonLd
        data={breadcrumbList(locale, [
          { name: tp('hero.eyebrow'), path: '/projetos' },
          { name: title, path: `/projetos/${slug}` },
        ])}
      />
      <PageHero
        image={{
          src: project.image,
          alt: t(`${key}.alt`),
          position: '50% 50%',
        }}
        eyebrow={t(`${key}.category`)}
        title={title}
        description={t(`${key}.description`)}
      >
        <p className='flex items-center gap-2 text-sm text-white/75'>
          <MapPin className='h-4 w-4 text-brand-300' aria-hidden='true' />
          {t(`${key}.location`)}
        </p>
      </PageHero>

      <Container className='py-16 md:py-24'>
        {project.gallery && project.gallery.length > 0 && (
          <section aria-label={t('page.galleryTitle')}>
            <Reveal>
              <h2 className='flex items-center gap-4 text-xs font-bold uppercase tracking-[0.28em] text-brand-500'>
                <span aria-hidden='true' className='h-px w-10 bg-brand-400' />
                {t('page.galleryTitle')}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className='mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                {project.gallery.map((src, i) => (
                  <li
                    key={src}
                    className='relative aspect-[4/3] overflow-hidden rounded-xl shadow-card'
                  >
                    <Image
                      src={src}
                      alt={t('page.galleryAlt', { title, n: i + 1 })}
                      fill
                      sizes='(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw'
                      className='object-cover transition-transform duration-500 ease-out hover:scale-105'
                    />
                  </li>
                ))}
              </ul>
            </Reveal>
          </section>
        )}

        <div className='mt-14 flex flex-wrap items-center justify-between gap-4'>
          <Button href='/projetos' variant='secondary'>
            {th('all')}
          </Button>
          <Button href='/contato#orcamento'>{tg('nav.quote')}</Button>
        </div>
      </Container>
    </>
  );
}
