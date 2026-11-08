'use client';

import { useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { heroSlides } from '@/data/hero';
import { HERO_AUTOPLAY_DELAY } from '@/lib/constants';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { cn } from '@/lib/utils';

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
const DESKTOP_QUERY = '(min-width: 768px)';

function subscribeDesktop(onChange: () => void) {
  const mq = window.matchMedia(DESKTOP_QUERY);
  mq.addEventListener('change', onChange);
  return () => mq.removeEventListener('change', onChange);
}
const getDesktopSnapshot = () => window.matchMedia(DESKTOP_QUERY).matches;
const getDesktopServerSnapshot = () => false;

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Hero em ecrã inteiro: crossfade + zoom lento, texto à frente, autoplay
 * automático (sem botão de pausa; pausa por foco de teclado e separador oculto).
 * Slides 'portrait': em desktop, foto vertical nítida sobre o mesmo fundo
 * desfocado; em telemóvel, a foto cobre o ecrã.
 */
export function Hero() {
  const reducedMotion = useReducedMotion();
  const isDesktop = useSyncExternalStore(
    subscribeDesktop,
    getDesktopSnapshot,
    getDesktopServerSnapshot
  );
  const slides = useMemo(
    () =>
      heroSlides.filter(
        (s) => s.show === 'all' || s.show === (isDesktop ? 'desktop' : 'mobile')
      ),
    [isDesktop]
  );

  const [index, setIndex] = useState(0);
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(false);

  const total = slides.length;
  const current = total > 0 ? index % total : 0;
  const running = !reducedMotion && !focused && !hidden && total > 1;

  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  useEffect(() => {
    if (!running) return;
    const id = window.setTimeout(
      () => setIndex((i) => (i + 1) % total),
      HERO_AUTOPLAY_DELAY
    );
    return () => window.clearTimeout(id);
  }, [running, current, total]);

  const slide = slides[current];
  if (!slide) return null;

  return (
    <section
      aria-roledescription='carousel'
      aria-label='Destaques da VART Soluções'
      onFocus={(e) =>
        setFocused((e.target as HTMLElement).matches(':focus-visible'))
      }
      onBlur={() => setFocused(false)}
      className='relative isolate h-[100svh] min-h-[640px] w-full overflow-hidden bg-brand-950'
    >
      {/* Fundos: atual + vizinhos (pré-carregamento) */}
      {slides.map((s, i) => {
        const isCurrent = i === current;
        const isNeighbour =
          i === (current + 1) % total || i === (current - 1 + total) % total;
        if (!isCurrent && !isNeighbour) return null;
        const portrait = s.layout === 'portrait';

        return (
          <div
            key={s.id}
            aria-hidden={!isCurrent}
            className={cn(
              'absolute inset-0 transition-opacity duration-1000 ease-out',
              isCurrent ? 'opacity-100' : 'opacity-0'
            )}
          >
            <div
              className={cn('absolute', portrait ? 'inset-0 md:-inset-16' : 'inset-0')}
            >
              <Image
                src={s.image}
                alt={!portrait && isCurrent ? s.imageAlt : ''}
                fill
                priority={i === 0}
                sizes='100vw'
                quality={portrait ? 60 : 80}
                className={cn(
                  'object-cover transition-transform duration-[8000ms] ease-out',
                  isCurrent ? 'scale-100' : 'scale-[1.06]',
                  portrait && 'md:blur-2xl md:brightness-[0.65]'
                )}
                style={{ objectPosition: s.focus ?? '50% 45%' }}
              />
            </div>
          </div>
        );
      })}

      {/* Contraste do texto e do header */}
      <div
        aria-hidden='true'
        className='absolute inset-0 bg-gradient-to-r from-brand-950/85 via-brand-950/45 to-brand-950/10'
      />
      <div
        aria-hidden='true'
        className='absolute inset-0 bg-gradient-to-t from-brand-950/80 via-transparent to-brand-950/40'
      />

      {/* Foto vertical em painel lateral de ponta a ponta (desktop) */}
      <AnimatePresence initial={false}>
        {slide.layout === 'portrait' && (
          <motion.div
            key={`portrait-${slide.id}`}
            initial={reducedMotion ? false : { opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
            className='pointer-events-none absolute inset-y-0 right-0 z-[5] hidden w-[42vw] md:block'
          >
            <Image
              src={slide.image}
              alt={slide.imageAlt}
              fill
              sizes='42vw'
              quality={85}
              className='object-cover'
              style={{ objectPosition: slide.focus ?? '50% 45%' }}
            />
            <div
              aria-hidden='true'
              className='absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-brand-950/90 via-brand-950/30 to-transparent'
            />
            <div
              aria-hidden='true'
              className='absolute inset-0 bg-gradient-to-t from-brand-950/55 via-transparent to-brand-950/35'
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Conteúdo */}
      <div className='relative z-10 flex h-full flex-col justify-end pb-28 pt-28 md:justify-center md:pb-24'>
        <Container>
          <motion.p
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
            className='flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-brand-300'
          >
            <span aria-hidden='true' className='h-px w-10 bg-brand-300/60' />
            Prestação de serviços técnicos
          </motion.p>

          <motion.h1
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE_OUT_EXPO }}
            className='mt-6 max-w-3xl text-[40px] font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl xl:text-[72px]'
          >
            Soluções técnicas para a sua obra.
          </motion.h1>

          <AnimatePresence mode='wait' initial={false}>
            <motion.div
              key={slide.id}
              initial={reducedMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
              className='mt-8 max-w-xl border-l-2 border-brand-400 pl-5'
            >
              <p className='text-xs font-bold uppercase tracking-[0.24em] text-brand-300'>
                {slide.eyebrow}
              </p>
              <p className='mt-2 text-2xl font-bold text-white md:text-3xl'>
                {slide.title}
              </p>
              <p className='mt-2 text-base leading-relaxed text-white/80 md:text-lg'>
                {slide.description}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className='mt-9 flex flex-wrap gap-4'>
            <Button href='/contato#orcamento' variant='light' size='lg'>
              Solicitar orçamento
            </Button>
            <Button
              href={slide.href}
              variant='secondary'
              size='lg'
              className='border-white/25 text-white hover:bg-white/10'
            >
              Ver serviço
            </Button>
          </div>
        </Container>
      </div>

      {/* Indicadores (sem botão de pausa) */}
      <div className='absolute inset-x-0 bottom-0 z-20 pb-5 md:pb-8'>
        <Container>
          <div className='flex items-center gap-4'>
            <span className='text-xs font-bold tracking-[0.2em] text-white/80'>
              {pad(current + 1)}
              <span className='mx-1.5 text-white/40'>/</span>
              <span className='text-white/50'>{pad(total)}</span>
            </span>

            <div className='flex flex-1 items-center gap-2 md:max-w-md'>
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  type='button'
                  onClick={() => setIndex(i)}
                  aria-label={`Ir para o slide ${i + 1}: ${s.title}`}
                  aria-current={i === current}
                  className='group relative h-8 flex-1'
                >
                  <span
                    aria-hidden='true'
                    className='absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 overflow-hidden rounded-full bg-white/25 transition-all duration-300 group-hover:h-[5px]'
                  >
                    <span
                      key={`${s.id}-${i === current && running}`}
                      className={cn(
                        'absolute inset-0 origin-left rounded-full bg-white',
                        i < current && 'scale-x-100',
                        i > current && 'scale-x-0',
                        i === current &&
                          (running ? 'animate-progress' : 'scale-x-100')
                      )}
                      style={
                        i === current && running
                          ? { animationDuration: `${HERO_AUTOPLAY_DELAY}ms` }
                          : undefined
                      }
                    />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
