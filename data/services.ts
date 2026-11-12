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
    id: 'instalacao-de-eletrobomba',
    title: 'Instalação de eletrobomba',
    slug: 'instalacao-de-eletrobomba',
    category: 'Hidráulica',
    tagline: 'Montagem, arranque e teste do sistema de bombeamento.',
    description:
      'Instalação de eletrobombas a partir da análise do conjunto — captação, sucção, recalque, válvulas, comandos e alimentação — para que a bomba funcione bem e fique protegida.',
    bullets: [
      'Montagem da eletrobomba e das tubagens de sucção e recalque',
      'Instalação de válvulas de pé e de retenção',
      'Fixação das tubagens e proteção contra golpe de aríete',
      'Arranque e teste de funcionamento',
    ],
    checks: [
      'Origem e qualidade da água: sem sólidos, fibras ou óleos, e necessidade de filtro à entrada',
      'Válvula de pé submersa e com bitola adequada à sucção',
      'Válvula de retenção no recalque, junto à bomba, e intermédias quando o desnível é grande',
      'Fixação das tubagens, para evitar esforços nos bocais da bomba e golpe de aríete',
      'Alimentação e comandos: ligações elétricas só por profissional habilitado',
      'No arranque: pressão, ruído, vibração, aquecimento e ausência de fugas',
    ],
    limits:
      'O dimensionamento da bomba depende dos dados da instalação e é confirmado no local. Trabalhos no quadro elétrico ou em equipamentos que exijam técnico autorizado são coordenados com o profissional habilitado.',
    image: `${S}/canalizacao/obra-onga-montagem-de-eletrobomba.avif`,
    imageAlt: 'Montagem de eletrobomba em obra executada pela VART Soluções',
    href: '/servicos#instalacao-de-eletrobomba',
    featured: true,
  },
  {
    id: 'manutencao-preventiva-de-eletrobombas',
    title: 'Manutenção preventiva de eletrobombas',
    slug: 'manutencao-preventiva-de-eletrobombas',
    category: 'Hidráulica',
    tagline: 'Inspeções para detetar desgaste antes da avaria.',
    description:
      'Plano de inspeção adaptado à instalação e ao uso, para detetar desgaste e falhas antes de a bomba parar. A frequência das visitas é definida depois da avaliação no local.',
    bullets: [
      'Inspeção periódica ao funcionamento automático',
      'Verificação do pressostato e dos ciclos de arranque',
      'Verificação de válvulas de pé e de retenção',
      'Limpeza de filtros de água',
      'Registo da intervenção e recomendações ao cliente',
    ],
    checks: [
      'Funcionamento automático da bomba: arranque e paragem',
      'Estanqueidade da válvula de pé',
      'Pressostato e boia de pressurização, quando existam',
      'Proteção contra falta de água, quando existir',
      'Filtros de água e válvulas de retenção',
      'Ruído, vibração, aquecimento e fugas',
      'Estado de chaves, relés e fusíveis, por profissional habilitado',
    ],
    limits:
      'A frequência das visitas e as ações incluídas dependem do equipamento, do uso e das indicações do fabricante, e ficam acordadas por escrito no orçamento.',
    image: `${S}/canalizacao/manutencao-de-eletrobomba.webp`,
    imageAlt: 'Manutenção de eletrobomba realizada pela VART Soluções',
    href: '/servicos#manutencao-preventiva-de-eletrobombas',
    featured: false,
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
  {
    id: 'termo-acumuladores',
    title: 'Termo-acumuladores',
    slug: 'termo-acumuladores',
    category: 'Hidráulica',
    tagline: 'Instalação, reparação e manutenção.',
    description:
      'Instalação, substituição, verificação e manutenção de termo-acumuladores, seguindo as instruções do fabricante e com atenção às ligações hidráulicas e aos dispositivos de segurança.',
    bullets: [
      'Instalação e substituição de termo-acumuladores',
      'Montagem do grupo de segurança hidráulico',
      'Reparação de fugas e de válvulas',
      'Manutenção periódica conforme o fabricante',
    ],
    checks: [
      'Modelo, capacidade e condições do local: suporte, espaço e acessibilidade',
      'Grupo de segurança: válvula de corte, de segurança, vaso de expansão, antirretorno e redutora de pressão',
      'Descarga da válvula de segurança livre, orientada para baixo e ligada a um escoamento',
      'Funcionamento da válvula de segurança, pelo manípulo de teste',
      'Estado do ânodo de proteção, nos modelos que o têm, segundo o fabricante',
      'Pressão da rede à entrada do equipamento',
      'Estanqueidade das ligações hidráulicas',
    ],
    limits:
      'Qualquer intervenção é feita com a alimentação elétrica desligada, e a parte elétrica só por profissional habilitado. A descarga da válvula de segurança nunca deve ser obstruída; pingar durante o aquecimento pode ser normal. Em equipamentos abrangidos por garantia seguem-se as condições do fabricante.',
    image: `${S}/cartoes/termo-acumuladores.svg`,
    imageAlt: 'Cartão gráfico do serviço Termo-acumuladores (ilustração da marca, não é fotografia de obra)',
    href: '/servicos#termo-acumuladores',
    featured: false,
  },
  {
    id: 'montagem-de-filtros',
    title: 'Montagem e manutenção de filtros',
    slug: 'montagem-de-filtros',
    category: 'Hidráulica',
    tagline: 'Filtros de piscina: montagem, arranque e manutenção.',
    description:
      'Montagem de filtros de piscina com bomba, válvula seletora e tubagens, e manutenção do conjunto de filtração, para que a água circule e seja filtrada como o equipamento prevê.',
    bullets: [
      'Instalação do filtro sobre base estável e nivelada',
      'Ligação da bomba, da válvula seletora e do retorno',
      'Carregamento de areia, quando aplicável',
      'Arranque e verificação da pressão no manómetro',
      'Manutenção e substituição de componentes',
    ],
    checks: [
      'Base do filtro estável, sólida e nivelada',
      'Válvula antirretorno, se o filtro ficar acima do nível da água',
      'Válvula seletora: filtragem, retrolavagem, enxaguamento, recirculação, esvaziamento e fecho',
      'Manobras da válvula sempre com a bomba desligada',
      'Areia colocada antes de ligar as tubagens à válvula',
      'Pressão inicial com o filtro limpo, registada como referência',
      'Estanqueidade das ligações e funcionamento da bomba',
    ],
    limits:
      'A pressão máxima de funcionamento e a carga de areia seguem as indicações do fabricante do filtro. As ligações elétricas do equipamento de piscina são feitas por profissional habilitado.',
    image: `${S}/cartoes/montagem-de-filtros.svg`,
    imageAlt: 'Cartão gráfico do serviço Montagem e manutenção de filtros (ilustração da marca, não é fotografia de obra)',
    href: '/servicos#montagem-de-filtros',
    featured: false,
  },
  {
    id: 'pintura',
    title: 'Pintura',
    slug: 'pintura',
    category: 'Acabamentos',
    tagline: 'Pintura com acabamento limpo.',
    description:
      'Execução de pinturas com acabamento limpo, proteção da área de trabalho e orçamento com âmbito definido antes da obra.',
    bullets: [
      'Avaliação no local antes do orçamento',
      'Proteção da área de trabalho',
      'Área limpa e entrega no fim',
    ],
    checks: [
      'Estado das superfícies e necessidade de preparação',
      'Materiais adequados ao tipo de superfície',
      'Proteção de pavimentos, mobiliário e áreas de circulação',
    ],
    limits:
      'O tipo de tinta, o número de demãos e o prazo dependem da avaliação no local e ficam definidos no orçamento.',
    image: `${S}/cartoes/pintura.svg`,
    imageAlt: 'Cartão gráfico do serviço Pintura (ilustração da marca, não é fotografia de obra)',
    href: '/servicos#pintura',
    featured: false,
  },
];

/** Serviços em destaque na Home (ordem de apresentação). */
export const featuredServices = services.filter((s) => s.featured);
