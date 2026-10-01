/**
 * Lovarch Design System V8 — tokens em TypeScript.
 * GERADO por scripts/build-tokens.mjs a partir de tokens.json (DS v0.6.0). NÃO EDITE À MÃO.
 *
 * Sem imports: este arquivo vale em Vite, Node e Deno (Edge Functions, e-mails, PDFs,
 * páginas públicas). Para hex pronto use `hex.light.accent` (#A16207) etc.
 */
export const tokens = {
  "version": "0.6.0",
  "color": {
    "light": {
      "primary": "240 6% 10%",
      "primary-foreground": "0 0% 98%",
      "primary-light": "240 5% 26%",
      "primary-dark": "240 6% 6%",
      "secondary": "40 12% 95%",
      "secondary-foreground": "240 6% 10%",
      "accent": "38 90% 33%",
      "accent-foreground": "0 0% 100%",
      "accent-light": "40 64% 55%",
      "background": "40 27% 97%",
      "foreground": "240 6% 10%",
      "card": "33 10% 95%",
      "card-foreground": "240 6% 10%",
      "muted": "33 10% 93%",
      "muted-foreground": "25 5% 33%",
      "border": "0 0% 89%",
      "input": "33 10% 95%",
      "ring": "38 90% 33%",
      "destructive": "0 72% 51%",
      "destructive-foreground": "0 0% 100%",
      "warning": "32 95% 44%",
      "warning-foreground": "0 0% 100%",
      "success": "142 76% 36%",
      "success-foreground": "0 0% 100%",
      "content": "271 81% 56%",
      "content-foreground": "0 0% 100%",
      "popover": "40 27% 97%",
      "popover-foreground": "240 6% 10%",
      "sidebar-background": "33 16% 94%",
      "sidebar-foreground": "240 6% 10%",
      "sidebar-primary": "240 6% 10%",
      "sidebar-primary-foreground": "0 0% 98%",
      "sidebar-accent": "38 90% 33%",
      "sidebar-accent-foreground": "0 0% 100%",
      "sidebar-border": "0 0% 89%",
      "sidebar-ring": "38 90% 33%",
      "chart-1": "38 90% 33%",
      "chart-2": "40 64% 55%",
      "chart-3": "142 76% 36%",
      "chart-4": "32 95% 44%",
      "chart-5": "271 81% 56%",
      "chart-6": "240 6% 10%"
    },
    "dark": {
      "background": "240 10% 4%",
      "foreground": "240 7% 94%",
      "card": "240 5% 7%",
      "card-foreground": "240 7% 94%",
      "muted": "240 4% 11%",
      "muted-foreground": "240 5% 65%",
      "border": "240 3% 13%",
      "input": "240 4% 10%",
      "primary": "240 7% 94%",
      "primary-foreground": "240 10% 4%",
      "primary-light": "0 0% 100%",
      "primary-dark": "240 5% 80%",
      "secondary": "240 4% 11%",
      "secondary-foreground": "240 7% 94%",
      "accent": "38 90% 33%",
      "accent-foreground": "0 0% 100%",
      "accent-light": "40 64% 55%",
      "destructive": "0 84% 60%",
      "warning": "38 92% 50%",
      "success": "142 71% 45%",
      "content": "271 91% 65%",
      "popover": "240 5% 7%",
      "popover-foreground": "240 7% 94%",
      "sidebar-background": "240 14% 4%",
      "sidebar-foreground": "240 7% 94%",
      "sidebar-primary": "240 7% 94%",
      "sidebar-primary-foreground": "240 10% 4%",
      "sidebar-accent": "38 90% 33%",
      "sidebar-accent-foreground": "0 0% 100%",
      "sidebar-border": "240 3% 11%",
      "ring": "38 90% 33%",
      "chart-3": "142 71% 45%",
      "chart-4": "38 92% 50%",
      "chart-5": "271 91% 65%",
      "chart-6": "240 7% 94%"
    }
  },
  "hexOverride": {
    "light": {
      "accent": "#A16207",
      "accent-light": "#D4A843",
      "background": "#FAF9F7",
      "foreground": "#1C1917",
      "card": "#F4F2EF",
      "muted-foreground": "#57534E"
    },
    "dark": {
      "background": "#09090B",
      "foreground": "#EDEDEF",
      "card": "#111113",
      "muted-foreground": "#A1A1AA"
    }
  },
  "raw": {
    "light": {
      "surface": "rgba(0,0,0,0.025)",
      "surface-hover": "rgba(0,0,0,0.045)",
      "surface-active": "rgba(0,0,0,0.06)",
      "backdrop": "rgba(9,9,11,0.5)",
      "line": "hsl(var(--border) / 0.4)",
      "line-soft": "hsl(var(--border) / 0.3)",
      "line-strong": "hsl(var(--border))",
      "accent-bg": "rgba(161,98,7,0.10)",
      "border-hover": "rgba(0,0,0,0.15)",
      "text-dim": "#78716C",
      "text-ghost": "#A8A29E",
      "accent-text": "#92400E",
      "bg-nav": "rgba(250,249,247,0.92)",
      "icon-bg": "rgba(0,0,0,0.04)",
      "icon-border": "rgba(0,0,0,0.06)",
      "positive": "#16A34A",
      "positive-bg": "rgba(22,163,74,0.08)",
      "negative": "#DC2626",
      "negative-bg": "rgba(220,38,38,0.08)"
    },
    "dark": {
      "surface": "rgba(255,255,255,0.035)",
      "surface-hover": "rgba(255,255,255,0.065)",
      "surface-active": "rgba(255,255,255,0.08)",
      "backdrop": "rgba(0,0,0,0.7)",
      "accent-bg": "rgba(161,98,7,0.14)",
      "border-hover": "rgba(255,255,255,0.15)",
      "text-dim": "#71717A",
      "text-ghost": "#52525B",
      "accent-text": "#D4A843",
      "bg-nav": "rgba(9,9,11,0.9)",
      "icon-bg": "rgba(255,255,255,0.06)",
      "icon-border": "rgba(255,255,255,0.08)",
      "positive": "#22C55E",
      "positive-bg": "rgba(34,197,94,0.12)",
      "negative": "#EF4444",
      "negative-bg": "rgba(239,68,68,0.12)"
    }
  },
  "shadow": {
    "light": {
      "shadow-sm": "0 1px 2px 0 hsl(0 0% 0% / 0.04)",
      "shadow-md": "0 4px 6px -1px hsl(0 0% 0% / 0.06)",
      "shadow-lg": "0 10px 15px -3px hsl(0 0% 0% / 0.06)",
      "shadow-xl": "0 20px 25px -5px hsl(0 0% 0% / 0.08)",
      "shadow-glow": "0 0 20px hsl(38 90% 33% / 0.08)",
      "prompt-shadow": "0 4px 24px rgba(0,0,0,0.12), 0 0 60px rgba(161,98,7,0.04)"
    },
    "dark": {
      "shadow-glow": "0 0 20px hsl(38 90% 33% / 0.12)",
      "prompt-shadow": "0 4px 30px rgba(255,255,255,0.15), 0 0 50px rgba(161,98,7,0.10)"
    }
  },
  "radius": {
    "radius": "0.75rem",
    "radius-sm": "0.5rem",
    "radius-lg": "1rem",
    "radius-xl": "1.5rem"
  },
  "radiusScale": {
    "sm": "8px",
    "md": "10px",
    "lg": "12px",
    "xl": "12px",
    "2xl": "16px",
    "3xl": "24px",
    "full": "9999px"
  },
  "transition": {
    "transition-smooth": "all 0.26s cubic-bezier(0.2, 0, 0, 1)",
    "transition-fast": "all 0.15s ease-out",
    "transition-reveal": "0.8s cubic-bezier(0.16, 1, 0.3, 1)"
  },
  "duration": {
    "fast": "150ms",
    "base": "200ms",
    "slow": "300ms",
    "reveal": "700ms"
  },
  "easing": {
    "expo-out": "cubic-bezier(0.16, 1, 0.3, 1)",
    "smooth": "cubic-bezier(0.2, 0, 0, 1)",
    "standard": "ease-out"
  },
  "zIndex": {
    "base": 0,
    "raised": 10,
    "sticky": 20,
    "dropdown": 30,
    "overlay": 40,
    "modal": 50,
    "toast": 60,
    "tooltip": 70,
    "max": 100
  },
  "font": {
    "family": {
      "sans": "'Inter', system-ui, -apple-system, sans-serif",
      "display": "'Playfair Display', Georgia, serif",
      "heading": "'Outfit', 'Inter', sans-serif",
      "numeric": "'DM Sans', 'Inter', sans-serif",
      "mono": "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace"
    },
    "role": {
      "display": "Playfair Display — só hero/landing ≥ 3rem",
      "heading": "Outfit — títulos de painel/seção, eyebrows",
      "numeric": "DM Sans — números, KPIs, títulos de card",
      "body": "Inter — corpo, labels, descrições (default)",
      "mono": "JetBrains Mono — código, IDs, valores técnicos"
    },
    "size": {
      "micro": [
        "10px",
        "14px"
      ],
      "caption": [
        "11px",
        "16px"
      ],
      "xs": [
        "12px",
        "16px"
      ],
      "dense": [
        "13px",
        "18px"
      ],
      "sm": [
        "14px",
        "20px"
      ],
      "base": [
        "16px",
        "24px"
      ],
      "lg": [
        "18px",
        "28px"
      ],
      "xl": [
        "20px",
        "28px"
      ],
      "2xl": [
        "24px",
        "32px"
      ],
      "3xl": [
        "30px",
        "36px"
      ],
      "4xl": [
        "36px",
        "40px"
      ],
      "5xl": [
        "48px",
        "1"
      ],
      "hero": [
        "56px",
        "1.05"
      ],
      "hero-lg": [
        "72px",
        "1.02"
      ]
    },
    "weight": {
      "normal": 400,
      "medium": 500,
      "semibold": 600,
      "bold": 700
    },
    "tracking": {
      "tight": "-0.025em",
      "normal": "0",
      "wide": "0.025em",
      "eyebrow": "0.14em"
    }
  },
  "spacing": {
    "hairline": "2px",
    "xs": "4px",
    "sm": "8px",
    "md": "12px",
    "lg": "16px",
    "xl": "20px",
    "2xl": "24px",
    "3xl": "32px",
    "4xl": "48px",
    "gutter-mobile": "16px",
    "panel-padding": "16px",
    "card-padding": "16px",
    "card-padding-compact": "12px",
    "section-gap": "24px"
  },
  "icon": {
    "xs": 12,
    "sm": 14,
    "md": 16,
    "lg": 20,
    "xl": 24,
    "stroke": 2
  },
  "touch": {
    "min": 44
  },
  "breakpoint": {
    "sm": "640px",
    "md": "768px",
    "lg": "1024px",
    "xl": "1280px",
    "2xl": "1536px"
  },
  "layout": {
    "container": "1200px",
    "reading": "680px",
    "form": "560px",
    "modal-sm": "384px",
    "modal-md": "512px",
    "modal-lg": "672px",
    "modal-xl": "896px"
  }
} as const;

/** Cores resolvidas em hex por tema (dark herda do light o que não redefine). */
export const hex = {
  "light": {
    "primary": "#18181B",
    "primary-foreground": "#FAFAFA",
    "primary-light": "#3F3F46",
    "primary-dark": "#0E0E10",
    "secondary": "#F4F3F1",
    "secondary-foreground": "#18181B",
    "accent": "#A16207",
    "accent-foreground": "#FFFFFF",
    "accent-light": "#D4A843",
    "background": "#FAF9F7",
    "foreground": "#1C1917",
    "card": "#F4F2EF",
    "card-foreground": "#18181B",
    "muted": "#EFEDEB",
    "muted-foreground": "#57534E",
    "border": "#E3E3E3",
    "input": "#F4F2F1",
    "ring": "#A06808",
    "destructive": "#DC2828",
    "destructive-foreground": "#FFFFFF",
    "warning": "#DB7706",
    "warning-foreground": "#FFFFFF",
    "success": "#16A249",
    "success-foreground": "#FFFFFF",
    "content": "#9234EA",
    "content-foreground": "#FFFFFF",
    "popover": "#F9F8F5",
    "popover-foreground": "#18181B",
    "sidebar-background": "#F2F0ED",
    "sidebar-foreground": "#18181B",
    "sidebar-primary": "#18181B",
    "sidebar-primary-foreground": "#FAFAFA",
    "sidebar-accent": "#A06808",
    "sidebar-accent-foreground": "#FFFFFF",
    "sidebar-border": "#E3E3E3",
    "sidebar-ring": "#A06808",
    "chart-1": "#A06808",
    "chart-2": "#D6A543",
    "chart-3": "#16A249",
    "chart-4": "#DB7706",
    "chart-5": "#9234EA",
    "chart-6": "#18181B"
  },
  "dark": {
    "primary": "#EFEFF1",
    "primary-foreground": "#09090B",
    "primary-light": "#FFFFFF",
    "primary-dark": "#C9C9CF",
    "secondary": "#1B1B1D",
    "secondary-foreground": "#EFEFF1",
    "accent": "#A16207",
    "accent-foreground": "#FFFFFF",
    "accent-light": "#D4A843",
    "background": "#09090B",
    "foreground": "#EDEDEF",
    "card": "#111113",
    "card-foreground": "#EFEFF1",
    "muted": "#1B1B1D",
    "muted-foreground": "#A1A1AA",
    "border": "#202022",
    "input": "#18181B",
    "ring": "#A06808",
    "destructive": "#EF4343",
    "destructive-foreground": "#FFFFFF",
    "warning": "#F59F0A",
    "warning-foreground": "#FFFFFF",
    "success": "#21C45D",
    "success-foreground": "#FFFFFF",
    "content": "#A855F7",
    "content-foreground": "#FFFFFF",
    "popover": "#111113",
    "popover-foreground": "#EFEFF1",
    "sidebar-background": "#09090C",
    "sidebar-foreground": "#EFEFF1",
    "sidebar-primary": "#EFEFF1",
    "sidebar-primary-foreground": "#09090B",
    "sidebar-accent": "#A06808",
    "sidebar-accent-foreground": "#FFFFFF",
    "sidebar-border": "#1B1B1D",
    "sidebar-ring": "#A06808",
    "chart-1": "#A06808",
    "chart-2": "#D6A543",
    "chart-3": "#21C45D",
    "chart-4": "#F59F0A",
    "chart-5": "#A855F7",
    "chart-6": "#EFEFF1"
  }
} as const;

export type ColorToken = keyof typeof tokens.color.light;
export type Theme = keyof typeof hex;

/** `hsl(var(--accent))` — para CSS gerado em runtime. */
export const cssVar = (name: string): string => `hsl(var(--${name}))`;

/** Cor em hex já resolvida. `color("accent")` → "#A16207". */
export const color = (name: ColorToken, theme: Theme = "light"): string => hex[theme][name];

/** Fontes por papel. `fontFamily.heading` → "'Outfit', 'Inter', sans-serif". */
export const fontFamily = tokens.font.family;

/** Tamanhos em px por nome (micro/caption/xs/dense/sm/base/lg/xl/2xl/3xl/4xl/5xl/hero/hero-lg). */
export const fontSizePx = Object.fromEntries(
  Object.entries(tokens.font.size).map(([k, v]) => [k, parseInt(String(v[0]), 10)]),
) as Record<keyof typeof tokens.font.size, number>;

export const zIndex = tokens.zIndex;
export const duration = tokens.duration;
export const radius = tokens.radiusScale;
