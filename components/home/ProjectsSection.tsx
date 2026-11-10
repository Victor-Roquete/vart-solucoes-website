import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { MapPin } from 'lucide-react';
import type { Project } from '@/types';
import { projects } from '@/data/projects';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

interface ProjectCardProps {
  project: Project;
  className?: string;
  aspect: string;
  sizes: string;
  priority?: boolean;
}

/**
 * Card editorial de projeto — imagem com zoom no hover, overlay que revela
 * categoria, título, localização e ação. Exportado para reuso em /projetos.
 */
export function ProjectCard({
  project,
  className,
  aspect,
  sizes,
  priority = false,
}: ProjectCardProps) {
  const t = useTranslations('projects');
  return (
    <Reveal className={`h-full ${className ?? ''}`}>
      <Link
        href='/projetos'
        className={`group relative block h-full overflow-hidden rounded-xl shadow-card ${aspect}`}
      >
        <Image
          src={project.image}
          alt={t(`items.${project.id}.alt`)}
          fill
          priority={priority}
          sizes={sizes}
          className='object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.05]'
        />
        <div
          aria-hidden='true'
          className='absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/25 to-brand-950/5 transition-opacity duration-500 group-hover:from-brand-950/95'
        />

        <div className='absolute inset-x-0 bottom-0 p-6 md:p-8'>
          <p className='text-xs font-bold uppercase tracking-[0.24em] text-brand-300'>
            {t(`items.${project.id}.category`)}
          </p>
          <h3 className='mt-2 text-2xl font-extrabold text-white md:text-3xl'>
            {t(`items.${project.id}.title`)}
          </h3>
          <p className='mt-2 flex items-center gap-2 text-sm text-white/65'>
            <MapPin className='h-4 w-4 text-brand-300' aria-hidden='true' />
            {t(`items.${project.id}.location`)}
          </p>
          <span className='mt-4 inline-flex translate-y-2 items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-white opacity-0 transition-all duration-300 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100'>
            {t('ui.view')}
            <span aria-hidden='true'>→</span>
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

/**
 * Projetos — grelha editorial (não uma sequência de cards iguais):
 * dois projetos grandes em composição assimétrica + um largo + CTA.
 */
export function ProjectsSection() {
  const t = useTranslations('home.projects');
  const tc = useTranslations('common');
  const first = projects[0];
  const second = projects[1];
  const third = projects[2];

  // Grelha editorial exige 3 projetos; os dados garantem esse mínimo.
  if (!first || !second || !third) return null;

  return (
    <section className='py-20 md:py-28'>
      <Container>
        <div className='flex flex-wrap items-end justify-between gap-6'>
          <SectionHeading
            eyebrow={t('eyebrow')}
            title={t('title')}
            description={t('description')}
          />
          <Reveal delay={0.1} className='hidden md:block'>
            <Button href='/projetos' variant='secondary'>
              {t('all')}
            </Button>
          </Reveal>
        </div>

        <div className='mt-14 grid gap-6 lg:auto-rows-[440px] lg:grid-cols-12'>
          <ProjectCard
            project={first}
            className='lg:col-span-7'
            aspect='aspect-[16/11] lg:aspect-auto'
            sizes='(min-width: 1024px) 58vw, 92vw'
            priority
          />
          <ProjectCard
            project={second}
            className='lg:col-span-5'
            aspect='aspect-[16/11] lg:aspect-auto'
            sizes='(min-width: 1024px) 40vw, 92vw'
          />
          <ProjectCard
            project={third}
            className='lg:col-span-8'
            aspect='aspect-[16/10] lg:aspect-auto'
            sizes='(min-width: 1024px) 64vw, 92vw'
          />

          {/* Cartão de conversão */}
          <Reveal className='h-full lg:col-span-4' delay={0.1}>
            <div className='relative flex h-full min-h-[280px] flex-col justify-between overflow-hidden rounded-xl bg-brand-950 p-8'>
              <div aria-hidden='true' className='absolute inset-0 bg-blueprint' />
              <div
                aria-hidden='true'
                className='absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-600/25 blur-[80px]'
              />
              <div className='relative'>
                <p className='text-xs font-bold uppercase tracking-[0.24em] text-brand-300'>
                  {t('nextEyebrow')}
                </p>
                <h3 className='mt-3 text-2xl font-extrabold leading-snug text-white'>
                  {t('nextTitle')}
                </h3>
              </div>
              <div className='relative mt-8'>
                <Button href='/contato#orcamento' variant='light'>
                  {tc('nav.quote')}
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}