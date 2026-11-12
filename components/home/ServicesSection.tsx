'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { featuredServices } from '@/data/services';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils';

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/**
 * Serviços interativos — no desktop, a lista reage ao cursor e a imagem
 * grande troca com crossfade; no mobile, cards empilhados com foto.
 */
export function ServicesSection() {
  const t = useTranslations('home.services');
  const ts = useTranslations('services');
  const [active, setActive] = useState(0);
  const activeService = featuredServices[active];

  // Os dados garantem ao menos um serviço destacado.
  if (!activeService) return null;

  return (
    <section className='bg-surface py-20 md:py-28'>
      <Container>
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('description')}
        />

        {/* Desktop — lista interativa + imagem grande */}
        <div className='mt-14 hidden lg:grid lg:grid-cols-[1fr_460px] lg:gap-14'>
          <ul className='divide-y divide-line border-y border-line'>
            {featuredServices.map((service, index) => (
              <li key={service.id}>
                <Link
                  href={service.href}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  data-cursor-label={t('view')}
                  className={cn(
                    'group flex items-center justify-between gap-6 py-5 transition-opacity duration-300',
                    active === index
                      ? 'opacity-100'
                      : 'opacity-55 hover:opacity-90'
                  )}
                >
                  <div>
                    <p className='text-xs font-bold tracking-[0.2em] text-brand-400'>
                      0{index + 1}
                    </p>
                    <h3 className='mt-2 text-2xl font-extrabold tracking-tight text-ink transition-transform duration-300 ease-out-expo group-hover:translate-x-1.5'>
                      {ts(`items.${service.id}.title`)}
                    </h3>
                    <p className='mt-1.5 text-sm text-muted'>
                      {ts(`items.${service.id}.tagline`)}
                    </p>
                  </div>
                  <ArrowUpRight
                    className='h-6 w-6 shrink-0 text-brand-400 transition-transform duration-300 ease-out-expo group-hover:-translate-y-1 group-hover:translate-x-1'
                    aria-hidden='true'
                  />
                </Link>
              </li>
            ))}
          </ul>

          <div className='relative h-[520px] self-start overflow-hidden rounded-xl shadow-card lg:sticky lg:top-28'>
            <AnimatePresence mode='popLayout' initial={false}>
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
                className='absolute inset-0'
              >
                <Image
                  src={activeService.image}
                  alt={ts(`items.${activeService.id}.alt`)}
                  fill
                  sizes='460px'
                  className='object-cover'
                />
              </motion.div>
            </AnimatePresence>
            <div
              aria-hidden='true'
              className='absolute inset-0 bg-gradient-to-t from-brand-950/80 via-transparent to-transparent'
            />
            <AnimatePresence mode='wait' initial={false}>
              <motion.div
                key={`${activeService.id}-label`}
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
                className='absolute bottom-5 left-5 right-5'
              >
                <p className='text-lg font-extrabold text-white'>
                  {ts(`items.${activeService.id}.title`)}
                </p>
                <p className='text-sm text-white/70'>{ts(`items.${activeService.id}.tagline`)}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile/Tablet — cards empilhados */}
        <div className='mt-12 grid gap-6 sm:grid-cols-2 lg:hidden'>
          {featuredServices.map((service, index) => (
            <Reveal key={service.id} delay={index * 0.06}>
              <Link
                href={service.href}
                className='group block h-full overflow-hidden rounded-lg border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-card-hover'
              >
                <div className='relative aspect-[16/10] overflow-hidden'>
                  <Image
                    src={service.image}
                    alt={ts(`items.${service.id}.alt`)}
                    fill
                    sizes='(min-width: 640px) 45vw, 92vw'
                    className='object-cover transition-transform duration-500 ease-out-expo group-hover:scale-[1.04]'
                  />
                </div>
                <div className='p-5'>
                  <p className='text-xs font-bold tracking-[0.2em] text-brand-400'>
                    0{index + 1}
                  </p>
                  <h3 className='mt-2 text-lg font-extrabold text-ink'>
                    {ts(`items.${service.id}.title`)}
                  </h3>
                  <p className='mt-1.5 text-sm leading-relaxed text-muted'>
                    {ts(`items.${service.id}.tagline`)}
                  </p>
                  <span className='mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-brand-700'>
                    {t('view')}
                    <ArrowUpRight
                      className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                      aria-hidden='true'
                    />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}