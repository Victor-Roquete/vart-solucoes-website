import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'light' | 'whatsapp';
type Size = 'md' | 'lg';

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  icon?: ReactNode;
  fullWidth?: boolean;
}

type ButtonAsButton = BaseProps &
  Omit<ComponentPropsWithoutRef<'button'>, 'className' | 'children'> & {
    href?: undefined;
  };

type ButtonAsLink = Omit<
  ComponentPropsWithoutRef<typeof Link>,
  'className' | 'children' | 'href'
> & {
  href: string;
} & BaseProps;

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-brand-800 text-white shadow-card hover:-translate-y-0.5 hover:bg-brand-900 hover:shadow-card-hover active:translate-y-0',
  secondary:
    'border border-brand-200 bg-white/5 text-brand-900 hover:-translate-y-0.5 hover:border-brand-400 hover:bg-white active:translate-y-0',
  light:
    'bg-white text-brand-900 shadow-card hover:-translate-y-0.5 hover:bg-brand-50 hover:shadow-card-hover active:translate-y-0',
  whatsapp:
    'bg-[#1faa59] text-white shadow-card hover:-translate-y-0.5 hover:bg-[#178a47] hover:shadow-card-hover active:translate-y-0',
};

const sizeClasses: Record<Size, string> = {
  md: 'h-11 px-6 text-sm',
  lg: 'h-[52px] px-8 text-[15px]',
};

function buildClass({
  variant = 'primary',
  size = 'md',
  className,
  fullWidth = false,
}: Required<Pick<BaseProps, 'variant' | 'size'>> &
  Pick<BaseProps, 'className' | 'fullWidth'>) {
  return cn(
    'group/btn inline-flex items-center justify-center gap-2.5 rounded-md font-bold uppercase tracking-[0.08em] transition-all duration-300 ease-out-expo focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500',
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && 'w-full',
    className
  );
}

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', className, children, icon, fullWidth } = props;

  const inner = (
    <>
      <span>{children}</span>
      {icon ? (
        <span className='transition-transform duration-300 group-hover/btn:translate-x-1'>
          {icon}
        </span>
      ) : null}
    </>
  );

  if ('href' in props && typeof props.href === 'string') {
    const { href, external, ...rest } = props as ButtonAsLink & {
      external?: boolean;
    };
    const isExternal =
      external ??
      (href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:'));

    void rest;

    return (
      <Link
        href={href}
        className={buildClass({ variant, size, className, fullWidth })}
        {...(isExternal
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
      >
        {inner}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;

  return (
    <button
      type={buttonProps.type ?? 'button'}
      className={buildClass({ variant, size, className, fullWidth })}
    >
      {inner}
    </button>
  );
}
