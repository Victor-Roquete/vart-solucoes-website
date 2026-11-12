'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { whatsappLink } from '@/lib/whatsapp';

/**
 * Botão WhatsApp flutuante.
 * Desktop: 56px · Mobile: 52px · Posição conforme especificação (24/16px).
 * Comporta tooltip no hover, anel de atenção discreto e aria-label.
 */
export function WhatsAppFloat() {
  const t = useTranslations('common');

  return (
    <motion.a
      href={whatsappLink(t('whatsapp.defaultMessage'))}
      target='_blank'
      rel='noopener noreferrer'
      aria-label={t('aria.whatsapp')}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.4, type: 'spring', stiffness: 260, damping: 20 }}
      className='group fixed bottom-5 right-4 z-40 md:bottom-6 md:right-6'
    >
      <span
        aria-hidden='true'
        className='absolute inset-0 rounded-full border-2 border-[#1faa59] animate-pulse-ring'
      />
      <span className='relative flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#1faa59] text-white shadow-card-hover transition-transform duration-300 group-hover:scale-105 md:h-14 md:w-14'>
        <WhatsAppIcon className='h-6 w-6 md:h-7 md:w-7' />
      </span>

      <span
        aria-hidden='true'
        className='pointer-events-none absolute right-full top-1/2 mr-3 hidden -translate-y-1/2 translate-x-2 whitespace-nowrap rounded-md border border-line bg-white px-3.5 py-2 text-xs font-bold text-brand-900 opacity-0 shadow-card transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 md:block'
      >
        {t('whatsapp.tooltip')}
      </span>
    </motion.a>
  );
}
