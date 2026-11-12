import type { PageHeroImage } from '@/components/layout/PageHero';

/* ============================================================================
   FOTOGRAFIAS DOS CABEÇALHOS — só fotografias reais da VART (nunca de banco
   de imagens). Para mudar a foto ou o enquadramento de uma página, edita aqui:
   `src` = ficheiro em /public, `position` = object-position (x% y%).
   ========================================================================== */

const S = '/assets/services';

export const pageHeroes = {
  servicos: {
    src: `${S}/canalizacao/patriota-vias-express/instalacao-ppr-2.webp`,
    alt: 'Rede hidráulica em PPR instalada pela VART Soluções',
    position: '50% 45%',
  },
  projetos: {
    src: `${S}/canalizacao/obra-golfo/instalacao-de-redes-de-agua-ppr-exterior.webp`,
    alt: 'Rede de água em PPR numa obra da VART Soluções',
    position: '50% 50%',
  },
  sobre: {
    src: `${S}/canalizacao/patriota-vias-express/instalacao-redes-de-agua-reservatorio-elevado-5.webp`,
    alt: 'Instalação de rede de água executada pela VART Soluções',
    position: '50% 50%',
  },
  contato: {
    src: `${S}/canalizacao/obra-projeto-nova-vida/whatsapp-image-2026-11-08-at-10-17-34.webp`,
    alt: 'Obra executada pela VART Soluções',
    position: '50% 50%',
  },
} satisfies Record<string, PageHeroImage>;
