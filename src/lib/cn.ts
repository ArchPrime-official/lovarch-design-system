import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";
import { fontSizePx } from "../tokens/tokens";

/**
 * Nomes da escala tipográfica do DS (micro, caption, dense, hero…). O tailwind-merge padrão não os
 * conhece e lia `text-caption` como COR de texto: ao lado de `text-muted-foreground` ou
 * `text-accent-foreground` o tamanho era DESCARTADO, e o Chip pequeno, o Badge, o Eyebrow, a dica e
 * o erro do Field saíam com a fonte herdada (16 px) desde a v0.6.0. Medido em 11/10/2026.
 */
export const DS_FONT_SIZES = Object.keys(fontSizePx);

/** tailwind-merge que sabe que `text-<escala do DS>` é TAMANHO, não cor. */
export const twMergeDs = extendTailwindMerge({
  extend: { classGroups: { "font-size": [{ text: DS_FONT_SIZES }] } },
});

export function cn(...inputs: ClassValue[]) {
  return twMergeDs(clsx(inputs));
}
