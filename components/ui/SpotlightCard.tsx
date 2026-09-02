'use client';

import { useCallback, useRef, type MouseEvent, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  /** Intensidade do spotlight (0–1). */
  intensity?: number;
}

/**
 * Card com spotlight que segue o cursor (via CSS custom properties —
 * apenas composição radial, sem re-render em cada movimento).
 */
export function SpotlightCard({
  children,
  className,
  intensity = 0.07,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--x', `${event.clientX - rect.left}px`);
      el.style.setProperty('--y', `${event.clientY - rect.top}px`);
    },
    []
  );

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn(
        'group relative overflow-hidden rounded-lg border border-line bg-white transition-all duration-300 hover:border-brand-200 hover:shadow-card-hover',
        className
      )}
    >
      <span
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100'
        style={{
          background: `radial-gradient(320px circle at var(--x, 50%) var(--y, 50%), rgba(11, 75, 115, ${intensity}), transparent 70%)`,
        }}
      />
      {children}
    </div>
  );
}
