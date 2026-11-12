import type { Project } from '@/types';

/* ============================================================================
   PROJETOS — trabalhos reais com fotografia real. Qualidade > quantidade.
   Os TEXTOS (título, categoria, local, descrição, alt) estão em
   messages/<idioma>/projects.json → items.<id>; aqui ficam as fotografias.
   A Home usa os 3 primeiros projetos — não alterar a ordem destes 3.

   ⚠ CONFIRMAR: os nomes "Golfo" e "Patriota Vias Express" vêm dos nomes das
   pastas de fotografias, e o local "Luanda" foi assumido.
   PENDENTE (sem fotografias confirmadas para publicar): obra-projeto-nova-vida
   e obra-talatona. Para as ativar: acrescentar um objeto aqui + as 4 mensagens.
   ========================================================================== */

const C = '/assets/services/canalizacao';
const GOLFO = `${C}/obra-golfo`;
const PATRIOTA = `${C}/patriota-vias-express`;

/** Fotografias do reservatório elevado, por ordem numérica (não existe a nº 2). */
const reservatorio = [1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19].map(
  (n) => `${PATRIOTA}/instalacao-redes-de-agua-reservatorio-elevado-${n}.webp`
);

export const projects: Project[] = [
  {
    id: 'obra-onga-eletrobomba',
    title: 'Montagem de Eletrobomba',
    slug: 'obra-onga',
    category: 'Sistemas de Bombeamento',
    location: 'Obra Onga · Luanda',
    description:
      'Montagem e arranque de eletrobomba para abastecimento de água da obra, com proteção do equipamento e verificação de pressão em toda a rede.',
    image: `${C}/obra-onga-montagem-de-eletrobomba.avif`,
    imageAlt: 'Montagem de eletrobomba na obra Onga, em Luanda',
    featured: true,
  },
  {
    id: 'rede-ppr-residencial',
    title: 'Rede Hidráulica em PPR',
    slug: 'rede-hidraulica-ppr',
    category: 'Canalização',
    location: 'Luanda',
    description:
      'Execução de rede de água fria e quente em PPR, com fusão controlada, fixação correta e teste de estanqueidade antes do fecho de paredes.',
    image: `${PATRIOTA}/instalacao-ppr-2.webp`,
    imageAlt: 'Rede de tubagem PPR instalada pela VART Soluções',
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
    image: `${PATRIOTA}/teste-de-fuga.webp`,
    imageAlt: 'Teste de estanqueidade em instalação hidráulica',
  },
  {
    id: 'obra-golfo',
    title: 'Rede de Água em PPR (Exterior)',
    slug: 'obra-golfo',
    category: 'Canalização',
    location: 'Obra Golfo · Luanda',
    description: 'Instalação de redes de água em PPR no exterior.',
    image: `${GOLFO}/instalacao-de-redes-de-agua-ppr-exterior.webp`,
    imageAlt: 'Instalação de rede de água em PPR no exterior, na obra Golfo',
    gallery: [
      `${GOLFO}/antes-instalacao-exterior-ppr.jpeg`,
      `${GOLFO}/instalacao-de-redes-de-agua-ppr-exterior.webp`,
      `${GOLFO}/instalacao-de-redes-de-agua-ppr-exterior-2.webp`,
      `${GOLFO}/instalacao-de-redes-de-agua-ppr-exterior-3.webp`,
      `${GOLFO}/instalacao-exterior-ppr-avancado.jpeg`,
    ],
  },
  {
    id: 'patriota-vias-express',
    title: 'Rede de Água com Reservatório Elevado',
    slug: 'patriota-vias-express',
    category: 'Canalização',
    location: 'Patriota Vias Express · Luanda',
    description: 'Instalação de redes de água com reservatório elevado.',
    image: `${PATRIOTA}/instalacao-redes-de-agua-reservatorio-elevado-5.webp`,
    imageAlt: 'Instalação de rede de água com reservatório elevado, em Patriota Vias Express',
    gallery: [
      `${PATRIOTA}/instalacao-ppr.webp`,
      `${PATRIOTA}/instalacao-ppr-2.webp`,
      ...reservatorio,
      `${PATRIOTA}/teste-de-fuga.webp`,
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
