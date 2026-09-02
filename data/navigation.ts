import type { NavItem } from '@/types';

export const mainNav: NavItem[] = [
  { label: 'Início', href: '/' },
  { label: 'Serviços', href: '/servicos' },
  { label: 'Projetos', href: '/projetos' },
  { label: 'Sobre nós', href: '/sobre' },
  { label: 'Contacto', href: '/contato' },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: 'Empresa',
    items: [
      { label: 'Sobre nós', href: '/sobre' },
      { label: 'Projetos', href: '/projetos' },
      { label: 'Contacto', href: '/contato' },
      { label: 'Solicitar orçamento', href: '/contato#orcamento' },
    ],
  },
];
