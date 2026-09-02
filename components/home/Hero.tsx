'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const HEADLINE = ['Soluções', 'técnicas', 'para', 'sua', 'obra.'];
const SERVICE_CHIPS = ['Canalização', 'Eletrobombas', 'Piscinas', 'Manutenção'];

/**
 * Hero cinematográfico — entrada escalonada (palavra a palavra) e parallax
 * discreto na imagem. Respeita prefers-reduced-motion.
 */
export function Hero() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 72]);

  return (
    <section
      ref={sectionRef}
      className='relative overflow-hidden bg-brand-950 pb-20 pt-[124px] md:pb-28 md:pt-[176px]'
    >
      {/* Atmosfera técnica */}
      <div aria-hidden='true' className='absolute inset-0 bg-blueprint' />
      <div
        aria-hidden='true'
        className='absolute -left-40 top-24 h-[460px] w-[460px] rounded-full bg-brand-700/25 blur-[140px]'
      />
      <div
        aria-hidden='true'
        className='absolute -right-32 bottom-0 h-[380px] w-[380px] rounded-full bg-brand-500/15 blur-[140px]'
      />

      <Container className='relative'>
        <div className='grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20'>
          {/* Conteúdo */}
          <div>
            <motion.p
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
              className='flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-brand-300'
            >
              <span aria-hidden='true' className='h-px w-10 bg-brand-300/60' />
              Prestação de serviços técnicos
            </motion.p>

            <h1 className='mt-7 text-[42px] font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl xl:text-[68px]'>
              {HEADLINE.map((word, index) => (
                <span
                  key={`${word}-${index}`}
                  className='inline-block overflow-hidden pb-1 align-bottom'
                >
                  <motion.span
                    className='inline-block'
                    initial={reducedMotion ? false : { y: '112%' }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 0.85,
                      delay: 0.18 + index * 0.07,
                      ease: EASE_OUT_EXPO,
                    }}
                  >
                    {word}
                    {index < HEADLINE.length - 1 ? '\u00A0' : ''}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45, ease: EASE_OUT_EXPO }}
              className='mt-6 max-w-xl text-base leading-relaxed text-white/70 md:text-lg'
            >
              Instalações hidráulicas, sistemas de bombeamento, piscinas e
              manutenção técnica — executados com precisão e comprovação em
              cada etapa.
            </motion.p>

            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55, ease: EASE_OUT_EXPO }}
              className='mt-9 flex flex-wrap gap-4'
            >
              <Button href='/contato#orcamento' variant='light' size='lg'>
                Solicitar orçamento
              </Button>
              <Button
                href='/servicos'
                variant='secondary'
                size='lg'
                className='border-white/25 text-white hover:bg-white/10'
              >
                Ver serviços
              </Button>
            </motion.div>

            <motion.ul
              initial={reducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className='mt-10 flex flex-wrap gap-2.5'
            >
              {SERVICE_CHIPS.map((chip) => (
                <li key={chip}>
                  <Link
                    href='/servicos'
                    className='inline-block rounded-full border border-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white/65 transition-all duration-300 hover:border-brand-400/60 hover:text-white'
                  >
                    {chip}
                  </Link>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Imagem editorial com parallax */}
          <motion.div
            style={{ y: imageY }}
            className='relative mx-auto w-full max-w-[520px]'
          >
            <motion.div
              initial={
                reducedMotion ? false : { opacity: 0, scale: 1.04, y: 24 }
              }
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.35, ease: EASE_OUT_EXPO }}
              className='relative'
            >
              <div className='relative aspect-[3/4] overflow-hidden rounded-xl border border-white/10 shadow-card-hover'>
                <Image
                  src='/assets/services/instalacao-ppr.webp'
                  alt='Tubagem PPR instalada pela VART Soluções em habitação em Luanda'
                  fill
                  priority
                  sizes='(min-width: 1024px) 44vw, 92vw'
                  className='object-cover'
                />
                <div
                  aria-hidden='true'
                  className='absolute inset-0 bg-gradient-to-t from-brand-950/70 via-transparent to-transparent'
                />
                <div className='absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-lg border border-white/15 bg-brand-950/70 px-4 py-3 backdrop-blur-md'>
                  <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white/10'>
                    <MapPin
                      className='h-4 w-4 text-brand-300'
                      aria-hidden='true'
                    />
                  </span>
                  <span className='text-sm leading-tight'>
                    <span className='block font-bold text-white'>
                      Rede hidráulica em PPR
                    </span>
                    <span className='mt-0.5 block text-xs text-white/60'>
                      Residencial · Luanda
                    </span>
                  </span>
                </div>
              </div>
              <div
                aria-hidden='true'
                className='absolute -bottom-5 -right-5 -z-10 h-full w-full rounded-xl border border-brand-700/60'
              />
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}