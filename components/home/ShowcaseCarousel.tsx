'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { showcaseSlides } from '@/data/showcase';
import { CAROUSEL_AUTOPLAY_DELAY } from '@/lib/constants';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Container } from '@/components/ui/Container';
import { cn } from '@/lib/utils';

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/**
 * Carrossel principal — narrativa visual das áreas de atuação.
 * Imagem com reveal + legenda animada, contador, barra de progresso
 * sincronizada com o autoplay e navegação por pontos/setas.
 */
export function ShowcaseCarousel() {
  const reducedMotion = useReducedMotion();
  const autoplayPlugin = useMemo(
    () =>
      Autoplay({
        delay: CAROUSEL_AUTOPLAY_DELAY,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    []
  );
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [autoplayPlugin]
  );
  const [selected, setSelected] = useState(0);
  const total = showcaseSlides.length;

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    onSelect();
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className='py-20 md:py-28'>
      <Container>
        <SectionHeading
          eyebrow='A VART em ação'
          title='O que fazemos, mostrado de perto.'
          description='Áreas de atuação ilustradas com trabalhos reais executados pela nossa equipa técnica.'
        />

        <div
          ref={emblaRef}
          className='mt-14 overflow-hidden rounded-xl shadow-card'
        >
          <div className='flex'>
            {showcaseSlides.map((slide, index) => (
              <figure
                key={slide.id}
                className='relative h-[500px] min-w-0 flex-[0_0_100%] md:h-[560px]'
              >
                <motion.div
                  className='absolute inset-0'
                  initial={false}
                  animate={{
                    scale: index === selected ? 1 : 1.06,
                    opacity: index === selected ? 1 : 0.35,
                  }}
                  transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
                >
                  <Image
                    src={slide.image}
                    alt={slide.imageAlt}
                    fill
                    sizes='100vw'
                    quality={85}
                    className='object-cover'
                  />
                </motion.div>
                <div
                  aria-hidden='true'
                  className='absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/25 to-transparent'
                />

                <AnimatePresence mode='wait' initial={false}>
                  {index === selected && (
                    <motion.figcaption
                      key={slide.id}
                      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                      className='absolute inset-x-0 bottom-0 p-6 md:p-10'
                    >
                      <span className='text-xs font-bold uppercase tracking-[0.28em] text-brand-300'>
                        {slide.category}
                      </span>
                      <h3 className='mt-3 text-3xl font-extrabold text-white md:text-4xl'>
                        {slide.title}
                      </h3>
                      <p className='mt-3 max-w-xl text-sm leading-relaxed text-white/75 md:text-base'>
                        {slide.description}
                      </p>
                      <Link
                        href={slide.href}
                        data-cursor-label='Ver serviço'
                        className='group mt-5 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.12em] text-white transition-colors duration-300 hover:text-brand-300'
                      >
                        Saber mais
                        <ArrowRight
                          className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-1'
                          aria-hidden='true'
                        />
                      </Link>
                    </motion.figcaption>
                  )}
                </AnimatePresence>
              </figure>
            ))}
          </div>
        </div>

        {/* Controles */}
        <div className='mt-8 flex flex-wrap items-center justify-between gap-6'>
          <div className='flex items-center gap-6'>
            <span
              className='text-sm font-bold tracking-[0.2em] text-brand-800'
              aria-live='polite'
            >
              {String(selected + 1).padStart(2, '0')}
              <span className='mx-1.5 text-muted'>/</span>
              <span className='text-muted'>
                {String(total).padStart(2, '0')}
              </span>
            </span>
            <span
              aria-hidden='true'
              className='relative h-[3px] w-28 overflow-hidden rounded-full bg-line md:w-40'
            >
              <span
                key={selected}
                className='animate-progress absolute inset-0 origin-left rounded-full bg-brand-600'
                style={{ animationDuration: `${CAROUSEL_AUTOPLAY_DELAY}ms` }}
              />
            </span>
          </div>

          <div className='flex items-center gap-2'>
            {showcaseSlides.map((slide, index) => (
              <button
                key={slide.id}
                type='button'
                onClick={() => emblaApi?.scrollTo(index)}
                aria-label={`Ir para o slide ${index + 1}: ${slide.title}`}
                aria-current={index === selected}
                className={cn(
                  'h-2 rounded-full transition-all duration-300',
                  index === selected
                    ? 'w-8 bg-brand-700'
                    : 'w-2 bg-line hover:bg-brand-300'
                )}
              />
            ))}
            <span
              aria-hidden='true'
              className='mx-2 hidden h-6 w-px bg-line md:block'
            />
            <button
              type='button'
              onClick={scrollPrev}
              aria-label='Slide anterior'
              className='flex h-11 w-11 items-center justify-center rounded-md border border-line text-brand-800 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400 hover:bg-brand-50'
            >
              <ArrowLeft className='h-5 w-5' aria-hidden='true' />
            </button>
            <button
              type='button'
              onClick={scrollNext}
              aria-label='Próximo slide'
              className='flex h-11 w-11 items-center justify-center rounded-md border border-line text-brand-800 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400 hover:bg-brand-50'
            >
              <ArrowRight className='h-5 w-5' aria-hidden='true' />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}