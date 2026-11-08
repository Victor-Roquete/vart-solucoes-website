import type { ShowcaseSlide } from '@/types';

/* ============================================================================
   CARROSSEL PRINCIPAL — narrativa visual da Home.
   Cada slide = uma área de atuação com imagem real + explicação.
   ========================================================================== */

export const showcaseSlides: ShowcaseSlide[] = [
  {
    id: 'slide-canalizacao',
    title: 'Canalização',
    category: 'Instalações Hidráulicas',
    description:
      'Redes de água executadas com precisão: tubagens em PPR, ligações seguras e testes de estanqueidade — para uma instalação que dura anos.',
    image: '/assets/services/canalizacao/patriota-vias-express/instalacao-ppr.webp',
    imageAlt: 'Tubagem PPR instalada com precisão pela VART Soluções',
    href: '/servicos#canalizacao',
  },
  {
    id: 'slide-eletrobombas',
    title: 'Bombeamento',
    category: 'Eletrobombas',
    description:
      'Montagem e manutenção de eletrobombas com critério técnico: pressão estável, equipamento protegido e consumo eficiente.',
    image: '/assets/services/canalizacao/obra-onga-montagem-de-eletrobomba.avif',
    imageAlt: 'Eletrobomba montada em obra pela VART Soluções',
    href: '/servicos#eletrobombas',
  },
  {
    id: 'slide-piscinas',
    title: 'Piscinas',
    category: 'Tratamento de Água',
    description:
      'Sistemas de circulação e filtragem instalados e mantidos para garantir água límpida e equipamento em perfeito estado.',
    image: '/assets/services/canalizacao/bomba-de-piscina.webp',
    imageAlt: 'Sistema de filtragem de piscina instalado pela VART Soluções',
    href: '/servicos#piscinas',
  },
  {
    id: 'slide-manutencao',
    title: 'Manutenção',
    category: 'Serviço Contínuo',
    description:
      'Inspeção preventiva e resposta rápida a avarias. Cuidamos das instalações para que os problemas pequenos nunca se tornem obras.',
    image: '/assets/services/canalizacao/manutencao-eletrobomba.webp',
    imageAlt: 'Manutenção técnica de eletrobomba pela VART Soluções',
    href: '/servicos#manutencao',
  },
];
