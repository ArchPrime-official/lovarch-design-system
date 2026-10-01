#!/usr/bin/env node
/**
 * build-tokens.mjs — gera, a partir de src/tokens/tokens.json (a fonte da verdade):
 *
 *   src/tokens/tokens.css           → variáveis CSS (:root + .dark) para o app
 *   src/tokens/tokens.ts            → constantes TS sem imports (vale em Node, Vite e Deno:
 *                                     é o que as Edge Functions, e-mails e PDFs consomem)
 *   src/tokens/tailwind-tokens.ts   → objetos para o tailwind-preset (colors, fontSize, zIndex…)
 *
 * Uso:  node scripts/build-tokens.mjs           (escreve)
 *       node scripts/build-tokens.mjs --check   (sai 1 se algum arquivo gerado estiver desatualizado)
 *
 * Sem dependências. Nunca edite os arquivos gerados à mão.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, "src", "tokens");
const tokens = JSON.parse(readFileSync(join(SRC, "tokens.json"), "utf8"));
const CHECK = process.argv.includes("--check");
const HEADER = `GERADO por scripts/build-tokens.mjs a partir de tokens.json (DS v${tokens.version}). NÃO EDITE À MÃO.`;

// ---------------------------------------------------------------- helpers
const stripComments = (obj) =>
  Object.fromEntries(Object.entries(obj).filter(([k]) => k !== "$comment"));

/** "240 6% 10%" → "#18181b" */
export function hslTripletToHex(triplet) {
  const m = /^\s*([\d.]+)\s+([\d.]+)%\s+([\d.]+)%\s*$/.exec(triplet);
  if (!m) return null;
  const h = Number(m[1]) / 360, s = Number(m[2]) / 100, l = Number(m[3]) / 100;
  const hue2rgb = (p, q, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  let r, g, b;
  if (s === 0) r = g = b = l;
  else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3); g = hue2rgb(p, q, h); b = hue2rgb(p, q, h - 1 / 3);
  }
  const to = (x) => Math.round(x * 255).toString(16).padStart(2, "0");
  return `#${to(r)}${to(g)}${to(b)}`.toUpperCase();
}

const cssBlock = (entries, indent = "    ") =>
  Object.entries(entries).map(([k, v]) => `${indent}--${k}: ${v};`).join("\n");

// ---------------------------------------------------------------- tokens.css
function buildCss() {
  const L = tokens.color.light, D = tokens.color.dark;
  const RL = stripComments(tokens.raw.light), RD = stripComments(tokens.raw.dark);
  const SL = tokens.shadow.light, SD = tokens.shadow.dark;
  const durations = Object.fromEntries(Object.entries(tokens.duration).map(([k, v]) => [`duration-${k}`, v]));
  const easings = Object.fromEntries(Object.entries(tokens.easing).map(([k, v]) => [`ease-${k}`, v]));
  const z = Object.fromEntries(Object.entries(tokens.zIndex).map(([k, v]) => [`z-${k}`, String(v)]));
  const fonts = Object.fromEntries(Object.entries(tokens.font.family).map(([k, v]) => [`font-${k}`, v]));
  return `/* Lovarch Design System V8 — Tokens
   ${HEADER}
   Light = base (#FAF9F7). Dark = opt-in via classe .dark (nunca prefers-color-scheme).
   Importe ANTES das diretivas @tailwind do consumidor. */

@layer base {
  :root {
    /* Cores semânticas — HSL sem hsl() para o Tailwind aplicar alpha (bg-accent/10) */
${cssBlock(L)}

    /* Sombras */
${cssBlock(SL)}

    /* Raio */
${cssBlock(tokens.radius)}

    /* Transições (legado) + durações e easings nomeados */
${cssBlock(tokens.transition)}
${cssBlock(durations)}
${cssBlock(easings)}

    /* z-index */
${cssBlock(z)}

    /* Famílias tipográficas */
${cssBlock(fonts)}

    /* Superfícies e valores literais — Light */
${cssBlock(RL)}
  }

  .dark {
${cssBlock(D)}

${cssBlock(SD)}

    /* Superfícies e valores literais — Dark */
${cssBlock(RD)}
  }
}
`;
}

// ---------------------------------------------------------------- tokens.ts
function buildTs() {
  const ovL = stripComments(tokens.hexOverride?.light ?? {});
  const ovD = { ...ovL, ...stripComments(tokens.hexOverride?.dark ?? {}) };
  const hex = {
    light: Object.fromEntries(Object.entries(tokens.color.light).map(([k, v]) => [k, ovL[k] ?? hslTripletToHex(v)])),
    dark: Object.fromEntries(
      Object.entries({ ...tokens.color.light, ...tokens.color.dark }).map(([k, v]) => [k, ovD[k] ?? hslTripletToHex(v)]),
    ),
  };
  const clean = JSON.parse(JSON.stringify(tokens, (k, v) => (k === "$comment" || k === "$schema" ? undefined : v)));
  return `/**
 * Lovarch Design System V8 — tokens em TypeScript.
 * ${HEADER}
 *
 * Sem imports: este arquivo vale em Vite, Node e Deno (Edge Functions, e-mails, PDFs,
 * páginas públicas). Para hex pronto use \`hex.light.accent\` (#A16207) etc.
 */
export const tokens = ${JSON.stringify(clean, null, 2)} as const;

/** Cores resolvidas em hex por tema (dark herda do light o que não redefine). */
export const hex = ${JSON.stringify(hex, null, 2)} as const;

export type ColorToken = keyof typeof tokens.color.light;
export type Theme = keyof typeof hex;

/** \`hsl(var(--accent))\` — para CSS gerado em runtime. */
export const cssVar = (name: string): string => \`hsl(var(--\${name}))\`;

/** Cor em hex já resolvida. \`color("accent")\` → "#A16207". */
export const color = (name: ColorToken, theme: Theme = "light"): string => hex[theme][name];

/** Fontes por papel. \`fontFamily.heading\` → "'Outfit', 'Inter', sans-serif". */
export const fontFamily = tokens.font.family;

/** Tamanhos em px por nome (micro/caption/xs/dense/sm/base/lg/xl/2xl/3xl/4xl/5xl/hero/hero-lg). */
export const fontSizePx = Object.fromEntries(
  Object.entries(tokens.font.size).map(([k, v]) => [k, parseInt(String(v[0]), 10)]),
) as Record<keyof typeof tokens.font.size, number>;

export const zIndex = tokens.zIndex;
export const duration = tokens.duration;
export const radius = tokens.radiusScale;
`;
}

// ---------------------------------------------------------------- tailwind-tokens.ts
function buildTailwind() {
  const hslKeys = Object.keys(tokens.color.light);
  // agrupa "primary-foreground" sob primary.foreground (padrão shadcn)
  const colors = {};
  for (const key of hslKeys) {
    const value = `hsl(var(--${key}))`;
    const idx = key.indexOf("-");
    if (idx === -1) { colors[key] = typeof colors[key] === "object" ? { ...colors[key], DEFAULT: value } : value; continue; }
    const base = key.slice(0, idx), sub = key.slice(idx + 1);
    if (base === "sidebar" || base === "chart") {
      colors[base] = { ...(typeof colors[base] === "object" ? colors[base] : {}), [sub === "background" ? "DEFAULT" : sub]: value };
      continue;
    }
    const existing = colors[base];
    colors[base] = typeof existing === "string" ? { DEFAULT: existing, [sub]: value } : { ...(existing || {}), [sub]: value };
  }
  const raw = stripComments(tokens.raw.light);
  for (const key of ["surface", "surface-hover", "surface-active", "backdrop", "line", "line-soft", "line-strong"]) {
    if (key in raw) colors[key] = `var(--${key})`;
  }
  colors.gold = { DEFAULT: "hsl(38 90% 33%)", light: "hsl(40 64% 55%)", dark: "hsl(24 83% 31%)" };

  const fontSize = Object.fromEntries(
    Object.entries(stripComments(tokens.font.size)).map(([k, [size, lh]]) => [k, [size, { lineHeight: lh }]]),
  );
  const zIndex = Object.fromEntries(Object.entries(tokens.zIndex).map(([k, v]) => [k, String(v)]));
  const transitionDuration = Object.fromEntries(Object.entries(tokens.duration).map(([k, v]) => [k, v]));
  const transitionTimingFunction = Object.fromEntries(Object.entries(tokens.easing).map(([k, v]) => [k, v]));
  const letterSpacing = { eyebrow: tokens.font.tracking.eyebrow };
  const fontFamily = {
    sans: ["Inter", "sans-serif"],
    inter: ["Inter", "sans-serif"],
    playfair: ["Playfair Display", "serif"],
    "dm-sans": ["DM Sans", "sans-serif"],
    outfit: ["Outfit", "sans-serif"],
    mono: ["JetBrains Mono", "Source Code Pro", "Fira Code", "monospace"],
  };
  const boxShadow = {
    sm: "var(--shadow-sm)", md: "var(--shadow-md)", lg: "var(--shadow-lg)", xl: "var(--shadow-xl)", glow: "var(--shadow-glow)",
  };
  const borderRadius = { lg: "var(--radius)", md: "calc(var(--radius) - 2px)", sm: "calc(var(--radius) - 4px)" };
  const maxWidth = Object.fromEntries(Object.entries(tokens.layout).map(([k, v]) => [`layout-${k}`, v]));
  const out = { colors, fontSize, zIndex, transitionDuration, transitionTimingFunction, letterSpacing, fontFamily, boxShadow, borderRadius, maxWidth };
  return `/**
 * Lovarch Design System V8 — objetos do Tailwind derivados de tokens.json.
 * ${HEADER}
 * Consumido por tailwind-preset.ts. Classes resultantes: bg-accent, bg-surface, border-line,
 * text-micro/caption/dense, z-modal, duration-fast, tracking-eyebrow, max-w-layout-reading…
 */
export const tailwindTokens = ${JSON.stringify(out, null, 2)} as const;
`;
}

// ---------------------------------------------------------------- run
const outputs = {
  "tokens.css": buildCss(),
  "tokens.ts": buildTs(),
  "tailwind-tokens.ts": buildTailwind(),
};
let stale = 0;
for (const [file, content] of Object.entries(outputs)) {
  const path = join(SRC, file);
  const current = existsSync(path) ? readFileSync(path, "utf8") : null;
  if (CHECK) {
    if (current !== content) { console.error(`✗ desatualizado: src/tokens/${file}`); stale++; }
    else console.log(`✓ ${file}`);
  } else {
    writeFileSync(path, content);
    console.log(`→ src/tokens/${file} (${content.length} bytes)`);
  }
}
if (CHECK && stale) { console.error(`\n${stale} arquivo(s) gerado(s) fora de sincronia. Rode: node scripts/build-tokens.mjs`); process.exit(1); }
