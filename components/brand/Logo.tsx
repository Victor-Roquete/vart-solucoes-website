import Link from 'next/link';
import { cn } from '@/lib/utils';
import { VartSymbol } from '@/components/brand/VartSymbol';

/* ============================================================================
   LOGOTIPO — símbolo + wordmark tipográfico.
   Wordmark aguarda vetor oficial da marca; definido em Manrope com tracking
   geométrico, fiel à proporção do material fornecido.
   ========================================================================== */

interface LogoProps {
  /** 'dark' = texto escuro (sobre fundo claro) · 'light' = texto branco. */
  tone?: 'dark' | 'light';
  className?: string;
  href?: string | null;
  compact?: boolean;
}

export function Logo({
  tone = 'dark',
  className,
  href = '/',
  compact = false,
}: LogoProps) {
  const content = (
    <span className='flex items-center gap-3'>
      <VartSymbol
        className={cn(
          'h-9 w-9 shrink-0 transition-transform duration-500 ease-out group-hover:-translate-y-0.5 md:h-10 md:w-10',
          tone === 'dark' ? 'text-brand-900' : 'text-white',
          className
        )}
        idSuffix={tone}
      />
      <span className='flex flex-col leading-none'>
        <span
          className={cn(
            'text-xl font-extrabold tracking-[0.22em] md:text-2xl',
            tone === 'dark' ? 'text-brand-900' : 'text-white'
          )}
        >
          VART
        </span>
        {!compact && (
          <span
            className={cn(
              'mt-1 text-[9px] font-semibold uppercase tracking-[0.34em] md:text-[10px]',
              tone === 'dark' ? 'text-brand-900' : 'text-white'
            )}
          >
            Soluções
          </span>
        )}
      </span>
    </span>
  );

  if (href === null) {
    return <span className='group inline-flex'>{content}</span>;
  }

  return (
    <Link
      href={href}
      aria-label='VART Soluções — página inicial'
      className='group inline-flex'
    >
      {content}
    </Link>
  );
}
