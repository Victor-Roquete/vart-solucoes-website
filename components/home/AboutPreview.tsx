import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { company } from '@/data/company';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

/**
 * Resumo institucional na Home — layout assimétrico com moldura técnica
 * deslocada e entrada escalonada do texto.
 */
export function AboutPreview() {
  return (
    <section className='py-20 md:py-28'>
      <Container>
        <div className='grid items-center gap-14 lg:grid-cols-2 lg:gap-20'>
          {/* Imagem com moldura editorial */}
          <Reveal className='relative mx-auto w-full max-w-[560px]'>
            <div
              aria-hidden='true'
              className='absolute -left-5 -top-5 -z-10 h-full w-full rounded-xl border border-brand-200'
            />
            <div className='relative aspect-[4/3] overflow-hidden rounded-xl shadow-card'>
              <Image
                src='/assets/services/manutencao-eletrobomba.webp'
                alt='Técnico da VART Soluções a realizar manutenção de eletrobomba'
                fill
                sizes='(min-width: 1024px) 46vw, 92vw'
                className='object-cover'
              />
            </div>
            <p className='mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted'>
              Manutenção técnica · Equipa VART
            </p>
          </Reveal>

          {/* Texto */}
          <div>
            <SectionHeading
              eyebrow='Sobre a VART'
              title='Critério técnico em cada instalação.'
              description={company.longDescription[0]}
            />
            <Reveal delay={0.15}>
              <p className='mt-5 leading-relaxed text-muted'>
                {company.longDescription[1]}
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <div className='mt-9'>
                <Button
                  href='/sobre'
                  icon={<ArrowRight className='h-4 w-4' aria-hidden='true' />}
                  className='min-w-[200px]'
                >
                  Conheça a empresa
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}