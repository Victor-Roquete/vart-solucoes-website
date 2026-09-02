import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Reveal } from '@/components/ui/Reveal';

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: 'left' | 'center';
  tone?: 'dark' | 'light';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'dark',
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className
      )}
    >
      <p
        className={cn(
          'flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em]',
          align === 'center' && 'justify-center',
          tone === 'dark' ? 'text-brand-500' : 'text-brand-300'
        )}
      >
        <span
          aria-hidden='true'
          className={cn(
            'h-px w-10',
            tone === 'dark' ? 'bg-brand-400' : 'bg-brand-300/60'
          )}
        />
        {eyebrow}
        {align === 'center' && (
          <span
            aria-hidden='true'
            className={cn('h-px w-10', tone === 'dark' ? 'bg-brand-400' : 'bg-brand-300/60')}
          />
        )}
      </p>

      <h2
        className={cn(
          'mt-5 text-3xl font-extrabold leading-[1.12] tracking-tight text-balance md:text-[44px] md:leading-[1.08]',
          tone === 'dark' ? 'text-ink' : 'text-white'
        )}
      >
        {title}
      </h2>

      {description && (
        <p
          className={cn(
            'mt-5 text-base leading-relaxed md:text-lg',
            tone === 'dark' ? 'text-muted' : 'text-white/70'
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
