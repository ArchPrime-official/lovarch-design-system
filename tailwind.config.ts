/**
 * Tailwind config for Storybook only.
 *
 * Consumers do NOT use this file — they add `tailwind-preset.ts` to their own
 * config. This exists so Storybook can compile the same utility classes the
 * components expect, from the same preset, with no second source of truth.
 */
import type { Config } from "tailwindcss";
import preset from "./tailwind-preset";

export default {
  presets: [preset as Config],
  content: ["./src/**/*.{ts,tsx}", "./.storybook/**/*.{ts,tsx}"],
} satisfies Config;
