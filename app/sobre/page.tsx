import type { Metadata } from 'next';
import Image from 'next/image';
import { company } from '@/data/company';
import { differentials } from '@/data/home';
import { processSteps } from '@/data/home';
import { PageHero } from '@/components/layout/PageHero';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Sobre nós',
  description: company.shortDescription,
  alternates: { canonical: '/sobre' },
};

/**
 * /sobre — história, compromissos e forma de trabalhar da VART.
 */
export default function SobrePage() {
  return (
    <>
      <PageHero
        eyebrow='Sobre nós'
        title='Técnica, compromisso e trabalho comprovado.'
        description={company.shortDescription}
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
                  src='/assets/services/obra-onga-montagem-de-eletrobomba.avif'
                  alt='Equipa da VART Soluções na montagem de eletrobomba'
                  fill
                  sizes='(min-width: 1024px) 46vw, 92vw'
                />
              </div>
            </Reveal>

            <div>
              <SectionHeading
                eyebrow='A empresa'
                title='A VART Soluções nasceu para resolver.'
              />
              {company.longDescription.map((paragraph) => (
                <Reveal key={paragraph.slice(0, 24)} delay={0.1}>
                  <p className='mt-5 leading-relaxed text-muted'>{paragraph}</p>
                </Reveal>
              ))}
              <Reveal delay={0.2}>
                <div className='mt-9'>
                  <Button href='/contato#orcamento'>Solicitar orçamento</Button>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <section className='bg-surface py-20 md:py-28'>
        <Container>
          <SectionHeading
            eyebrow='Compromissos'
            title='O que nunca falta num serviço da VART.'
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
                    {item.title}
                  </h3>
                  <p className='mt-2.5 text-sm leading-relaxed text-muted'>
                    {item.description}
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
            eyebrow='Como trabalhamos'
            title='Processo definido, resultado previsível.'
          />
          <ol className='mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-5'>
            {processSteps.map((step, index) => (
              <li key={step.id}>
                <Reveal delay={index * 0.06}>
                  <span className='text-3xl font-extrabold text-brand-200'>
                    0{index + 1}
                  </span>
                  <h3 className='mt-3 text-lg font-extrabold text-ink'>
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
    </>
  );
}