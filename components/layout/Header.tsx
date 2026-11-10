'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mainNav } from '@/data/navigation';
import { Logo } from '@/components/brand/Logo';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';

export function Header() {
  const t = useTranslations('common');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Fecha o menu ao navegar (ajuste de state durante o render, sem efeito)
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500',
          scrolled
            ? 'border-b border-white/10 bg-brand-950/85 shadow-header backdrop-blur-xl'
            : 'bg-transparent'
        )}
      >
        <div
          className={cn(
            'mx-auto flex h-[68px] w-full max-w-[1440px] items-center justify-between px-5 transition-all duration-500 md:h-[84px] md:px-10'
          )}
        >
          <Logo tone='light' compact={scrolled} />

          {/* Navegação desktop */}
          <nav aria-label={t('aria.mainNav')} className='hidden lg:block'>
            <ul className='flex items-center gap-9'>
              {mainNav.map((item) => {
                const active =
                  item.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(item.href);

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'group relative py-2 text-[13px] font-bold uppercase tracking-[0.14em] transition-colors duration-300',
                        active ? 'text-white' : 'text-white/65 hover:text-white'
                      )}
                    >
                      {t(`nav.${item.key}`)}
                      <span
                        aria-hidden='true'
                        className={cn(
                          'absolute -bottom-0.5 left-0 h-0.5 w-full origin-left rounded-full bg-brand-400 transition-transform duration-300 ease-out-expo',
                          active
                            ? 'scale-x-100'
                            : 'scale-x-0 group-hover:scale-x-100'
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className='flex items-center gap-3'>
            <div className='hidden lg:block'>
              <LanguageSwitcher />
            </div>
            <Link
              href='/contato#orcamento'
              className='hidden h-11 items-center rounded-md bg-white px-6 text-[13px] font-bold uppercase tracking-[0.1em] text-brand-900 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-50 hover:shadow-card-hover lg:inline-flex'
            >
              {t('nav.quoteShort')}
            </Link>

            {/* Hambúrguer mobile */}
            <button
              type='button'
              onClick={() => setMenuOpen(true)}
              aria-label={t('aria.openMenu')}
              aria-expanded={menuOpen}
              className='inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/15 text-white transition-colors duration-300 hover:border-white/40 hover:bg-white/10 lg:hidden'
            >
              <Menu className='h-5 w-5' aria-hidden='true' />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
