import { cn } from '@/lib/utils';

/* ============================================================================
   SÍMBOLO VART — reconstrução vetorial fiel do losango duplo da marca.
   Vetor oficial aguarda entrega do cliente; esta geometria reproduz o
   símbolo (losango em contorno + losango interno preenchido com respiro).
   Usa currentColor: herda a cor do contexto (claro/escuro).
   ========================================================================== */

interface SymbolProps {
  className?: string;
  /** ID único para o mask (obrigatório quando há mais de um símbolo na página). */
  idSuffix?: string;
}

export function VartSymbol({ className, idSuffix = 'default' }: SymbolProps) {
  const maskId = `vart-symbol-mask-${idSuffix}`;

  return (
    <svg
      viewBox='0 0 100 100'
      fill='none'
      aria-hidden='true'
      className={cn('h-8 w-8', className)}
    >
      <mask id={maskId}>
        <rect width='100' height='100' fill='white' />
        {/* Recorte que cria o respiro em volta do losango interno */}
        <polygon
          points='50,29 81,60 50,91 19,60'
          fill='black'
          transform='rotate(0)'
        />
      </mask>

      {/* Losango externo em contorno (parte inferior recortada pelo mask) */}
      <polygon
        points='50,6 94,50 50,94 6,50'
        stroke='currentColor'
        strokeWidth={13}
        strokeLinejoin='miter'
        mask={`url(#${maskId})`}
      />

      {/* Losango interno preenchido */}
      <polygon points='50,38 72,60 50,82 28,60' fill='currentColor' />
    </svg>
  );
}
