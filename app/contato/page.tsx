import type { Metadata } from 'next';
import { company } from '@/data/company';
import { PageHero } from '@/components/layout/PageHero';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { QuoteForm } from '@/components/forms/QuoteForm';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { WHATSAPP_DEFAULT_MESSAGE } from '@/lib/constants';
import { whatsappMessage } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Contacto',
  description:
    'Fale com a VART Soluções: telefone, WhatsApp, email e pedido de orçamento para obras e instalações em Luanda.',
  alternates: { canonical: '/contato' },
};

interface Channel {
  label: string;
  value: string;
  href?: string;
  icon: string;
}

const CHANNELS: Channel[] = [
  { label: company.phone.label, value: company.phone.value, href: company.phone.href, icon: '☎' },
  { label: company.email.label, value: company.email.value, href: company.email.href, icon: '@' },
  { label: company.hours.label, value: company.hours.value, icon: '⏱' },
  { label: company.address.label, value: company.address.value, icon: '📍' },
];

/**
 * /contato — canais diretos + âncora #orcamento (destino dos CTAs da Home).
 * O backend do formulário (POST /api/quote) fica para a fase de conversão.
 */
export default function ContatoPage() {
  return (
    <>
      <PageHero
        eyebrow='Contacto'
        title='Vamos falar sobre o seu projeto.'
        description='Resposta rápida por telefone ou WhatsApp — e orçamento sem compromisso.'
      />

      <Container className='py-20 md:py-28'>
        <div className='grid gap-14 lg:grid-cols-2 lg:gap-20'>
          {/* Canais diretos */}
          <div>
            <h2 className='text-2xl font-extrabold text-ink'>Canais diretos</h2>

            <Reveal delay={0.1}>
              <a
                href={`${company.whatsapp.waUrl}?text=${whatsappMessage(WHATSAPP_DEFAULT_MESSAGE)}`}
                target='_blank'
                rel='noopener noreferrer'
                className='group mt-8 flex items-center gap-4 rounded-lg border border-line bg-white p-4 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1faa59]/40'
              >
                <span className='flex h-12 w-12 items-center justify-center rounded-md bg-[#1faa59]/10 text-[#1faa59] transition-colors duration-300 group-hover:bg-[#1faa59] group-hover:text-white'>
                  <WhatsAppIcon className='h-6 w-6' />
                </span>
                <span>
                  <span className='block text-xs font-bold uppercase tracking-[0.18em] text-muted'>
                    {company.whatsapp.label}
                  </span>
                  <span className='block font-bold text-ink'>
                    {company.whatsapp.value}
                  </span>
                </span>
              </a>
            </Reveal>

            <Reveal delay={0.15}>
              <ul className='mt-4 space-y-1'>
                {CHANNELS.map((channel) => (
                  <li key={channel.label}>
                    {channel.href ? (
                      <a
                        href={channel.href}
                        className='group flex items-center gap-4 rounded-lg px-4 py-3.5 transition-colors duration-300 hover:bg-surface'
                      >
                        <ContactIcon>{channel.icon}</ContactIcon>
                        <ContactText {...channel} />
                      </a>
                    ) : (
                      <div className='flex items-center gap-4 rounded-lg px-4 py-3.5'>
                        <ContactIcon>{channel.icon}</ContactIcon>
                        <ContactText {...channel} />
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </Reveal>

            </div>

            {/* Mapa + orçamento */}
            <div className='space-y-10' id='orcamento'>
              <Reveal delay={0.2}>
                <div className='overflow-hidden rounded-xl border border-line shadow-card'>
                  <iframe
                    src={company.mapEmbedUrl}
                    title='Mapa — VART Soluções, Luanda, Angola'
                    loading='lazy'
                    referrerPolicy='no-referrer-when-downgrade'
                    className='h-[280px] w-full border-0'
                    allowFullScreen
                  />
                </div>
              </Reveal>

              <Reveal delay={0.25}>
                <div className='rounded-xl border border-line bg-white p-7 shadow-card md:p-9'>
                  <h2 className='text-2xl font-extrabold text-ink'>
                    Peça o seu orçamento
                  </h2>
                  <p className='mt-2.5 text-sm leading-relaxed text-muted'>
                    Preencha os dados e envie — a mensagem chega diretamente
                    ao nosso WhatsApp com tudo organizado.
                  </p>
                  <QuoteForm />
                </div>
              </Reveal>
            </div>
          </div>
      </Container>
    </>
  );
}

function ContactIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className='flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-brand-50 font-bold text-brand-700'>
      {children}
    </span>
  );
}

function ContactText({
  label,
  value,
}: {
  label: string;
  value: string;
  href?: string;
  icon?: string;
}) {
  return (
    <span>
      <span className='block text-xs font-bold uppercase tracking-[0.18em] text-muted'>
        {label}
      </span>
      <span className='block font-bold text-ink'>{value}</span>
    </span>
  );
}