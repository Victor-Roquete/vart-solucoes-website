import type { Project } from '@/types';

/* ============================================================================
   PROJETOS — trabalhos reais com fotografia real. Qualidade > quantidade:
   melhor mostrar 3 obras bem documentadas do que 6 fictícias.
   ========================================================================== */

export const projects: Project[] = [
  {
    id: 'obra-onga-eletrobomba',
    title: 'Montagem de Eletrobomba',
    slug: 'obra-onga',
    category: 'Sistemas de Bombeamento',
    location: 'Obra Onga · Luanda',
    description:
      'Montagem e arranque de eletrobomba para abastecimento de água da obra, com proteção do equipamento e verificação de pressão em toda a rede.',
    image: '/assets/services/canalizacao/obra-onga-montagem-de-eletrobomba.avif',
    imageAlt: 'Montagem de eletrobomba na obra Onga, em Luanda',
    featured: true,
  },
  {
    id: 'rede-ppr-residencial',
    title: 'Rede Hidráulica em PPR',
    slug: 'rede-ppr-residencial',
    category: 'Canalização',
    location: 'Residencial · Luanda',
    description:
      'Execução de rede de água fria e quente em PPR para habitação, com fusão controlada, fixação correta e teste de estanqueidade antes do fecho de paredes.',
    image: '/assets/services/canalizacao/patriota-vias-express/instalacao-ppr-2.webp',
    imageAlt: 'Rede de tubagem PPR instalada em habitação pela VART Soluções',
    featured: true,
  },
  {
    id: 'teste-estanqueidade',
    title: 'Teste de Estanqueidade',
    slug: 'teste-estanqueidade',
    category: 'Diagnóstico Técnico',
    location: 'Luanda',
    description:
      'Teste de pressão em rede nova para comprovar a estanqueidade de todas as ligações antes da entrega da instalação ao cliente.',
    image: '/assets/services/canalizacao/patriota-vias-express/teste-de-fuga.webp',
    imageAlt: 'Teste de estanqueidade em instalação hidráulica',
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
