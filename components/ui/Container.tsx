import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  /** Alarga para 1440px (seções editoriais muito largas). */
  wide?: boolean;
}

export function Container({ children, className, wide = false }: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-6 md:px-10',
        wide ? 'max-w-[1440px]' : 'max-w-[1280px]',
        className
      )}
    >
      {children}
    </div>
  );
}
