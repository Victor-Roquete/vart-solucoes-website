'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';
import { cn } from '@/lib/utils';

function subscribeFinePointer(callback: () => void) {
  const mql = window.matchMedia('(pointer: fine)');
  mql.addEventListener('change', callback);
  return () => mql.removeEventListener('change', callback);
}

function getFinePointerSnapshot() {
  return window.matchMedia('(pointer: fine)').matches;
}

function getFinePointerServerSnapshot() {
  return false;
}

/**
 * Cursor premium (apenas desktop com ponteiro fino).
 * - Ponto com mix-blend-mode: difference → visível em fundos claros e escuros;
 * - Cresce sobre elementos interativos;
 * - Rótulo [data-cursor-label] aparece ao lado do ponteiro, sem tapar o conteúdo.
 * Desativado em touch e com prefers-reduced-motion.
 */
export function CustomCursor() {
  const reducedMotion = useReducedMotion();
  const finePointer = useSyncExternalStore(
    subscribeFinePointer,
    getFinePointerSnapshot,
    getFinePointerServerSnapshot
  );
  const enabled = finePointer && !reducedMotion;

  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 550, damping: 45, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 550, damping: 45, mass: 0.6 });

  useEffect(() => {
    if (!enabled) return;

    const onMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
    };

    const onOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest(
        'a, button, [role="button"], input, select, textarea, [data-cursor]'
      );
      setActive(Boolean(interactive));

      const labelled = target.closest<HTMLElement>('[data-cursor-label]');
      setLabel(labelled?.dataset.cursorLabel ?? null);
    };

    const onLeave = () => setVisible(false);

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const size = label ? 76 : active ? 48 : 12;

  return (
    <motion.div
      aria-hidden='true'
      className={cn(
        'pointer-events-none fixed left-0 top-0 z-[100]',
        !label && 'mix-blend-difference'
      )}
      style={{ x: springX, y: springY }}
    >
      <motion.div
        className={cn(
          'flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border',
          label
            ? 'border-brand-300/60 bg-brand-500 shadow-lg'
            : active
              ? 'border-white bg-white/25'
              : 'border-white bg-white'
        )}
        animate={{
          width: size,
          height: size,
          x: label ? 52 : 0,
          y: label ? 52 : 0,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      >
        {label && (
          <span className='px-2 text-center text-[9px] font-bold uppercase leading-tight tracking-[0.14em] text-white'>
            {label}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}
