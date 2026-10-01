# Marca Lovarch — especificação de uso

> Fonte única de verdade para o logo em qualquer superfície (app, portal, sites,
> e-mail, PDF, plugins CAD). O código vive em `src/brand/`; esta página diz **qual
> variante usar, onde, em que tamanho e o que é proibido**. Medições de 01/10/2026.

## 1. Princípios (não negociáveis)

| Regra | Como aplicar |
|---|---|
| **Fundo claro → logo PRETO. Fundo escuro → logo BRANCO.** | `<LovarchLogo theme="auto">` segue a classe `dark` do `<html>`; `theme="light"`/`"dark"` força quando a superfície não segue o tema do app (hero com foto, barra transparente). |
| **Nunca** sombra, gradiente, contorno, cor (nem dourado), rotação, distorção, corte do símbolo | O componente aplica `aspect-ratio` real do PNG + `object-contain`; não sobrescreva com `w-*` fixo nem `scale-x`. |
| **Área de respiro** = altura do "O" do wordmark, nos 4 lados | ≈ 0,8 × altura renderizada no `horizontal`; ≈ largura do símbolo no `icon`. Nada encosta no logo. |
| **Ordem de preferência dos lockups** | `vertical` (com tagline) → `horizontal` (cabeçalhos) → `icon` (só favicon/avatar). |
| **Tagline** | `AI GROWTH SYSTEM FOR ARCHITECTS & DESIGNERS` — sempre maiúscula, sempre esta redação (`LOVARCH_TAGLINE`). |

## 2. Variantes

| `variant` | O que é | Quando usar |
|---|---|---|
| `horizontal` (default) | símbolo + wordmark lado a lado | top nav, páginas públicas, PDF, plugins, rodapés |
| `vertical` | símbolo sobre wordmark + tagline | login/auth, hero, telas de boas-vindas, capas |
| `slogan` | horizontal com a tagline por baixo | apresentações, slides, capas largas |
| `icon` | só o símbolo (PNG) | favicon, avatar, chip compacto, app icon |
| `symbol` | só o símbolo em **SVG** `currentColor` | marca d'água, badge, loader estático, qualquer cor do tema |
| `email` | lockup vertical em 1024×434, retina-safe para clientes de e-mail | cabeçalho de e-mail (ver §6) |

```tsx
import { LovarchLogo, PoweredByLovarch, useLovarchTheme } from "@archprime/lovarch-ds/brand";

<LovarchLogo size="sm" priority />                              // top nav
<LovarchLogo variant="vertical" size="3xl" priority />          // login
<LovarchLogo variant="icon" height={24} theme="dark" />         // em card escuro
<LovarchLogo variant="symbol" size="md" className="text-foreground" />
```

Props: `variant` · `theme` (`auto`|`light`|`dark`) · `size` (`xs`…`4xl`) **ou** `height` (px)
· `className` · `alt` (default `"Lovarch"`) · `priority` (eager; use acima da dobra) · `style`.

## 3. Assets (medidos com Pillow)

Sufixo = **cor da tinta**, não o tema: `-dark` é o desenho preto (fundo claro), `-white` é o branco (fundo escuro).

| Arquivo (`src/brand/assets/`) | Dimensões | Proporção | Cor | Uso | Origem |
|---|---|---|---|---|---|
| `logo-horizontal-dark.png` | 1920×229 | 8,38:1 | preto | `horizontal` · tema claro | `src/assets/lovarch-logo-horizontal.png` |
| `logo-horizontal-white.png` | 1920×248 | 7,74:1 | branco | `horizontal` · tema escuro | já existia |
| `icon-dark.png` | 560×631 | 0,89:1 | preto | `icon` · tema claro | `src/assets/lovarch-icon.png` (819×922, 499 KB → redimensionado p/ parear com o branco, 214 KB) |
| `icon-white.png` | 560×631 | 0,89:1 | branco | `icon` · tema escuro | `src/assets/lovarch-icon-white.png` |
| `logo-vertical-dark.png` | 1920×583 | 3,29:1 | preto | `vertical` · tema claro | `src/assets/lovarch-logo-vertical-dark.png` |
| `logo-vertical-white.png` | 1536×652 | 2,36:1 | branco | `vertical` · tema escuro | `src/assets/lovarch-logo-vertical.png` (786 KB → 119 KB, sem perda: só os pixels 100 % transparentes foram achatados) |
| `logo-slogan.png` | 1920×279 | 6,88:1 | preto | `slogan` · tema claro | `src/assets/lovarch-logo-slogan.png` |
| `logo-slogan-white.png` | 1920×279 | 6,88:1 | branco | `slogan` · tema escuro | **derivado** do preto (mesma máscara alpha, RGB = branco) |
| `logo-email-dark.png` | 1024×434 | 2,36:1 | preto | `email` · fundo claro (**o que o kit de e-mail usa**) | `public/email/logo-email-dark.png` (1536×652, 703 KB → 72 KB) |
| `logo-email.png` | 1024×434 | 2,36:1 | branco | `email` · só cabeçalho escuro (legado `logo-email-v2`) | já existia |
| `favicon.png` | 455×512 | 0,89:1 | preto | fonte do favicon (gerar ICO/16/32/192/512) | já existia |
| `og-image.png` | 1200×800 | 1,5:1 | fundo escuro | Open Graph / Twitter Card | já existia |

⚠️ Os dois temas de uma mesma variante **nem sempre têm o mesmo canvas** (horizontal 229 vs 248 px de altura; vertical 1920×583 vs 1536×652). Por isso a proporção vem de `LOVARCH_LOGO_ASSETS` — nunca de um número decorado. O par `icon` e o par `email` foram pareados em dimensões idênticas.

### Nomes de arquivo no app que confundem

| Arquivo em `src/assets/` | Na verdade é |
|---|---|
| `lovarch-logo-vertical.png` | **branco** (p/ fundo escuro) — não "o normal" |
| `lovarch-logo-vertical-dark.png` | **preto** (p/ fundo claro) — "dark" aqui é a tinta, não o tema |
| `public/email/logo-email-v2.png` | o mesmo arquivo de `lovarch-logo-vertical.png` (branco) |

## 4. Tema claro / escuro

- **Base do produto é LIGHT** (`#FAF9F7`). O dark é opt-in do usuário (classe `dark` no `<html>`, salva em `localStorage`). `prefers-color-scheme` **nunca** decide o logo.
- `theme="auto"` (`useLovarchTheme`) lê a classe uma vez no mount (SSR-safe) e observa mudanças com `MutationObserver` — não há flash do logo errado ao abrir já em dark.
- Superfície que **não** segue o tema do app força a cor pela regra do fundo, não pelo tema:
  - hero com foto / barra transparente → `theme="dark"` (branco); barra sólida clara → `theme="light"`.
  - lightbox, player de vídeo e canvas de edição são sempre pretos → `theme="dark"`.
  - e-mail renderiza em `color-scheme: light only` → sempre o preto.

## 5. Tamanhos

| `size` | Altura | Onde |
|---|---|---|
| `xs` | 24 px | chips, header de plugin CAD, `PoweredByLovarch` |
| `sm` | 32 px | top nav, páginas públicas |
| `md` | 40 px | header padrão |
| `lg` | 48 px | header desktop |
| `xl` | 64 px | destaque médio |
| `2xl` | 80 px | destaque grande |
| `3xl` | 96 px | hero / auth |
| `4xl` | 128 px | página de login |

**Mínimos:** `icon` ≥ 24 px de altura · `horizontal` ≥ 96 px de largura (≈ `xs`) · `vertical`/`slogan` ≥ 160 px de largura (a tagline tem de continuar legível) · `symbol` SVG ≥ 16 px.

## 6. Posição por superfície

| Superfície | Variante · tamanho | Posição | Observação |
|---|---|---|---|
| Top nav do app | `horizontal` · `sm` | à esquerda, alinhado ao padding do conteúdo | `priority` (acima da dobra) |
| Login / auth | `vertical` (preferido) ou `horizontal` · `3xl` | centrado, acima do formulário | `4xl` só em tela cheia desktop |
| E-mail | `email` (**preto**, `LOVARCH_EMAIL_LOGO_DARK_URL`) | centrado, 140–160 px de largura, sobre `#FAF9F7` | O kit (`_shared/email-template.ts`) serve `app.lovarch.com/email/logo-email-dark.png` com `color-scheme: light only`; o `logo-email.png` branco é **invisível** nesse fundo — só para cabeçalho escuro |
| Páginas públicas (`/v/`, `/p/`, LPs) | `horizontal` · `sm` | canto superior esquerdo | em dark, `theme="auto"` já troca para o branco |
| PDF (propostas, capitolato, relatórios) | `horizontal` · 28 mm de largura | cabeçalho, alinhado à margem esquerda | fundo branco → preto; nunca em marca d'água colorida |
| Plugin CAD (SketchUp, Rhino, Revit, Blender) | `horizontal` · `xs` | header do painel | painéis escuros do host → `theme="dark"` |
| White-label (portal do cliente, sites publicados, propostas) | `PoweredByLovarch` | rodapé (ou canto da nav), `align="center"` no rodapé | logo a 14 px, label traduzido pelo consumidor |

### `PoweredByLovarch`

```tsx
<PoweredByLovarch label={t("portal.public.powered_by")} />                // inline
<PoweredByLovarch label="Powered by" align="center" className="mt-10" /> // rodapé
<PoweredByLovarch label="Powered by" theme="dark" labelClassName="text-white/70" /> // sobre foto
```

Props: `label` (obrigatório, já traduzido) · `href` (default `https://lovarch.com`) · `theme` · `className` · `labelClassName` · `align` (`left`|`center`|`right` — ocupa a linha).

## 7. Don'ts

- ❌ Logo cinza, dourado, ou "suavizado" com opacidade abaixo de 0,6 para parecer discreto.
- ❌ Sombra, glow, gradiente, borda, blur, fundo arredondado atrás do símbolo.
- ❌ Esticar/achatar: `w-full` sem `h-auto`, `scale-x`, `aspect-[4/1]` decorado. (O `ThemeAwareLogo` legado do app mantém a caixa 4:1 de propósito — é compatibilidade, não referência.)
- ❌ Logo branco sobre `#FAF9F7` ou preto sobre `#09090B` (o `logo-email.png` branco num e-mail claro já aconteceu).
- ❌ Símbolo separado do wordmark em tamanho grande — o `icon` existe para ≤ 48 px.
- ❌ Reescrever a tagline, traduzi-la ou mudar a caixa.
- ❌ Recriar o logo em outro lugar (`<img src="/brand/…">` solto, PNG copiado para `public/`). Importe de `@archprime/lovarch-ds/brand`; em HTML server-side use as constantes `LOVARCH_*_URL` ou uma cópia estável com o mesmo nome.

## 8. Onde cada coisa vive

| | Caminho |
|---|---|
| Componentes | `src/brand/LovarchLogo.tsx` · `PoweredByLovarch.tsx` · `LovarchSymbol.tsx` |
| Hook de tema | `useLovarchTheme(theme)` em `LovarchLogo.tsx` |
| URLs + tabela de dimensões | `src/brand/assets.ts` (`LOVARCH_LOGO_ASSETS`, `LOVARCH_TAGLINE`) |
| PNGs | `src/brand/assets/` |
| Wrapper legado no app (deprecated) | `Lovarch/src/components/ThemeAwareLogo.tsx` |

## Marca em movimento (v0.6.1)

| Componente | O que é | Onde usar |
|---|---|---|
| `LovarchMark3D` (`/brand`) | icosaedro em wireframe girando, hub dourado, 3 conexões acendendo do centro | login/auth, splash, páginas de marca, fim de vídeo |
| `LovarchSymbolLoader` (`/feedback`) | 13 neurônios convergindo em onda (3,6 s) + rótulo varrido | **só** carregamento (80 card · 96 seção · 120 tela) |
| `LovarchSymbol` (`/brand`) | símbolo estático em SVG | favicon, marca d'água, badges |
| `LOVARCH_EMAIL_ANIMATIONS` | GIFs dos e-mails de ativação (inbox, social, WhatsApp) | e-mails transacionais |

Linhas sempre na cor do texto (`currentColor`); o dourado é só o hub. Mark3D ≠ loader — não troque um pelo outro.
