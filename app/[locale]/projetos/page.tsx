import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { projects } from '@/data/projects';
import { PageHero } from '@/components/layout/PageHero';
import { pageHeroes } from '@/data/page-heroes';
import { ProjectCard } from '@/components/home/ProjectsSection';
import { Container } from '@/components/ui/Container';
import { pageAlternates } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.projetos' });
  return {
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: pageAlternates(locale, '/projetos'),
  };
}

/**
 * /projetos — galeria editorial dos trabalhos executados.
 */
export default async function ProjetosPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('pages.projetos');

  return (
    <>
      <PageHero
        image={{ ...pageHeroes.projetos, alt: t('hero.imageAlt') }}
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        description={t('hero.description')}
      />

      <Container className='py-20 md:py-28'>
        <div className='grid gap-6 md:grid-cols-2'>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              aspect='aspect-[16/11]'
              sizes='(min-width: 768px) 46vw, 92vw'
              priority={index < 2}
            />
          ))}
        </div>
      </Container>
    </>
  );
}
