import { useTranslations } from 'next-intl';
import { company } from '@/data/company';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { whatsappLink } from '@/lib/whatsapp';
import { Reveal } from '@/components/ui/Reveal';

/**
 * CTA de conversão — fundo azul-marinho com grelha técnica.
 */
export function CTASection() {
  const t = useTranslations('home.cta');
  const tc = useTranslations('common');
  return (
    <section className='relative overflow-hidden bg-brand-950 py-20 md:py-28'>
      <div aria-hidden='true' className='absolute inset-0 bg-blueprint' />
      <div
        aria-hidden='true'
        className='absolute left-1/2 top-0 h-[320px] w-[640px] -translate-x-1/2 rounded-full bg-brand-600/20 blur-[140px]'
      />

      <Container className='relative text-center'>
        <Reveal>
          <p className='flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-brand-300'>
            <span aria-hidden='true' className='h-px w-10 bg-brand-300/60' />
            {t('eyebrow')}
            <span aria-hidden='true' className='h-px w-10 bg-brand-300/60' />
          </p>
          <h2 className='mx-auto mt-5 max-w-3xl text-3xl font-extrabold leading-[1.1] tracking-tight text-white text-balance md:text-5xl'>
            {t('title')}
          </h2>
          <p className='mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/65 md:text-lg'>
            {t('text')}
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className='mt-10 flex flex-wrap items-center justify-center gap-4'>
            <Button href='/contato#orcamento' variant='light' size='lg'>
              {tc('nav.quote')}
            </Button>
            <Button
              href={whatsappLink(tc('whatsapp.defaultMessage'))}
              variant='whatsapp'
              size='lg'
              icon={<WhatsAppIcon className='h-5 w-5' />}
            >
              {t('whatsapp')}
            </Button>
          </div>
          <p className='mt-8 text-sm text-white/45'>
            {company.phone.value} · {tc('hours.value')}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}