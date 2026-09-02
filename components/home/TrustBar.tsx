import { VartSymbol } from '@/components/brand/VartSymbol';
import { trustItems } from '@/data/home';

/**
 * Trust bar em marquee contínuo — reforça os compromissos da marca
 * imediatamente após o Hero. Pausa ao passar o cursor.
 */
export function TrustBar() {
  const items = [...trustItems, ...trustItems];

  return (
    <section
      aria-label='Compromissos de serviço da VART Soluções'
      className='border-y border-line bg-surface py-5'
    >
      <div className='marquee-track overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]'>
        <ul className='animate-marquee flex w-max items-center'>
          {items.map((item, index) => (
            <li key={`${item}-${index}`} className='flex items-center gap-8 pr-8'>
              <span className='whitespace-nowrap text-sm font-bold uppercase tracking-[0.24em] text-brand-800'>
                {item}
              </span>
              <VartSymbol
                className='h-3 w-3 shrink-0 text-brand-400'
                idSuffix={`trust-${index}`}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}