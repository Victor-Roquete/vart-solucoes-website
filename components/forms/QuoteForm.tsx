'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { services } from '@/data/services';
import { whatsappLink } from '@/lib/whatsapp';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';

const inputClass =
  'h-12 w-full rounded-md border border-line bg-white px-4 text-sm text-ink placeholder:text-muted/70 transition-colors duration-300 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20';

/** Nome do idioma do visitante, escrito em português (a equipa lê em português). */
const LOCALE_LABEL: Record<string, string> = {
  pt: 'Português',
  en: 'Inglês',
  es: 'Espanhol',
  fr: 'Francês',
};

/**
 * Formulário de orçamento — sem backend ainda, a submissão compõe uma
 * mensagem estruturada e abre o WhatsApp da empresa. A mensagem segue sempre
 * em português (quem a lê é a equipa) e indica o idioma do cliente.
 * Quando existir POST /api/quote, basta trocar o handler.
 */
export function QuoteForm() {
  const t = useTranslations('quote');
  const ts = useTranslations('services');
  const locale = useLocale();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceId, setServiceId] = useState(services[0]?.id ?? '');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const isFormValid = name.trim() !== '' && phone.trim() !== '';

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isFormValid) return;

    const serviceTitle =
      services.find((item) => item.id === serviceId)?.title ?? serviceId;

    const message = [
      'Olá, VART Soluções! Quero pedir um orçamento.',
      `Nome: ${name}`,
      `Telefone: ${phone}`,
      `Serviço: ${serviceTitle}`,
      location.trim() ? `Localização: ${location}` : null,
      description.trim() ? `Descrição: ${description}` : null,
      `Idioma do cliente: ${LOCALE_LABEL[locale] ?? locale}`,
    ]
      .filter(Boolean)
      .join('\n');

    window.open(whatsappLink(message), '_blank', 'noopener,noreferrer');
  };

  return (
    <form onSubmit={handleSubmit} className='mt-7 space-y-4' noValidate={false}>
      <div className='grid gap-4 sm:grid-cols-2'>
        <label className='block'>
          <span className='mb-1.5 block text-xs font-bold uppercase tracking-[0.12em] text-muted'>
            {t('name')}
          </span>
          <input
            type='text'
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={t('namePh')}
            className={inputClass}
          />
        </label>
        <label className='block'>
          <span className='mb-1.5 block text-xs font-bold uppercase tracking-[0.12em] text-muted'>
            {t('phone')}
          </span>
          <input
            type='tel'
            required
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder={t('phonePh')}
            className={inputClass}
          />
        </label>
      </div>

      <div className='grid gap-4 sm:grid-cols-2'>
        <label className='block'>
          <span className='mb-1.5 block text-xs font-bold uppercase tracking-[0.12em] text-muted'>
            {t('service')}
          </span>
          <select
            value={serviceId}
            onChange={(event) => setServiceId(event.target.value)}
            className={inputClass}
          >
            {services.map((item) => (
              <option key={item.id} value={item.id}>
                {ts(`items.${item.id}.title`)}
              </option>
            ))}
          </select>
        </label>
        <label className='block'>
          <span className='mb-1.5 block text-xs font-bold uppercase tracking-[0.12em] text-muted'>
            {t('location')}
          </span>
          <input
            type='text'
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder={t('locationPh')}
            className={inputClass}
          />
        </label>
      </div>

      <label className='block'>
        <span className='mb-1.5 block text-xs font-bold uppercase tracking-[0.12em] text-muted'>
          {t('description')}
        </span>
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          rows={4}
          placeholder={t('descriptionPh')}
          className='w-full rounded-md border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-muted/70 transition-colors duration-300 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20'
        />
      </label>

      <button
        type='submit'
        disabled={!isFormValid}
        className='flex h-[52px] w-full items-center justify-center gap-2.5 rounded-md bg-[#1faa59] text-sm font-bold uppercase tracking-[0.08em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#199450] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0'
      >
        <WhatsAppIcon className='h-5 w-5' />
        {t('submit')}
      </button>

      <p className='text-center text-xs text-muted'>{t('note')}</p>
    </form>
  );
}
