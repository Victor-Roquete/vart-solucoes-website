'use client';

import { useRef } from 'react';
import Image from 'next/image';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/**
 * Seção de impacto — imagem full-width com parallax suave e frase de marca.
 * Respiro visual entre blocos densos de conteúdo.
 */
export function ImpactSection() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <section
      ref={sectionRef}
      className='relative h-[440px] overflow-hidden md:h-[600px]'
    >
      <motion.div
        style={{ y }}
        className='absolute -inset-y-[12%] inset-x-0'
      >
        <Image
          src='/assets/services/instalacao-ppr-2.webp'
          alt='Detalhe de rede hidráulica em PPR executada pela VART Soluções'
          fill
          sizes='100vw'
          quality={80}
          className='object-cover'
        />
      </motion.div>

      <div
        aria-hidden='true'
        className='absolute inset-0 bg-gradient-to-r from-brand-950/85 via-brand-950/40 to-brand-950/15'
      />

      <Container className='relative flex h-full items-center'>
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
        >
          <p className='flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-brand-300'>
            <span aria-hidden='true' className='h-px w-10 bg-brand-300/60' />
            Da avaliação à entrega
          </p>
          <h2 className='mt-5 max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight text-white text-balance md:text-5xl'>
            Execução com critério, do primeiro metro ao último teste.
          </h2>
          <div className='mt-9'>
            <Button href='/projetos' variant='light' size='lg'>
              Ver projetos
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}