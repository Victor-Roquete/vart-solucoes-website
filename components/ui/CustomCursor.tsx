'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';

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
 * - Ponto pequeno segue o cursor com mola;
 * - Cresce sobre elementos interativos;
 * - Mostra rótulo quando o elemento define [data-cursor-label].
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

  return (
    <motion.div
      aria-hidden='true'
      className='pointer-events-none fixed left-0 top-0 z-[100]'
      style={{ x: springX, y: springY }}
    >
      <motion.div
        className='flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-brand-700 bg-brand-800/85 backdrop-blur-sm'
        animate={{
          width: label ? 92 : active ? 56 : 14,
          height: label ? 92 : active ? 56 : 14,
          opacity: visible ? 1 : 0,
          scale: 1,
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
