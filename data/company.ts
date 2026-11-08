import type { CompanyInfo } from '@/types';

/* ============================================================================
   DADOS DA EMPRESA — fonte única de verdade.
   ⚠️ DADOS MARCADOS COM [PLACEHOLDER] DEVEM SER VALIDADOS PELA DIREÇÃO ANTES
      DA PUBLICAÇÃO (telefone, email, redes sociais, horário).
   ========================================================================== */

/** [PLACEHOLDER] Substituir pelo número real (formato internacional, só dígitos). */
const WHATSAPP_NUMBER = '244954274664';

export const company: CompanyInfo = {
  name: 'VART Soluções',
  legalName: 'VART Soluções — Prestação de Serviços',
  tagline: 'Prestação de Serviços Técnicos',
  shortDescription:
    'Canalização, eletrobombas, piscinas, eletricidade e acabamentos — ladrilho, tetos falsos e pintura — executados com precisão, rigor e compromisso com o resultado.',

  longDescription: [
    'A VART Soluções é uma empresa angolana de prestação de serviços técnicos. Parte da canalização e dos sistemas hidráulicos — instalações, bombeamento, piscinas e manutenção — e atua também em eletricidade e acabamentos como ladrilho, tetos falsos e pintura, em obras residenciais, comerciais e industriais.',
    'Cada obra é conduzida com critério técnico: diagnóstico cuidadoso, materiais adequados, execução limpa e verificação final — porque a qualidade de uma instalação não se vê no primeiro dia, vê-se ao longo dos anos.',
  ],

  phone: {
    label: 'Telefone',
    value: '+244 954274664',
    href: 'tel:+244954274664',
  },

  whatsapp: {
    label: 'WhatsApp',
    value: '+244 954274664',
    href: `https://wa.me/${WHATSAPP_NUMBER}?text=Olá!%20Gostaria%20de%20mais%20informações%20sobre%20os%20serviços%20da%20VART%20Soluções.`,
    waUrl: `https://wa.me/${WHATSAPP_NUMBER}?text=Olá!%20Gostaria%20de%20mais%20informações%20sobre%20os%20serviços%20da%20VART%20Soluções.`,
  },

  email: {
    label: 'Email',
    value: 'vartsolucoes@gmail.com',
    href: 'mailto:vartsolucoes@gmail.com',
  },

  address: {
    label: 'Localização',
    value: 'Talatona, Luanda, Angola',
  },

  hours: {
    label: 'Horário',
    value: 'Seg–Sáb · 08h00 às 18h00',
  },

  serviceAreas: ['Luanda', 'Províncias vizinhas — sob consulta'],

  socials: [
    { label: 'Facebook', href: 'https://www.facebook.com/share/1DdTsaEhHm/', icon: 'social-facebook-svgrepo-com.svg' },
    { label: 'Instagram', href: 'https://www.instagram.com/vart_solucoes?igsi=MTNjY2l3aG9vYXRmcw==', icon: 'social-instagram-svgrepo-com.svg' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/vart-solucoes', icon: 'social-linkedin-svgrepo-com.svg' },
    { label: 'YouTube', href: 'https://www.youtube.com/@VARTSolu%C3%A7%C3%B5es', icon: 'social-youtube-svgrepo-com.svg' },
  ],

  mapEmbedUrl:
    'https://www.google.com/maps?q=Luanda%2C%20Angola&z=11&output=embed',
};
