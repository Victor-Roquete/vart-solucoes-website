'use client';

import { useSyncExternalStore } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

function subscribeNoop() {
  return () => {};
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

/** Barra fina de progresso de leitura no topo da página. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  // Evita mismatch de hidratacao SSR sem setState sincrono num efeito
  const mounted = useSyncExternalStore(
    subscribeNoop,
    getClientSnapshot,
    getServerSnapshot
  );

  if (!mounted) return null;

  return (
    <motion.div
      aria-hidden='true'
      style={{ scaleX }}
      className='fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-brand-500 via-brand-400 to-brand-300'
    />
  );
}
