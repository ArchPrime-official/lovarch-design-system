/**
 * Lovarch Design System V8 — Tailwind preset
 *
 * Consumer apps: `presets: [lovarchPreset]` em tailwind.config.ts e
 * "./squads/lovarch-design-system/src/**\/*.{ts,tsx}" em `content`.
 *
 * Tudo que é valor (cores, tamanhos, z-index, durações…) vem de
 * src/tokens/tailwind-tokens.ts, GERADO de tokens.json. Aqui ficam só
 * container, keyframes e animações.
 */
import type { Config } from "tailwindcss";
import { tailwindTokens } from "./src/tokens/tailwind-tokens";

const preset: Partial<Config> = {
  darkMode: ["class"],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: { "2xl": "1200px" },
    },
    extend: {
      ...(tailwindTokens as unknown as NonNullable<Config["theme"]>["extend"]),
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "glow-drift": {
          "0%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(25px, -18px)" },
          "100%": { transform: "translate(-18px, 25px)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        "scroll-reveal": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.4s ease-out",
        "fade-in-up": "fade-in-up 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        "glow-drift": "glow-drift 25s ease-in-out infinite alternate",
        "glow-pulse": "glow-pulse 4s ease-in-out infinite",
        "scroll-reveal": "scroll-reveal 0.8s cubic-bezier(0.16,1,0.3,1) both",
      },
    },
  },
};

export default preset;
