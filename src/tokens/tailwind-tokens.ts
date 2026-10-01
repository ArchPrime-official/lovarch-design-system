/**
 * Lovarch Design System V8 — objetos do Tailwind derivados de tokens.json.
 * GERADO por scripts/build-tokens.mjs a partir de tokens.json (DS v0.6.0). NÃO EDITE À MÃO.
 * Consumido por tailwind-preset.ts. Classes resultantes: bg-accent, bg-surface, border-line,
 * text-micro/caption/dense, z-modal, duration-fast, tracking-eyebrow, max-w-layout-reading…
 */
export const tailwindTokens = {
  "colors": {
    "primary": {
      "DEFAULT": "hsl(var(--primary))",
      "foreground": "hsl(var(--primary-foreground))",
      "light": "hsl(var(--primary-light))",
      "dark": "hsl(var(--primary-dark))"
    },
    "secondary": {
      "DEFAULT": "hsl(var(--secondary))",
      "foreground": "hsl(var(--secondary-foreground))"
    },
    "accent": {
      "DEFAULT": "hsl(var(--accent))",
      "foreground": "hsl(var(--accent-foreground))",
      "light": "hsl(var(--accent-light))"
    },
    "background": "hsl(var(--background))",
    "foreground": "hsl(var(--foreground))",
    "card": {
      "DEFAULT": "hsl(var(--card))",
      "foreground": "hsl(var(--card-foreground))"
    },
    "muted": {
      "DEFAULT": "hsl(var(--muted))",
      "foreground": "hsl(var(--muted-foreground))"
    },
    "border": "hsl(var(--border))",
    "input": "hsl(var(--input))",
    "ring": "hsl(var(--ring))",
    "destructive": {
      "DEFAULT": "hsl(var(--destructive))",
      "foreground": "hsl(var(--destructive-foreground))"
    },
    "warning": {
      "DEFAULT": "hsl(var(--warning))",
      "foreground": "hsl(var(--warning-foreground))"
    },
    "success": {
      "DEFAULT": "hsl(var(--success))",
      "foreground": "hsl(var(--success-foreground))"
    },
    "content": {
      "DEFAULT": "hsl(var(--content))",
      "foreground": "hsl(var(--content-foreground))"
    },
    "popover": {
      "DEFAULT": "hsl(var(--popover))",
      "foreground": "hsl(var(--popover-foreground))"
    },
    "sidebar": {
      "DEFAULT": "hsl(var(--sidebar-background))",
      "foreground": "hsl(var(--sidebar-foreground))",
      "primary": "hsl(var(--sidebar-primary))",
      "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
      "accent": "hsl(var(--sidebar-accent))",
      "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
      "border": "hsl(var(--sidebar-border))",
      "ring": "hsl(var(--sidebar-ring))"
    },
    "chart": {
      "1": "hsl(var(--chart-1))",
      "2": "hsl(var(--chart-2))",
      "3": "hsl(var(--chart-3))",
      "4": "hsl(var(--chart-4))",
      "5": "hsl(var(--chart-5))",
      "6": "hsl(var(--chart-6))"
    },
    "surface": "var(--surface)",
    "surface-hover": "var(--surface-hover)",
    "surface-active": "var(--surface-active)",
    "backdrop": "var(--backdrop)",
    "line": "var(--line)",
    "line-soft": "var(--line-soft)",
    "line-strong": "var(--line-strong)",
    "gold": {
      "DEFAULT": "hsl(38 90% 33%)",
      "light": "hsl(40 64% 55%)",
      "dark": "hsl(24 83% 31%)"
    }
  },
  "fontSize": {
    "micro": [
      "10px",
      {
        "lineHeight": "14px"
      }
    ],
    "caption": [
      "11px",
      {
        "lineHeight": "16px"
      }
    ],
    "xs": [
      "12px",
      {
        "lineHeight": "16px"
      }
    ],
    "dense": [
      "13px",
      {
        "lineHeight": "18px"
      }
    ],
    "sm": [
      "14px",
      {
        "lineHeight": "20px"
      }
    ],
    "base": [
      "16px",
      {
        "lineHeight": "24px"
      }
    ],
    "lg": [
      "18px",
      {
        "lineHeight": "28px"
      }
    ],
    "xl": [
      "20px",
      {
        "lineHeight": "28px"
      }
    ],
    "2xl": [
      "24px",
      {
        "lineHeight": "32px"
      }
    ],
    "3xl": [
      "30px",
      {
        "lineHeight": "36px"
      }
    ],
    "4xl": [
      "36px",
      {
        "lineHeight": "40px"
      }
    ],
    "5xl": [
      "48px",
      {
        "lineHeight": "1"
      }
    ],
    "hero": [
      "56px",
      {
        "lineHeight": "1.05"
      }
    ],
    "hero-lg": [
      "72px",
      {
        "lineHeight": "1.02"
      }
    ]
  },
  "zIndex": {
    "base": "0",
    "raised": "10",
    "sticky": "20",
    "dropdown": "30",
    "overlay": "40",
    "modal": "50",
    "toast": "60",
    "tooltip": "70",
    "max": "100"
  },
  "transitionDuration": {
    "fast": "150ms",
    "base": "200ms",
    "slow": "300ms",
    "reveal": "700ms"
  },
  "transitionTimingFunction": {
    "expo-out": "cubic-bezier(0.16, 1, 0.3, 1)",
    "smooth": "cubic-bezier(0.2, 0, 0, 1)",
    "standard": "ease-out"
  },
  "letterSpacing": {
    "eyebrow": "0.14em"
  },
  "fontFamily": {
    "sans": [
      "Inter",
      "sans-serif"
    ],
    "inter": [
      "Inter",
      "sans-serif"
    ],
    "playfair": [
      "Playfair Display",
      "serif"
    ],
    "dm-sans": [
      "DM Sans",
      "sans-serif"
    ],
    "outfit": [
      "Outfit",
      "sans-serif"
    ],
    "mono": [
      "JetBrains Mono",
      "Source Code Pro",
      "Fira Code",
      "monospace"
    ]
  },
  "boxShadow": {
    "sm": "var(--shadow-sm)",
    "md": "var(--shadow-md)",
    "lg": "var(--shadow-lg)",
    "xl": "var(--shadow-xl)",
    "glow": "var(--shadow-glow)"
  },
  "borderRadius": {
    "lg": "var(--radius)",
    "md": "calc(var(--radius) - 2px)",
    "sm": "calc(var(--radius) - 4px)"
  },
  "maxWidth": {
    "layout-container": "1200px",
    "layout-reading": "680px",
    "layout-form": "560px",
    "layout-modal-sm": "384px",
    "layout-modal-md": "512px",
    "layout-modal-lg": "672px",
    "layout-modal-xl": "896px"
  }
} as const;
