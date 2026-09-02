import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Combina classes condicionais e resolve conflitos do Tailwind. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Codifica um texto para uso em mensagem pré-preenchida de WhatsApp. */
export function whatsappMessage(text: string): string {
  return encodeURIComponent(text);
}
