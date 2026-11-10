/* ============================================================================
   Contratos de dados do website VART Soluções.
   A UI consome estes tipos — nenhum objeto solto no JSX.
   ========================================================================== */

export interface NavItem {
  label: string;
  href: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  /** Frase curta apresentada na lista interativa. */
  tagline: string;
  description: string;
  /** Pontos objetivo apresentados na página de serviços. */
  bullets: string[];
  image: string;
  imageAlt: string;
  href: string;
  featured?: boolean;
  /** Área que agrupa o serviço em /servicos (ex.: Hidráulica). */
  category: string;
  /** Fotografias reais adicionais do serviço. */
  gallery?: string[];
  /** Pontos que verificamos neste serviço (lista «O que verificamos»). */
  checks?: string[];
  /** Limites de atuação do serviço, em linguagem simples. */
  limits?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  location: string;
  year?: string;
  description: string;
  image: string;
  imageAlt: string;
  featured?: boolean;
}

export interface ShowcaseSlide {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  /** Nome do ficheiro em /assets/icons/social/ */
  icon: string;
}

export interface ContactChannel {
  label: string;
  value: string;
  href?: string;
}

export interface CompanyInfo {
  name: string;
  legalName: string;
  tagline: string;
  shortDescription: string;
  longDescription: string[];
  phone: ContactChannel;
  whatsapp: ContactChannel & { waUrl: string };
  email: ContactChannel;
  address: ContactChannel;
  hours: ContactChannel;
  serviceAreas: string[];
  socials: SocialLink[];
  mapEmbedUrl: string;
}

export interface HeroSlide {
  id: string;
  image: string;
  href: string;
  /** Onde aparece: fotos verticais de baixa resolução ficam só em 'mobile'. */
  show: 'all' | 'mobile' | 'desktop';
  /** 'portrait': em desktop mostra a foto vertical nítida sobre fundo desfocado. */
  layout?: 'cover' | 'portrait';
  /** Dimensões reais da foto (só layout 'portrait'); por defeito 720x1600. */
  width?: number;
  height?: number;
  /** object-position CSS (ponto focal), ex.: '50% 40%'. */
  focus?: string;
}
