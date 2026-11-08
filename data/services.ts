import type { Service } from '@/types';

/* ============================================================================
   SERVIÇOS — apenas serviços reais prestados pela VART, com fotografias reais
   dos trabalhos existentes em /assets/services. Não inventar serviços.
   ========================================================================== */

export const services: Service[] = [
  {
    id: 'canalizacao',
    title: 'Canalização',
    slug: 'canalizacao',
    tagline: 'Redes de água em PPR, cobre e PVC.',
    description:
      'Instalação e renovação completa de redes hidráulicas: água fria e quente, esgotos e pluviais. Tubagens em PPR executadas com fusão controlada e fixações corretas — sem fugas e sem retrabalho.',
    bullets: [
      'Redes de água fria e quente (PPR, PVC, cobre)',
      'Novas instalações e substituição de tubagens antigas',
      'Distribuição para cozinhas, casas de banho e roupeiros',
    ],
    image: '/assets/services/canalizacao/patriota-vias-express/instalacao-ppr.webp',
    imageAlt: 'Instalação de tubagem PPR executada pela VART Soluções',
    href: '/servicos#canalizacao',
    featured: true,
  },
  {
    id: 'eletrobombas',
    title: 'Eletrobombas',
    slug: 'eletrobombas',
    tagline: 'Montagem, arranque e otimização do bombeamento.',
    description:
      'Dimensionamento, montagem e manutenção de eletrobombas para edifícios e obras. Pressão estável, proteção do equipamento e consumo sob controlo.',
    bullets: [
      'Seleção e montagem da bomba adequada ao sistema',
      'Instalação de grupos de pressurização',
      'Diagnóstico e correção de perdas de pressão',
    ],
    image: '/assets/services/canalizacao/obra-onga-montagem-de-eletrobomba.avif',
    imageAlt: 'Montagem de eletrobomba em obra executada pela VART Soluções',
    href: '/servicos#eletrobombas',
    featured: true,
  },
  {
    id: 'piscinas',
    title: 'Piscinas',
    slug: 'piscinas',
    tagline: 'Circulação, filtragem e tratamento de água.',
    description:
      'Instalação e manutenção de sistemas de circulação e filtragem de piscinas: bombas, filtros, tubagens e tratamento — água límpida e equipamento protegido durante todo o ano.',
    bullets: [
      'Montagem de bombas e sistemas de filtragem',
      'Retrofit e correção de instalações existentes',
      'Plano de manutenção periódica',
    ],
    image: '/assets/services/canalizacao/bomba-de-piscina.webp',
    imageAlt: 'Bomba de piscina instalada pela VART Soluções',
    href: '/servicos#piscinas',
    featured: true,
  },
  {
    id: 'deteccao-de-fugas',
    title: 'Deteção de Fugas',
    slug: 'deteccao-de-fugas',
    tagline: 'Testes de estanqueidade e diagnóstico preciso.',
    description:
      'Testes de pressão e estanqueidade para localizar fugas sem destruir paredes e pavimentos. Diagnóstico claro, reparação cirúrgica e comprovação do resultado.',
    bullets: [
      'Teste de estanqueidade em redes novas e existentes',
      'Localização de fugas em paredes e pavimentos',
      'Relatório técnico do estado da instalação',
    ],
    image: '/assets/services/canalizacao/patriota-vias-express/teste-de-fuga.webp',
    imageAlt: 'Teste de fuga em instalação hidráulica realizado pela VART Soluções',
    href: '/servicos#deteccao-de-fugas',
    featured: true,
  },
  {
    id: 'manutencao',
    title: 'Manutenção Técnica',
    slug: 'manutencao',
    tagline: 'Preventiva e corretiva, com resposta rápida.',
    description:
      'Planos de manutenção para instalações hidráulicas e equipamentos: inspeção periódica, correção preventiva e resposta rápida quando algo falha — para que o problema pequeno não se torne obra.',
    bullets: [
      'Inspeção e manutenção preventiva programada',
      'Reparação de avarias em bombas e redes',
      'Substituição de componentes com material certificado',
    ],
    image: '/assets/services/canalizacao/manutencao-eletrobomba.webp',
    imageAlt: 'Manutenção de eletrobomba realizada pela VART Soluções',
    href: '/servicos#manutencao',
    featured: true,
  },
];

/** Serviços em destaque na Home (ordem de apresentação). */
export const featuredServices = services.filter((s) => s.featured);
