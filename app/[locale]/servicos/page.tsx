import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Check } from 'lucide-react';
import { services } from '@/data/services';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/layout/PageHero';
import { pageHeroes } from '@/data/page-heroes';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Serviços',
  description:
    'Canalização, eletrobombas, piscinas, deteção de fugas, manutenção técnica, eletricidade, ladrilho, tetos falsos e pintura em Luanda. Conheça os serviços da VART Soluções.',
  alternates: { canonical: '/servicos' },
};

/** Agrupa os serviços por área, mantendo a ordem dos dados. */
function groupByCategory() {
  const groups: { category: string; items: typeof services }[] = [];
  for (const service of services) {
    const group = groups.find((g) => g.category === service.category);
    if (group) group.items.push(service);
    else groups.push({ category: service.category, items: [service] });
  }
  return groups;
}

/**
 * /servicos — atalhos por serviço + lista agrupada por área, com fotografias
 * reais dos trabalhos.
 */
export default async function ServicosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const groups = groupByCategory();

  return (
    <>
      <PageHero
        image={pageHeroes.servicos}
        eyebrow='Serviços'
        title='Soluções técnicas integradas.'
        description='Da instalação à manutenção, cada serviço segue o mesmo método: avaliação, orçamento claro, execução organizada e verificação final.'
      />

      <Container className='py-16 md:py-24'>
        <Reveal>
          <nav
            aria-label='Áreas de serviço'
            className='mb-14 flex flex-wrap gap-2.5'
          >
            {services.map((service) => (
              <a
                key={service.id}
                href={`#${service.slug}`}
                className='rounded-full border border-line bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-brand-800 transition-colors duration-300 hover:border-brand-500 hover:bg-brand-50'
              >
                {service.title}
              </a>
            ))}
          </nav>
        </Reveal>

        <div className='space-y-16 md:space-y-20'>
          {groups.map((group) => (
            <section key={group.category} aria-label={group.category}>
              <Reveal>
                <h2 className='flex items-center gap-4 text-xs font-bold uppercase tracking-[0.28em] text-brand-500'>
                  <span aria-hidden='true' className='h-px w-10 bg-brand-400' />
                  {group.category}
                </h2>
              </Reveal>

              <div className='mt-6 space-y-6 md:space-y-8'>
                {group.items.map((service) => {
                  const number = services.indexOf(service) + 1;
                  return (
                    <Reveal key={service.id}>
                      <article
                        id={service.slug}
                        className='scroll-mt-28 overflow-hidden rounded-xl border border-line bg-white shadow-card'
                      >
                        <div
                          className={cn(
                            'lg:flex',
                            number % 2 === 0 && 'lg:flex-row-reverse'
                          )}
                        >
                          <div className='relative min-h-[260px] lg:w-[46%]'>
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
                              {String(number).padStart(2, '0')} · {service.tagline}
                            </p>
                            <h3 className='mt-3 text-2xl font-extrabold text-ink md:text-3xl'>
                              {service.title}
                            </h3>
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
                            {service.checks && service.checks.length > 0 && (
                              <div className='mt-7'>
                                <h4 className='text-xs font-bold uppercase tracking-[0.2em] text-brand-500'>
                                  O que verificamos
                                </h4>
                                <ul className='mt-3 space-y-2'>
                                  {service.checks.map((item) => (
                                    <li
                                      key={item}
                                      className='flex items-start gap-2.5 text-sm text-ink/80'
                                    >
                                      <span
                                        aria-hidden='true'
                                        className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400'
                                      />
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {service.limits && (
                              <p className='mt-6 rounded-md border border-line bg-surface p-4 text-sm leading-relaxed text-muted'>
                                <span className='font-bold text-ink'>
                                  Limites de atuação:{' '}
                                </span>
                                {service.limits}
                              </p>
                            )}
                            {service.gallery && service.gallery.length > 0 && (
                              <ul
                                aria-label={`Fotografias de ${service.title}`}
                                className='mt-7 grid grid-cols-3 gap-2.5'
                              >
                                {service.gallery.map((src, i) => (
                                  <li
                                    key={src}
                                    className='relative aspect-[3/4] overflow-hidden rounded-md'
                                  >
                                    <Image
                                      src={src}
                                      alt={`${service.title}: fotografia ${i + 1} de trabalho executado pela VART Soluções`}
                                      fill
                                      sizes='(min-width: 1024px) 14vw, 28vw'
                                      className='object-cover transition-transform duration-500 ease-out hover:scale-105'
                                    />
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
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
