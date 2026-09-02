/* ============================================================================
   DADOS AUXILIARES DA HOME — trust bar, diferenciais e processo.
   Sem números inventados: apenas compromissos e etapas reais do serviço.
   ========================================================================== */

export const trustItems: string[] = [
  'Qualidade',
  'Profissionalismo',
  'Compromisso',
  'Soluções integradas',
  'Execução limpa',
  'Resposta rápida',
];

export interface Differential {
  id: string;
  title: string;
  description: string;
  icon: 'shield' | 'hardhat' | 'layers' | 'handshake';
}

export const differentials: Differential[] = [
  {
    id: 'qualidade',
    title: 'Qualidade',
    description:
      'Materiais adequados, execução criteriosa e verificação final em cada serviço entregue.',
    icon: 'shield',
  },
  {
    id: 'profissionalismo',
    title: 'Profissionalismo',
    description:
      'Equipa técnica experiente, pontual e comunicativa — do primeiro contacto à entrega.',
    icon: 'hardhat',
  },
  {
    id: 'solucoes-integradas',
    title: 'Soluções integradas',
    description:
      'Canalização, bombeamento, piscinas e manutenção: um único parceiro para a sua infraestrutura.',
    icon: 'layers',
  },
  {
    id: 'compromisso',
    title: 'Compromisso',
    description:
      'Prazos respeitados e acompanhamento após o serviço. O nome da VART está em cada obra.',
    icon: 'handshake',
  },
];

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    id: 'entendimento',
    title: 'Entendimento',
    description: 'Ouvimos a sua necessidade e recolhemos os detalhes do espaço e do problema.',
  },
  {
    id: 'avaliacao',
    title: 'Avaliação',
    description: 'Avaliamos a instalação no local e identificamos a solução técnica adequada.',
  },
  {
    id: 'orcamento',
    title: 'Orçamento',
    description: 'Apresentamos uma proposta clara, com materiais, prazos e valores definidos.',
  },
  {
    id: 'execucao',
    title: 'Execução',
    description: 'Executamos com rigor, limpeza e comunicação constante durante o trabalho.',
  },
  {
    id: 'entrega',
    title: 'Entrega',
    description: 'Testamos tudo, entregamos limpo e acompanhamos o resultado pós-serviço.',
  },
];