import { company } from '@/data/company';

/**
 * Link wa.me com mensagem pré-preenchida.
 * company.whatsapp.waUrl já traz um "?text=", por isso a base é cortada antes
 * (senão a mensagem ficava com um "?text=" literal lá dentro).
 */
export function whatsappLink(message: string): string {
  const base = company.whatsapp.waUrl.split('?')[0] ?? company.whatsapp.waUrl;
  return `${base}?text=${encodeURIComponent(message)}`;
}
