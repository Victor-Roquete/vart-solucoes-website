'use client';

import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { mainNav } from '@/data/navigation';
import { company } from '@/data/company';
import { VartSymbol } from '@/components/brand/VartSymbol';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { WHATSAPP_DEFAULT_MESSAGE } from '@/lib/constants';
import { whatsappMessage } from '@/lib/utils';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: EASE_OUT_EXPO },
  },
};

/**
 * Menu mobile em drawer lateral com acessibilidade completa:
 * bloqueio de scroll, trap de foco, fecho por ESC/overlay e itens escalonados.
 */
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panelRef.current
      ?.querySelector<HTMLElement>('a[href], button:not([disabled])')
      ?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (!focusables || focusables.length === 0) return;

      const first = focusables[0]!;
      const last = focusables[focusables.length - 1]!;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div
          className='fixed inset-0 z-[70] lg:hidden'
          role='dialog'
          aria-modal='true'
          aria-label='Menu de navegação'
        >
          {/* Overlay */}
          <motion.button
            type='button'
            aria-label='Fechar menu'
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='absolute inset-0 h-full w-full cursor-default bg-brand-950/70 backdrop-blur-sm'
          />

          {/* Painel */}
          <motion.div
            ref={panelRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
            className='absolute right-0 top-0 flex h-full w-[88%] max-w-sm flex-col overflow-y-auto bg-brand-950 shadow-header'
          >
            <div className='flex items-center justify-between border-b border-white/10 px-6 py-5'>
              <span className='flex items-center gap-3'>
                <VartSymbol className='h-8 w-8 text-white' idSuffix='menu' />
                <span className='text-lg font-extrabold tracking-[0.22em] text-white'>
                  VART
                </span>
              </span>
              <button
                type='button'
                onClick={onClose}
                aria-label='Fechar menu de navegação'
                className='inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/15 text-white transition-colors duration-300 hover:border-white/40 hover:bg-white/10'
              >
                <X className='h-5 w-5' aria-hidden='true' />
              </button>
            </div>

            <motion.nav
              aria-label='Navegação do menu'
              variants={listVariants}
              initial='hidden'
              animate='visible'
              className='flex flex-1 flex-col px-6 pb-8 pt-6'
            >
              <ul className='space-y-2'>
                {mainNav.map((item, index) => (
                  <motion.li key={item.href} variants={itemVariants}>
                    <a
                      href={item.href}
                      className='group flex items-baseline gap-4 py-3 text-2xl font-extrabold uppercase tracking-[0.06em] text-white/80 transition-colors duration-300 hover:text-white'
                    >
                      <span className='text-xs font-bold tracking-[0.2em] text-brand-400'>
                        0{index + 1}
                      </span>
                      {item.label}
                      <span
                        aria-hidden='true'
                        className='ml-auto h-px w-0 self-center bg-brand-400 transition-all duration-300 group-hover:w-8'
                      />
                    </a>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                variants={itemVariants}
                className='mt-auto space-y-3 pt-10'
              >
                <a
                  href='/contato#orcamento'
                  className='flex h-[52px] w-full items-center justify-center rounded-md bg-white text-sm font-bold uppercase tracking-[0.08em] text-brand-900 transition-all duration-300 hover:bg-brand-50'
                >
                  Solicitar orçamento
                </a>
                <a
                  href={`${company.whatsapp.waUrl}?text=${whatsappMessage(WHATSAPP_DEFAULT_MESSAGE)}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex h-[52px] w-full items-center justify-center gap-2.5 rounded-md border border-white/20 text-sm font-bold uppercase tracking-[0.08em] text-white transition-colors duration-300 hover:border-white/40 hover:bg-white/10'
                >
                  <WhatsAppIcon className='h-5 w-5' />
                  WhatsApp
                </a>
              </motion.div>
            </motion.nav>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}