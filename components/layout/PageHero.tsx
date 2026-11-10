import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export interface PageHeroImage {
  src: string;
  alt: string;
  /** object-position CSS (ex.: '50% 40%') para enquadrar a foto na faixa larga. */
  position?: string;
}

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  /** Fotografia real de fundo; sem ela, mantém-se a grelha técnica. */
  image?: PageHeroImage;
  children?: ReactNode;
  className?: string;
}

/**
 * Cabeçalho das páginas internas — fotografia real de fundo com gradiente
 * azul-marinho (texto sempre legível), entrada escalonada e espaço para
 * conteúdo extra (ex.: breadcrumb/CTA).
 */
export function PageHero({
  eyebrow,
  title,
  description,
  image,
  children,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        'relative overflow-hidden bg-brand-950 pb-16 pt-[140px] md:pb-24 md:pt-[190px]',
        className
      )}
    >
      {image ? (
        <>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            quality={80}
            sizes='100vw'
            className='object-cover'
            style={{ objectPosition: image.position ?? '50% 50%' }}
          />
          <div
            aria-hidden='true'
            className='absolute inset-0 bg-gradient-to-r from-brand-950/90 via-brand-950/65 to-brand-950/30'
          />
          <div
            aria-hidden='true'
            className='absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-brand-950/70 to-transparent'
          />
        </>
      ) : (
        <>
          <div aria-hidden='true' className='absolute inset-0 bg-blueprint' />
          <div
            aria-hidden='true'
            className='absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-brand-700/30 blur-[120px]'
          />
          <div
            aria-hidden='true'
            className='absolute -bottom-40 -left-24 h-[360px] w-[360px] rounded-full bg-brand-600/20 blur-[120px]'
          />
        </>
      )}

      <div className='relative mx-auto w-full max-w-[1280px] px-6 md:px-10'>
        <p className='flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-brand-300'>
          <span aria-hidden='true' className='h-px w-10 bg-brand-300/60' />
          {eyebrow}
        </p>
        <h1 className='mt-5 max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight text-white text-balance md:text-6xl'>
          {title}
        </h1>
        {description && (
          <p className='mt-6 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg'>
            {description}
          </p>
        )}
        {children && <div className='mt-9'>{children}</div>}
      </div>
    </section>
  );
}
