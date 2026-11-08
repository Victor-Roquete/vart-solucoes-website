import type { HeroSlide } from '@/types';

/* ============================================================================
   HERO — slides em ecrã inteiro (fotografias reais em /assets/hero/home).
   `focus` = object-position CSS. `layout: 'portrait'` = foto vertical.
   ⚠ CONFIRMAR: âmbito de eletricidade/ladrilho/teto falso e o termo
   "termofusão" (deduzido da fotografia da máquina de soldar PPR).
   ========================================================================== */

const BASE = '/assets/hero/home';

export const heroSlides: HeroSlide[] = [
  {
    id: 'ppr-exterior',
    eyebrow: 'Canalização',
    title: 'Redes de água em PPR',
    description:
      'Instalação e renovação de redes hidráulicas, com ligações verificadas e teste antes da entrega.',
    image: `${BASE}/home-slider-instalacao-de-redes-de-agua-ppr-exterior.webp`,
    imageAlt: 'Rede de tubagem em PPR instalada pela VART Soluções',
    href: '/servicos#canalizacao',
    show: 'all',
    focus: '50% 45%',
  },
  {
    id: 'termofusao',
    eyebrow: 'Canalização',
    title: 'Ligações em PPR por termofusão',
    description:
      'Soldadura das tubagens em obra, com ligações executadas e verificadas antes da entrega.',
    image: `${BASE}/home-slider-carrossel-1.webp`,
    imageAlt: 'Técnico da VART a soldar tubagem em PPR numa obra',
    href: '/servicos#canalizacao',
    show: 'all',
    layout: 'portrait',
    focus: '50% 40%',
  },
  {
    id: 'eletricidade',
    eyebrow: 'Eletricidade',
    title: 'Fiação e condutores',
    description:
      'Passagem e ligação de condutores com organização e verificação final.',
    image: `${BASE}/home-slider-eletricidade-fiacao-dos-condutores-6.webp`,
    imageAlt: 'Passagem de condutores elétricos numa obra da VART Soluções',
    href: '/servicos',
    show: 'all',
    focus: '50% 45%',
  },
  {
    id: 'ladrilho',
    eyebrow: 'Revestimentos',
    title: 'Assentamento de ladrilho',
    description: 'Pavimentos e paredes revestidos com acabamento cuidado.',
    image: `${BASE}/home-slider-ladrilho-2.webp`,
    imageAlt: 'Assentamento de ladrilho executado pela VART Soluções',
    href: '/servicos',
    show: 'all',
    focus: '50% 50%',
  },
  {
    id: 'montagem-rede',
    eyebrow: 'Canalização',
    title: 'Montagem da rede de água',
    description:
      'Traçado e montagem de tubagem em PPR, com ligações organizadas e testadas.',
    image: `${BASE}/home-slider-carrossel-2.webp`,
    imageAlt: 'Montagem de tubagem em PPR por um técnico da VART',
    href: '/servicos#canalizacao',
    show: 'all',
    layout: 'portrait',
    focus: '50% 45%',
  },
  {
    id: 'esgoto-pvc',
    eyebrow: 'Canalização',
    title: 'Redes de esgoto em PVC',
    description: 'Execução de ramais e ligações de drenagem em PVC.',
    image: `${BASE}/home-slider-redes-de-esgoto-pvc-2.webp`,
    imageAlt: 'Rede de esgoto em PVC instalada pela VART Soluções',
    href: '/servicos#canalizacao',
    show: 'all',
    layout: 'portrait',
    width: 780,
    height: 1040,
    focus: '50% 50%',
  },
  {
    id: 'teto-falso',
    eyebrow: 'Acabamentos',
    title: 'Tetos falsos',
    description: 'Execução de tetos falsos com acabamento limpo.',
    image: `${BASE}/home-slider-teto-falso.webp`,
    imageAlt: 'Teto falso executado pela VART Soluções',
    href: '/servicos',
    show: 'all',
    focus: '50% 50%',
  },
  {
    id: 'ppr-distribuicao',
    eyebrow: 'Canalização',
    title: 'Distribuição de água',
    description:
      'Ligações e distribuição executadas com organização e verificação final.',
    image: `${BASE}/home-slider-instalacao-de-redes-de-agua-ppr-exterior-3.webp`,
    imageAlt: 'Distribuição de água em PPR instalada pela VART Soluções',
    href: '/servicos#canalizacao',
    show: 'all',
    focus: '50% 45%',
  },
];
