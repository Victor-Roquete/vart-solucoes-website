/** Chaves de navegação; os textos vêm de messages/<idioma>/common.json (nav.*). */
export type NavKey =
  | 'home'
  | 'services'
  | 'projects'
  | 'about'
  | 'contact'
  | 'quote';

export interface NavLink {
  key: NavKey;
  href: string;
}

export const mainNav: NavLink[] = [
  { key: 'home', href: '/' },
  { key: 'services', href: '/servicos' },
  { key: 'projects', href: '/projetos' },
  { key: 'about', href: '/sobre' },
  { key: 'contact', href: '/contato' },
];

export const footerNav: NavLink[] = [
  { key: 'about', href: '/sobre' },
  { key: 'projects', href: '/projetos' },
  { key: 'contact', href: '/contato' },
  { key: 'quote', href: '/contato#orcamento' },
];
