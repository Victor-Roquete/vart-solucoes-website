'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Check, ChevronDown } from 'lucide-react';
import { Link, usePathname } from '@/i18n/navigation';
import { routing, type AppLocale } from '@/i18n/routing';
import { Flag } from '@/components/ui/Flag';
import { cn } from '@/lib/utils';

const LOCALE_NAMES: Record<AppLocale, string> = {
  pt: 'Português',
  en: 'English',
  es: 'Español',
  fr: 'Français',
};

interface LanguageSwitcherProps {
  /** dropdown = cabeçalho desktop · inline = menu mobile */
  variant?: 'dropdown' | 'inline';
  className?: string;
}

/** Seletor de idioma com bandeiras; mantém a página atual ao trocar. */
export function LanguageSwitcher({
  variant = 'dropdown',
  className,
}: LanguageSwitcherProps) {
  const t = useTranslations('common.language');
  const current = useLocale() as AppLocale;
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  if (variant === 'inline') {
    return (
      <nav aria-label={t('label')} className={className}>
        <ul className='flex flex-wrap items-center gap-2'>
          {routing.locales.map((locale) => (
            <li key={locale}>
              <Link
                href={pathname}
                locale={locale}
                lang={locale}
                aria-label={LOCALE_NAMES[locale]}
                aria-current={locale === current ? 'true' : undefined}
                className={cn(
                  'flex h-11 items-center gap-2 rounded-md border px-3 text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors duration-300',
                  locale === current
                    ? 'border-brand-400 bg-white/10'
                    : 'border-white/15 hover:border-white/40 hover:bg-white/10'
                )}
              >
                <Flag locale={locale} />
                {locale}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  return (
    <div ref={rootRef} className={cn('relative', className)}>
      <button
        type='button'
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`${t('label')}: ${LOCALE_NAMES[current]}`}
        className='inline-flex h-11 items-center gap-2 rounded-md border border-white/15 px-3 text-white transition-colors duration-300 hover:border-white/40 hover:bg-white/10'
      >
        <Flag locale={current} />
        <span className='text-xs font-bold uppercase tracking-[0.12em]'>
          {current}
        </span>
        <ChevronDown
          className={cn(
            'h-4 w-4 transition-transform duration-300',
            open && 'rotate-180'
          )}
          aria-hidden='true'
        />
      </button>

      {open && (
        <ul
          id={menuId}
          className='absolute right-0 top-full z-[60] mt-2 w-48 rounded-md border border-white/10 bg-brand-950 p-1.5 shadow-header'
        >
          {routing.locales.map((locale) => (
            <li key={locale}>
              <Link
                href={pathname}
                locale={locale}
                lang={locale}
                onClick={() => setOpen(false)}
                aria-current={locale === current ? 'true' : undefined}
                className={cn(
                  'flex items-center gap-3 rounded px-3 py-2.5 text-sm text-white/80 transition-colors duration-200 hover:bg-white/10 hover:text-white',
                  locale === current && 'bg-white/5 text-white'
                )}
              >
                <Flag locale={locale} />
                {LOCALE_NAMES[locale]}
                {locale === current && (
                  <Check
                    className='ml-auto h-4 w-4 text-brand-300'
                    aria-hidden='true'
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
