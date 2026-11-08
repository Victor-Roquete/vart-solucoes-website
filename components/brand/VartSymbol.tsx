import { cn } from '@/lib/utils';

/* ============================================================================
   SÍMBOLO VART — símbolo oficial (chevron + losango), traçado do logótipo
   aprovado (icon.svg). Usa currentColor: herda a cor do contexto.
   ========================================================================== */

interface SymbolProps {
  className?: string;
  /** Mantido por compatibilidade com as chamadas existentes (não é usado). */
  idSuffix?: string;
}

export function VartSymbol({ className }: SymbolProps) {
  return (
    <svg
      viewBox='-3 -3 221 221'
      aria-hidden='true'
      focusable='false'
      className={cn('h-8 w-8', className)}
    >
      <g
        fill='currentColor'
        stroke='currentColor'
        strokeWidth='5'
        strokeLinejoin='round'
      >
        <path d='M0 107 L29 135 L108 59 L185 135 L215 108 L109 0 Z' />
        <path d='M107 94 L48 156 L108 215 L167 154 Z' />
      </g>
    </svg>
  );
}
