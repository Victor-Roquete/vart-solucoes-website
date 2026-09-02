import { processSteps } from '@/data/home';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

/**
 * Processo de trabalho — 5 etapas: horizontal no desktop (com linha de
 * ligação) e vertical no mobile.
 */
export function ProcessSection() {
  return (
    <section className='bg-surface py-20 md:py-28'>
      <Container>
        <SectionHeading
          eyebrow='Como trabalhamos'
          title='Um processo claro, do contacto à entrega.'
          description='Nenhuma etapa improvisada: sabe sempre em que ponto do trabalho estamos.'
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
                  {step.title}
                </h3>
                <p className='mt-2 text-sm leading-relaxed text-muted'>
                  {step.description}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}