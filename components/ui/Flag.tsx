import type { ReactNode } from 'react';
import type { AppLocale } from '@/i18n/routing';
import { cn } from '@/lib/utils';

/** Bandeiras em SVG (os emojis de bandeira não aparecem em todos os sistemas). */
const FLAGS: Record<AppLocale, ReactNode> = {
  pt: (
    <>
      <rect width='30' height='20' fill='#ff0000' />
      <rect width='12' height='20' fill='#006600' />
      <circle cx='12' cy='10' r='4' fill='#ffcc00' />
      <path d='M10 8h4v3.2a2 2 0 0 1-4 0z' fill='#fff' stroke='#ff0000' strokeWidth='0.6' />
    </>
  ),
  en: (
    <>
      <rect width='30' height='20' fill='#012169' />
      <path d='M0 0l30 20M30 0L0 20' stroke='#fff' strokeWidth='3' />
      <path d='M0 0l30 20M30 0L0 20' stroke='#c8102e' strokeWidth='1.2' />
      <path d='M15 0v20M0 10h30' stroke='#fff' strokeWidth='5' />
      <path d='M15 0v20M0 10h30' stroke='#c8102e' strokeWidth='3' />
    </>
  ),
  es: (
    <>
      <rect width='30' height='20' fill='#c60b1e' />
      <rect y='5' width='30' height='10' fill='#ffc400' />
    </>
  ),
  fr: (
    <>
      <rect width='30' height='20' fill='#fff' />
      <rect width='10' height='20' fill='#0055a4' />
      <rect x='20' width='10' height='20' fill='#ef4135' />
    </>
  ),
};

export function Flag({
  locale,
  className,
}: {
  locale: AppLocale;
  className?: string;
}) {
  return (
    <svg
      viewBox='0 0 30 20'
      aria-hidden='true'
      focusable='false'
      className={cn(
        'h-4 w-6 shrink-0 rounded-[3px] shadow-[0_0_0_1px_rgba(255,255,255,0.18)]',
        className
      )}
    >
      {FLAGS[locale]}
    </svg>
  );
}
