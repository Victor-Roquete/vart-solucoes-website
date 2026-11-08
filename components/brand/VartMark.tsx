import { cn } from '@/lib/utils';

/** Símbolo oficial da VART (chevron + losango). Cor via currentColor. */
export function VartMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox='-3 -3 221 221'
      aria-hidden='true'
      focusable='false'
      className={cn('shrink-0', className)}
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
