import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { company } from '@/data/company';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { whatsappLink } from '@/lib/whatsapp';

/**
 * Contacto — canais diretos + mapa. Sem sobrecarregar: o formulário
 * completo de orçamento vive em /contato#orcamento.
 */
export function ContactSection() {
  const t = useTranslations('home.contact');
  const tc = useTranslations('company');
  const tg = useTranslations('common');
  return (
    <section className='py-20 md:py-28'>
      <Container>
        <div className='grid gap-14 lg:grid-cols-2 lg:gap-20'>
          <div>
            <SectionHeading
              eyebrow={t('eyebrow')}
              title={t('title')}
              description={t('description')}
            />

            <Reveal delay={0.15}>
              <ul className='mt-10 space-y-5'>
                <li>
                  <a
                    href={company.phone.href}
                    className='group flex items-center gap-4'
                  >
                    <span className='flex h-11 w-11 items-center justify-center rounded-md bg-brand-50 text-brand-700 transition-colors duration-300 group-hover:bg-brand-800 group-hover:text-white'>
                      <Phone className='h-5 w-5' aria-hidden='true' />
                    </span>
                    <span>
                      <span className='block text-xs font-bold uppercase tracking-[0.18em] text-muted'>
                        {tc('labels.phone')}
                      </span>
                      <span className='block font-bold text-ink transition-colors group-hover:text-brand-700'>
                        {company.phone.value}
                      </span>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={whatsappLink(tg('whatsapp.defaultMessage'))}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='group flex items-center gap-4'
                  >
                    <span className='flex h-11 w-11 items-center justify-center rounded-md bg-brand-50 text-brand-700 transition-colors duration-300 group-hover:bg-[#1faa59] group-hover:text-white'>
                      <WhatsAppIcon className='h-5 w-5' />
                    </span>
                    <span>
                      <span className='block text-xs font-bold uppercase tracking-[0.18em] text-muted'>
                        {tc('labels.whatsapp')}
                      </span>
                      <span className='block font-bold text-ink transition-colors group-hover:text-brand-700'>
                        {company.whatsapp.value}
                      </span>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={company.email.href}
                    className='group flex items-center gap-4'
                  >
                    <span className='flex h-11 w-11 items-center justify-center rounded-md bg-brand-50 text-brand-700 transition-colors duration-300 group-hover:bg-brand-800 group-hover:text-white'>
                      <Mail className='h-5 w-5' aria-hidden='true' />
                    </span>
                    <span>
                      <span className='block text-xs font-bold uppercase tracking-[0.18em] text-muted'>
                        {tc('labels.email')}
                      </span>
                      <span className='block font-bold text-ink transition-colors group-hover:text-brand-700'>
                        {company.email.value}
                      </span>
                    </span>
                  </a>
                </li>
                <li className='flex items-center gap-4'>
                  <span className='flex h-11 w-11 items-center justify-center rounded-md bg-brand-50 text-brand-700'>
                    <Clock className='h-5 w-5' aria-hidden='true' />
                  </span>
                  <span>
                    <span className='block text-xs font-bold uppercase tracking-[0.18em] text-muted'>
                      {tc('labels.hours')}
                    </span>
                    <span className='block font-bold text-ink'>
                      {tg('hours.value')}
                    </span>
                  </span>
                </li>
                <li className='flex items-center gap-4'>
                  <span className='flex h-11 w-11 items-center justify-center rounded-md bg-brand-50 text-brand-700'>
                    <MapPin className='h-5 w-5' aria-hidden='true' />
                  </span>
                  <span>
                    <span className='block text-xs font-bold uppercase tracking-[0.18em] text-muted'>
                      {tc('labels.address')}
                    </span>
                    <span className='block font-bold text-ink'>
                      {company.address.value}
                    </span>
                  </span>
                </li>
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.2} className='h-full'>
            <div className='h-full min-h-[320px] overflow-hidden rounded-xl border border-line shadow-card lg:min-h-[440px]'>
              <iframe
                src={company.mapEmbedUrl}
                title={t('mapTitle')}
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
                className='h-full min-h-[320px] w-full border-0 lg:min-h-[440px]'
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}