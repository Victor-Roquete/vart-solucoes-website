import type { Metadata } from 'next';
import Image from 'next/image';
import { Check } from 'lucide-react';
import { services } from '@/data/services';
import { Button } from '@/components/ui/Button';
import { PageHero } from '@/components/layout/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Serviços',
  description:
    'Canalização, eletrobombas, piscinas, pintura, carpintaria, climatização e manutenção técnica em Luanda. Conheça os serviços da VART Soluções.',
  alternates: { canonical: '/servicos' },
};

/**
 * /servicos — lista completa por categoria com ponto de situação.
 */
export default function ServicosPage() {
  return (
    <>
      <PageHero
        eyebrow='Serviços'
        title='Soluções técnicas integradas.'
        description='Da instalação à manutenção, cada serviço segue o mesmo padrão de execução e comprovação.'
      />

      <div className='py-20 md:py-28'>
        <div className='space-y-6 md:space-y-8'>
          {services.map((service, index) => (
            <Reveal key={service.id} delay={index * 0.05}>
              <article
                id={service.slug}
                className={cn(
                  'overflow-hidden rounded-xl border border-line bg-white shadow-card',
                  index % 2 === 0 ? 'lg:[direction:ltr]' : 'lg:[direction:rtl]'
                )}
              >
                <div className='lg:flex lg:[direction:ltr]'>
                  <div className='relative min-h-[240px] lg:w-[46%]'>
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      sizes='(min-width: 1024px) 46vw, 100vw'
                      className='object-cover'
                    />
                  </div>
                  <div className='p-7 md:p-10 lg:w-[54%]'>
                    <p className='text-xs font-bold tracking-[0.2em] text-brand-400'>
                      {String(index + 1).padStart(2, '0')} · {service.tagline}
                    </p>
                    <h2 className='mt-3 text-2xl font-extrabold text-ink md:text-3xl'>
                      {service.title}
                    </h2>
                    <p className='mt-3 leading-relaxed text-muted'>
                      {service.description}
                    </p>
                    {service.bullets.length > 0 && (
                      <ul className='mt-6 grid gap-2.5 sm:grid-cols-2'>
                        {service.bullets.map((item) => (
                          <li
                            key={item}
                            className='flex items-start gap-2.5 text-sm text-ink/80'
                          >
                            <Check
                              className='mt-0.5 h-4 w-4 shrink-0 text-brand-600'
                              aria-hidden='true'
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className='mt-8'>
                      <Button href='/contato#orcamento' size='md'>
                        Solicitar orçamento
                      </Button>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}