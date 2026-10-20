/**
 * LevelBars — nível em barrinhas (1 de N), lido de relance.
 *
 * O que é: N barrinhas verticais; as `value` primeiras ficam preenchidas na cor do `tone`, as outras no tom
 * da borda. Não é progresso (para isso, `ProgressBar`): é uma escala fixa e curta — força de um modelo de IA
 * (1 econômico · 2 potente · 3 ótimo · 4 excelente), esforço (rápido · equilibrado · aprofundado), intensidade.
 * Quando usar: ao lado de um nome numa lista ou num botão, para comparar opções sem ler números.
 * Acessível: `role="img"` com `label` (ex.: "Força 2 de 4"); sem `label`, fica decorativo (aria-hidden).
 *
 * Uso:
 *   <LevelBars value={2} max={4} tone="neutral" label={t("ai.strength", { n: 2, max: 4 })} />
 *   <LevelBars value={3} max={3} tone="neutral" size="sm" />
 */
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const barVariants = cva("inline-block shrink-0 rounded-sm", {
  variants: {
    size: {
      sm: "h-2 w-1",
      md: "h-2.5 w-1.5",
    },
  },
  defaultVariants: { size: "md" },
});

const fillTone = {
  success: "bg-success",
  neutral: "bg-foreground/75",
  warning: "bg-warning",
  content: "bg-content",
  accent: "bg-accent",
} as const;

export type LevelBarsTone = keyof typeof fillTone;

export interface LevelBarsProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children">,
    VariantProps<typeof barVariants> {
  /** Quantas barras preenchidas (limitado a 0–max). */
  value: number;
  /** Total de barras (padrão 4). */
  max?: number;
  /** Cor das barras preenchidas. */
  tone?: LevelBarsTone;
  /** Texto para leitor de tela; sem ele as barras são decorativas. */
  label?: string;
}

const LevelBars = React.forwardRef<HTMLSpanElement, LevelBarsProps>(
  ({ className, value, max = 4, tone = "neutral", size, label, ...props }, ref) => {
    const total = Math.max(1, Math.round(max));
    const on = Number.isFinite(value) ? Math.min(total, Math.max(0, Math.round(value))) : 0;
    return (
      <span
        ref={ref}
        role={label ? "img" : undefined}
        aria-label={label}
        aria-hidden={label ? undefined : true}
        data-level={on}
        className={cn("inline-flex shrink-0 items-center gap-0.5", className)}
        {...props}
      >
        {Array.from({ length: total }, (_, i) => (
          <i key={i} className={cn(barVariants({ size }), i < on ? fillTone[tone] : "bg-border")} />
        ))}
      </span>
    );
  }
);
LevelBars.displayName = "LevelBars";

export { LevelBars, barVariants as levelBarVariants };
