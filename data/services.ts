import type { Service } from '@/types';

/* ============================================================================
   SERVIÇOS — apenas serviços reais prestados pela VART, com fotografias reais
   dos trabalhos em /assets/services. Não inventar serviços nem promessas
   (sem "certificado", "garantia", prazos ou resultados que não estejam
   documentados — ver dossiê institucional).
   Para acrescentar um serviço: novo objeto aqui + fotografias em
   public/assets/services/<pasta>/. Pastas já criadas e ainda sem fotos:
   pedreira, pintura.
   ⚠ CONFIRMAR o âmbito exato de Ladrilho, Tetos falsos e Pintura (Eletricidade confirmada pela direção).
   ========================================================================== */

const S = '/assets/services';

export const services: Service[] = [
  {
    id: 'canalizacao',
    title: 'Canalização',
    slug: 'canalizacao',
    category: 'Hidráulica',
    tagline: 'Redes de água em PPR, cobre e PVC.',
    description:
      'Instalação, substituição e reparação de tubagens, ligações, válvulas e acessórios. Cada intervenção começa por compreender o estado da rede e termina com ligações verificadas e funcionamento testado.',
    bullets: [
      'Redes de água fria e quente (PPR, PVC, cobre)',
      'Novas instalações e substituição de tubagens antigas',
      'Redes de esgoto e drenagem em PVC',
    ],
    image: `${S}/canalizacao/patriota-vias-express/instalacao-ppr.webp`,
    imageAlt: 'Instalação de tubagem PPR executada pela VART Soluções',
    gallery: [
      `${S}/canalizacao/obra-golfo/instalacao-de-redes-de-agua-ppr-exterior.webp`,
      `${S}/canalizacao/redes-de-esgoto.webp`,
      `${S}/canalizacao/instalacao-ppr-4-exterior.webp`,
    ],
    href: '/servicos#canalizacao',
    featured: true,
  },
  {
    id: 'eletrobombas',
    title: 'Eletrobombas',
    slug: 'eletrobombas',
    category: 'Hidráulica',
    tagline: 'Montagem, arranque e otimização do bombeamento.',
    description:
      'Instalação, substituição e manutenção de eletrobombas e sistemas de bombeamento. Analisamos o conjunto — bomba, alimentação, comandos, sucção e descarga — antes de intervir.',
    bullets: [
      'Montagem e arranque de eletrobombas',
      'Diagnóstico de perdas de pressão e de funcionamento irregular',
      'Teste funcional depois da intervenção',
    ],
    image: `${S}/canalizacao/obra-onga-montagem-de-eletrobomba.avif`,
    imageAlt: 'Montagem de eletrobomba em obra executada pela VART Soluções',
    gallery: [
      `${S}/canalizacao/manutencao-eletrobomba.webp`,
      `${S}/canalizacao/manutencao-de-eletrobomba.webp`,
    ],
    href: '/servicos#eletrobombas',
    featured: true,
  },
  {
    id: 'piscinas',
    title: 'Piscinas',
    slug: 'piscinas',
    category: 'Hidráulica',
    tagline: 'Circulação, filtragem e tratamento de água.',
    description:
      'Instalação e manutenção de sistemas de circulação e filtragem de piscinas: bombas, filtros e tubagens.',
    bullets: [
      'Montagem de bombas e sistemas de filtragem',
      'Correção de instalações existentes',
      'Manutenção periódica',
    ],
    image: `${S}/canalizacao/bomba-de-piscina.webp`,
    imageAlt: 'Bomba de piscina instalada pela VART Soluções',
    href: '/servicos#piscinas',
    featured: true,
  },
  {
    id: 'deteccao-de-fugas',
    title: 'Deteção de Fugas',
    slug: 'deteccao-de-fugas',
    category: 'Hidráulica',
    tagline: 'Testes de estanqueidade e diagnóstico preciso.',
    description:
      'Testes de pressão e estanqueidade para identificar a origem provável de uma fuga antes de escolher o método de reparação. Quando for necessário abrir parede ou pavimento, explicamos primeiro ao cliente.',
    bullets: [
      'Teste de estanqueidade em redes novas e existentes',
      'Inspeção e localização da origem provável da fuga',
      'Reparação e verificação da estanqueidade',
    ],
    image: `${S}/canalizacao/patriota-vias-express/teste-de-fuga.webp`,
    imageAlt: 'Teste de fuga em instalação hidráulica realizado pela VART Soluções',
    href: '/servicos#deteccao-de-fugas',
    featured: true,
  },
  {
    id: 'manutencao',
    title: 'Manutenção Técnica',
    slug: 'manutencao',
    category: 'Hidráulica',
    tagline: 'Preventiva e corretiva para instalações e equipamentos.',
    description:
      'Inspeções e ações programadas para reduzir falhas e prolongar a vida útil das instalações hidráulicas e dos equipamentos, com intervenção nas avarias quando surgem.',
    bullets: [
      'Manutenção preventiva programada',
      'Reparação de avarias em bombas e redes',
      'Recomendações ao cliente depois de cada intervenção',
    ],
    image: `${S}/canalizacao/manutencao-eletrobomba.webp`,
    imageAlt: 'Manutenção de eletrobomba realizada pela VART Soluções',
    href: '/servicos#manutencao',
    featured: true,
  },
  {
    id: 'eletricidade',
    title: 'Eletricidade',
    slug: 'eletricidade',
    category: 'Elétrica',
    tagline: 'Fiação e ligação de condutores.',
    description:
      'Passagem e ligação de condutores em obra, com avaliação prévia no local, execução organizada e verificação final do trabalho executado.',
    bullets: [
      'Passagem e ligação de condutores',
      'Avaliação no local antes do orçamento',
      'Verificação final do trabalho executado',
    ],
    image: `${S}/eletricidade/eletricidade-fiacao-dos-condutores-6.webp`,
    imageAlt: 'Fiação de condutores elétricos numa obra da VART Soluções',
    gallery: [
      `${S}/eletricidade/eletricidade-fiacao-dos-condutores-2.webp`,
      `${S}/eletricidade/eletricidade-fiacao-dos-condutores-3.webp`,
      `${S}/eletricidade/eletricidade-fiacao-dos-condutores-5.webp`,
    ],
    href: '/servicos#eletricidade',
    featured: true,
  },
  {
    id: 'ladrilho',
    title: 'Ladrilho',
    slug: 'ladrilho',
    category: 'Acabamentos',
    tagline: 'Assentamento de ladrilho com acabamento cuidado.',
    description:
      'Assentamento de ladrilho em obra, incluindo escadas e casas de banho, com atenção ao alinhamento e ao acabamento final.',
    bullets: [
      'Assentamento em escadas e casas de banho',
      'Orçamento com âmbito e materiais definidos',
      'Limpeza e entrega da área concluída',
    ],
    image: `${S}/ladrilho/ladrilho.webp`,
    imageAlt: 'Assentamento de ladrilho executado pela VART Soluções',
    gallery: [
      `${S}/ladrilho/ladrilho-escadas.webp`,
      `${S}/ladrilho/ladrilho-wc-fase-de-acabamento.webp`,
      `${S}/ladrilho/ladrilho-7.webp`,
    ],
    href: '/servicos#ladrilho',
    featured: true,
  },
  {
    id: 'teto-falso',
    title: 'Tetos falsos',
    slug: 'teto-falso',
    category: 'Acabamentos',
    tagline: 'Execução de tetos falsos com acabamento limpo.',
    description:
      'Execução de tetos falsos com acabamento limpo, com orçamento e âmbito definidos antes da obra.',
    bullets: [
      'Avaliação no local antes do orçamento',
      'Execução organizada e área limpa no fim',
    ],
    image: `${S}/teto-falso/home-slider-teto-falso.webp`,
    imageAlt: 'Teto falso executado pela VART Soluções',
    href: '/servicos#teto-falso',
    featured: true,
  },
];

/** Serviços em destaque na Home (ordem de apresentação). */
export const featuredServices = services.filter((s) => s.featured);
