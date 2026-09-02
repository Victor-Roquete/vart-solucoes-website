'use client';

import { useState } from 'react';
import { services } from '@/data/services';
import { company } from '@/data/company';
import { whatsappMessage } from '@/lib/utils';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';

const inputClass =
  'h-12 w-full rounded-md border border-line bg-white px-4 text-sm text-ink placeholder:text-muted/70 transition-colors duration-300 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20';

/**
 * Formulário de orçamento — sem backend ainda, a submissão compõe uma
 * mensagem estruturada e abre o WhatsApp da empresa. Quando existir
 * POST /api/quote, basta trocar o handler.
 */
export function QuoteForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(services[0]?.title ?? '');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const isFormValid = name.trim() !== '' && phone.trim() !== '';

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isFormValid) return;

    const message = [
      'Olá, VART Soluções! Quero pedir um orçamento.',
      `Nome: ${name}`,
      `Telefone: ${phone}`,
      `Serviço: ${service}`,
      location.trim() ? `Localização: ${location}` : null,
      description.trim() ? `Descrição: ${description}` : null,
    ]
      .filter(Boolean)
      .join('\n');

    window.open(
      `${company.whatsapp.waUrl}?text=${whatsappMessage(message)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <form onSubmit={handleSubmit} className='mt-7 space-y-4' noValidate={false}>
      <div className='grid gap-4 sm:grid-cols-2'>
        <label className='block'>
          <span className='mb-1.5 block text-xs font-bold uppercase tracking-[0.12em] text-muted'>
            Nome *
          </span>
          <input
            type='text'
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder='O seu nome'
            className={inputClass}
          />
        </label>
        <label className='block'>
          <span className='mb-1.5 block text-xs font-bold uppercase tracking-[0.12em] text-muted'>
            Telefone *
          </span>
          <input
            type='tel'
            required
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder='+244 9XX XXX XXX'
            className={inputClass}
          />
        </label>
      </div>

      <div className='grid gap-4 sm:grid-cols-2'>
        <label className='block'>
          <span className='mb-1.5 block text-xs font-bold uppercase tracking-[0.12em] text-muted'>
            Tipo de serviço
          </span>
          <select
            value={service}
            onChange={(event) => setService(event.target.value)}
            className={inputClass}
          >
            {services.map((item) => (
              <option key={item.id} value={item.title}>
                {item.title}
              </option>
            ))}
          </select>
        </label>
        <label className='block'>
          <span className='mb-1.5 block text-xs font-bold uppercase tracking-[0.12em] text-muted'>
            Localização
          </span>
          <input
            type='text'
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder='Bairro / Município'
            className={inputClass}
          />
        </label>
      </div>

      <label className='block'>
        <span className='mb-1.5 block text-xs font-bold uppercase tracking-[0.12em] text-muted'>
          Descrição do trabalho
        </span>
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          rows={4}
          placeholder='Descreva o que precisa (ex.: instalação de rede hidráulica em moradia de 2 andares…)'
          className='w-full rounded-md border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-muted/70 transition-colors duration-300 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20'
        />
      </label>

      <button
        type='submit'
        disabled={!isFormValid}
        className='flex h-[52px] w-full items-center justify-center gap-2.5 rounded-md bg-[#1faa59] text-sm font-bold uppercase tracking-[0.08em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#199450] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0'
      >
        <WhatsAppIcon className='h-5 w-5' />
        Enviar pedido pelo WhatsApp
      </button>

      <p className='text-center text-xs text-muted'>
        Os campos com * são obrigatórios. Resposta normal dentro do horário
        de atendimento.
      </p>
    </form>
  );
}