import { cn } from '@/lib/utils';

interface BrandCardProps {
  /** Área do serviço (já traduzida). */
  label: string;
  /** Nome do serviço (já traduzido). */
  title: string;
  /** Nome da marca — igual em todos os idiomas. */
  brand: string;
  /** Descrição acessível do cartão (já traduzida). */
  ariaLabel: string;
  className?: string;
}

/**
 * Cartão gráfico da marca para serviços ainda sem fotografia real.
 * É HTML, não um SVG com texto desenhado: o texto vem das mensagens de cada
 * idioma, quebra linha sozinho e nunca fica cortado pelo enquadramento.
 */
export function BrandCard({
  label,
  title,
  brand,
  ariaLabel,
  className,
}: BrandCardProps) {
  return (
    <div
      role='img'
      aria-label={ariaLabel}
      className={cn(
        'relative flex h-full min-h-[260px] flex-col justify-center gap-5 overflow-hidden bg-brand-950 bg-cover bg-center px-8 py-10 md:px-12',
        className
      )}
      style={{ backgroundImage: "url('/assets/services/cartoes/fundo.svg')" }}
    >
      <p className='text-xs font-bold uppercase tracking-[0.3em] text-brand-300 md:text-sm'>
        {label}
      </p>
      <p className='break-words text-3xl font-extrabold leading-tight text-white text-balance md:text-4xl'>
        {title}
      </p>
      <p className='mt-6 text-[11px] font-semibold uppercase tracking-[0.4em] text-white/60'>
        {brand}
      </p>
    </div>
  );
}
