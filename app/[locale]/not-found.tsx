import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { PageHero } from '@/components/layout/PageHero';

export default function NotFoundPage() {
  const t = useTranslations('common.notFound');

  return (
    <PageHero eyebrow='404' title={t('title')} description={t('text')}>
      <Link
        href='/'
        className='inline-flex h-12 items-center rounded-md bg-white px-6 text-sm font-bold uppercase tracking-[0.1em] text-brand-900 transition-colors duration-300 hover:bg-brand-50'
      >
        {t('back')}
      </Link>
    </PageHero>
  );
}
