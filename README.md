# VART Soluções — Website Institucional

![Next.js](https://img.shields.io/badge/Next.js-15-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)

Website institucional da **VART Soluções — Prestação de Serviços Técnicos** (Luanda, Angola): marca + apresentação institucional + portfólio + canal de orçamento.

> **Nota:** substitua os textos de exemplo em `data/` pelos dados definitivos da empresa antes de publicar.

---

## 🧰 Stack Tecnológica

| Camada | Tecnologia |
|---|---|
| Framework | **Next.js 15** (App Router) + **React 19** |
| Linguagem | **TypeScript** (frontend + servidor, no Node.js) |
| Estilos | **Tailwind CSS 4** (design tokens em `globals.css`) |
| Animações | **Framer Motion** + **Embla Carousel** |
| Ícones | **Lucide React** |
| Fonte | **Manrope** (via `next/font`) |
| Imagens | WebP/AVIF otimizados por `next/image` |

---

## 🚀 Como Rodar

**Requisito:** Node.js **≥ 20**.

```bash
# 1. Instalar dependências (apenas a primeira vez)
npm install

# 2. Rodar em desenvolvimento → http://localhost:3000
npm run dev

# 3. Build de produção + servir
npm run build
npm run start
```

### Scripts disponíveis

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento com hot reload |
| `npm run build` | Compila o site otimizado para produção |
| `npm run start` | Serve o build de produção |
| `npm run typecheck` | Verifica erros de TypeScript |
| `npm run lint` | Verifica boas práticas (ESLint) |
| `npm run verify` | Executa typecheck + lint + build |

---

## 📄 Páginas

| Rota | Descrição |
|---|---|
| `/` | Home — Hero cinematográfico, carrossel de serviços, projetos, processo, CTA e contacto |
| `/servicos` | Catálogo completo dos serviços, com âncoras (`#canalizacao`, `#eletrobombas`, …) |
| `/projetos` | Galeria editorial dos trabalhos executados |
| `/sobre` | História, compromissos e processo de trabalho |
| `/contato` | Canais diretos + mapa + **formulário de orçamento** (`#orcamento`) |

O formulário de orçamento não tem backend ainda: compõe a mensagem e abre o **WhatsApp** da empresa. Futuramente: `POST /api/quote`.

---

## 🗂️ Estrutura do Projeto

```
vart-soluões-website/
├── app/                    # Páginas, layout, SEO (sitemap, robots, favicon)
│   ├── layout.tsx          # Header, Footer, WhatsApp, cursor, barra de progresso
│   ├── page.tsx            # Home (composição das secções)
│   ├── servicos/           # /servicos
│   ├── projetos/           # /projetos
│   ├── sobre/              # /sobre
│   ├── contato/            # /contato (formulário #orcamento)
│   ├── icon.svg            # Favicon (símbolo VART)
│   ├── sitemap.ts          # sitemap.xml
│   └── robots.ts           # robots.txt
│
├── components/
│   ├── layout/             # Header, MobileMenu, Footer, PageHero, WhatsAppFloat, ScrollProgress
│   ├── home/               # Hero, TrustBar, AboutPreview, ServicesSection,
│   │                       # DifferentialsSection, ProjectsSection, ImpactSection,
│   │                       # ProcessSection, CTASection, ContactSection
│   ├── ui/                 # Button, Container, SectionHeading, Reveal, SpotlightCard, CustomCursor
│   ├── brand/              # Logo e VartSymbol (SVG vetorial da marca)
│   ├── forms/              # QuoteForm (orçamento → WhatsApp)
│   └── icons/              # WhatsAppIcon
│
├── data/                   # ⭐ CONTEÚDO DO SITE — edite aqui, não no JSX
│   ├── company.ts          # Nome, contactos, morada, horário, mapa, descrições
│   ├── services.ts         # Serviços (título, tagline, bullets, imagem, href)
│   ├── projects.ts         # Projetos (categoria, localização, imagem)
│   ├── showcase.ts         # Slides do carrossel da Home
│   ├── home.ts             # Trust bar, diferenciais, etapas do processo
│   └── navigation.ts       # Menu de navegação
│
├── types/                  # Contratos TypeScript (Service, Project, CompanyInfo…)
├── lib/                    # constants.ts (SITE_URL, WhatsApp…) e utils.ts (cn, whatsappMessage)
└── public/assets/          # Imagens reais dos trabalhos (hero/, services/, icons/social/, brand/)
```

---

## ✏️ Como Editar o Conteúdo

**Regra de ouro:** textos e dados vivem em `data/`, nunca espalhados nos componentes.

- **Mudar telefone/WhatsApp/email/morada** → `data/company.ts`
- **Adicionar/remover um serviço** → `data/services.ts` (a Home e `/servicos` atualizam sozinhas)
- **Publicar um projeto novo** → `data/projects.ts` (coloque a foto em `public/assets/`)
- **Mudar slides do carrossel** → `data/showcase.ts`
- **Mudar textos da marca** → `data/company.ts` + `lib/constants.ts`

### Adicionar imagens

1. Coloque a foto em `public/assets/services/` (ou `hero/`, `projects/`), de preferência **WebP** e com menos de **300 KB**;
2. Referencie em `data/` com o caminho `/assets/...`;
3. Escreva sempre um `imageAlt` descritivo (acessibilidade + SEO).

---

## 🎨 Identidade Visual

- **Símbolo VART**: componente `components/brand/VartSymbol.tsx` (SVG vetorial — usado no header, footer, favicon e menu)
- **Paleta**: azul-marinho da marca (`brand-900` → `brand-100`), definida em `app/globals.css`
- **Tipografia**: Manrope, hierarquia Display → Small
- Fundos escuros suportam a grelha técnica (`bg-blueprint`) e o brilho radial da marca

---

## ✅ Qualidade

- Mobile first (320 px → 1920 px)
- Acessibilidade: HTML semântico, navegação por teclado, focus visible, `prefers-reduced-motion`, `aria-label` no WhatsApp
- SEO: metadata por página, canonical, Open Graph, `sitemap.xml`, `robots.txt`
- Performance: hero com `priority`, lazy loading no resto da página, animações apenas com `transform`/`opacity`

---

## 🗺️ Próximos Passos (roadmap)

- [ ] Validar textos definitivos com a direção da VART
- [ ] Corrigir lint (alinhamento de versões dos plugins ESLint)
- [ ] Formulário com backend: `POST /api/quote` + validação + proteção anti-spam
- [ ] Schema.org `LocalBusiness` com os dados reais
- [ ] Deploy com HTTPS + domínio próprio + analytics

---

© VART Soluções — Prestação de Serviços Técnicos · Luanda, Angola
