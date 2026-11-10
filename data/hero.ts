import type { HeroSlide } from '@/types';

/* ============================================================================
   HERO — slides em ecrã inteiro (fotografias reais em /assets/hero/home).
   Os TEXTOS dos slides (eyebrow, título, descrição, alt) estão em
   messages/<idioma>/home.json → hero.slides.<id>.
   `focus` = object-position CSS. `layout: 'portrait'` = foto vertical.
   ⚠ CONFIRMAR: âmbito de eletricidade/ladrilho/teto falso e o termo
   "termofusão" (deduzido da fotografia da máquina de soldar PPR).
   ========================================================================== */

const BASE = '/assets/hero/home';

export const heroSlides: HeroSlide[] = [
  {
    id: 'ppr-exterior',
    image: `${BASE}/home-slider-instalacao-de-redes-de-agua-ppr-exterior.webp`,
    href: '/servicos#canalizacao',
    show: 'all',
    focus: '50% 45%',
  },
  {
    id: 'termofusao',
    image: `${BASE}/home-slider-carrossel-1.webp`,
    href: '/servicos#canalizacao',
    show: 'all',
    layout: 'portrait',
    focus: '50% 40%',
  },
  {
    id: 'eletricidade',
    image: `${BASE}/home-slider-eletricidade-fiacao-dos-condutores-6.webp`,
    href: '/servicos#eletricidade',
    show: 'all',
    focus: '50% 45%',
  },
  {
    id: 'ladrilho',
    image: `${BASE}/home-slider-ladrilho-2.webp`,
    href: '/servicos#ladrilho',
    show: 'all',
    focus: '50% 50%',
  },
  {
    id: 'montagem-rede',
    image: `${BASE}/home-slider-carrossel-2.webp`,
    href: '/servicos#canalizacao',
    show: 'all',
    layout: 'portrait',
    focus: '50% 45%',
  },
  {
    id: 'esgoto-pvc',
    image: `${BASE}/home-slider-redes-de-esgoto-pvc-2.webp`,
    href: '/servicos#canalizacao',
    show: 'all',
    layout: 'portrait',
    width: 780,
    height: 1040,
    focus: '50% 50%',
  },
  {
    id: 'teto-falso',
    image: `${BASE}/home-slider-teto-falso.webp`,
    href: '/servicos#teto-falso',
    show: 'all',
    focus: '50% 50%',
  },
  {
    id: 'ppr-distribuicao',
    image: `${BASE}/home-slider-instalacao-de-redes-de-agua-ppr-exterior-3.webp`,
    href: '/servicos#canalizacao',
    show: 'all',
    focus: '50% 45%',
  },
];
