import Link from 'next/link';
import { Mail, MapPin, Phone, Clock } from 'lucide-react';
import { company } from '@/data/company';
import { services } from '@/data/services';
import { footerNav } from '@/data/navigation';
import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/brand/Logo';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { WHATSAPP_DEFAULT_MESSAGE } from '@/lib/constants';
import { whatsappMessage } from '@/lib/utils';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className='bg-brand-950 text-white/70'>
      <Container className='py-16 md:py-20'>
        <div className='grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]'>
          {/* Marca */}
          <div>
            <Logo tone='light' href='/' />
            <p className='mt-6 max-w-sm text-sm leading-relaxed text-white/55'>
              {company.shortDescription}
            </p>
            <ul className='mt-7 flex items-center gap-3' aria-label='Redes sociais'>
              {company.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label={social.label}
                    className='flex h-10 w-10 items-center justify-center rounded-md border border-white/10 text-white/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400 hover:text-white'
                  >
                    <img
                      src={`/assets/icons/social/${social.icon}`}
                      alt=''
                      width={18}
                      height={18}
                      loading='lazy'
                      className='h-[18px] w-[18px] brightness-0 invert'
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Serviços */}
          <nav aria-label='Serviços no rodapé'>
            <h3 className='text-xs font-bold uppercase tracking-[0.26em] text-white'>
              Serviços
            </h3>
            <ul className='mt-6 space-y-3'>
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    href={service.href}
                    className='text-sm text-white/55 transition-colors duration-300 hover:text-brand-300'
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Empresa */}
          {footerNav.map((group) => (
            <nav key={group.title} aria-label={`${group.title} no rodapé`}>
              <h3 className='text-xs font-bold uppercase tracking-[0.26em] text-white'>
                {group.title}
              </h3>
              <ul className='mt-6 space-y-3'>
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className='text-sm text-white/55 transition-colors duration-300 hover:text-brand-300'
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contacto */}
          <div>
            <h3 className='text-xs font-bold uppercase tracking-[0.26em] text-white'>
              Contacto
            </h3>
            <ul className='mt-6 space-y-4 text-sm'>
              <li>
                <a
                  href={company.phone.href}
                  className='flex items-center gap-3 text-white/55 transition-colors hover:text-white'
                >
                  <Phone className='h-4 w-4 shrink-0 text-brand-400' aria-hidden='true' />
                  {company.phone.value}
                </a>
              </li>
              <li>
                <a
                  href={`${company.whatsapp.waUrl}?text=${whatsappMessage(WHATSAPP_DEFAULT_MESSAGE)}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-3 text-white/55 transition-colors hover:text-white'
                >
                  <WhatsAppIcon className='h-4 w-4 shrink-0 text-brand-400' />
                  {company.whatsapp.value}
                </a>
              </li>
              <li>
                <a
                  href={company.email.href}
                  className='flex items-center gap-3 text-white/55 transition-colors hover:text-white'
                >
                  <Mail className='h-4 w-4 shrink-0 text-brand-400' aria-hidden='true' />
                  {company.email.value}
                </a>
              </li>
              <li className='flex items-center gap-3 text-white/55'>
                <MapPin className='h-4 w-4 shrink-0 text-brand-400' aria-hidden='true' />
                {company.address.value}
              </li>
              <li className='flex items-center gap-3 text-white/55'>
                <Clock className='h-4 w-4 shrink-0 text-brand-400' aria-hidden='true' />
                {company.hours.value}
              </li>
            </ul>
          </div>
        </div>
      </Container>

      <div className='border-t border-white/10'>
        <Container className='flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/40 md:flex-row'>
          <p>
            © {year} {company.legalName}. Todos os direitos reservados.
          </p>
          <p>Luanda · Angola</p>
        </Container>
      </div>
    </footer>
  );
}
