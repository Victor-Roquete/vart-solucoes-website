import type { LucideIcon } from 'lucide-react';
import { Handshake, HardHat, Layers, ShieldCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { differentials } from '@/data/home';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SpotlightCard } from '@/components/ui/SpotlightCard';

const iconMap: Record<string, LucideIcon> = {
  shield: ShieldCheck,
  hardhat: HardHat,
  layers: Layers,
  handshake: Handshake,
};

/**
 * Diferenciais — resposta direta a "Por que escolher a VART?".
 * Cards com spotlight que segue o cursor e numeração editorial.
 */
export function DifferentialsSection() {
  const t = useTranslations('home.differentials');
  return (
    <section className='py-20 md:py-28'>
      <Container>
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('description')}
        />

        <div className='mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          {differentials.map((item, index) => {
            const Icon = iconMap[item.icon] ?? ShieldCheck;

            return (
              <Reveal key={item.id} delay={index * 0.08} className='h-full'>
                <SpotlightCard className='h-full p-7'>
                  <div className='flex items-start justify-between'>
                    <span className='flex h-12 w-12 items-center justify-center rounded-md bg-brand-50 text-brand-700'>
                      <Icon className='h-6 w-6' aria-hidden='true' />
                    </span>
                    <span
                      aria-hidden='true'
                      className='text-4xl font-extrabold leading-none text-brand-100'
                    >
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className='mt-6 text-lg font-extrabold text-ink'>
                    {t(`items.${item.id}.title`)}
                  </h3>
                  <p className='mt-2.5 text-sm leading-relaxed text-muted'>
                    {t(`items.${item.id}.description`)}
                  </p>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}