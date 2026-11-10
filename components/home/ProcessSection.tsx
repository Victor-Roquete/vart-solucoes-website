import { useTranslations } from 'next-intl';
import { processSteps } from '@/data/home';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

/**
 * Processo de trabalho — 5 etapas: horizontal no desktop (com linha de
 * ligação) e vertical no mobile.
 */
export function ProcessSection() {
  const t = useTranslations('home.process');
  return (
    <section className='bg-surface py-20 md:py-28'>
      <Container>
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('description')}
        />

        <ol className='relative mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6'>
          {/* Linha de ligação (desktop) */}
          <div
            aria-hidden='true'
            className='absolute left-0 right-0 top-[26px] hidden h-px bg-line lg:block'
          />

          {processSteps.map((step, index) => (
            <li key={step.id} className='relative'>
              <Reveal delay={index * 0.08}>
                <span className='relative z-10 flex h-[52px] w-[52px] items-center justify-center rounded-full border border-brand-200 bg-white text-sm font-extrabold text-brand-800 shadow-card'>
                  0{index + 1}
                </span>
                <h3 className='mt-5 text-lg font-extrabold text-ink'>
                  {t(`steps.${step.id}.title`)}
                </h3>
                <p className='mt-2 text-sm leading-relaxed text-muted'>
                  {t(`steps.${step.id}.description`)}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}