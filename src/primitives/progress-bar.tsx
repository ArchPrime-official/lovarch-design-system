/**
 * ProgressBar — trilho + preenchimento proporcional (0–100).
 *
 * O que é: barra determinada, com linha opcional acima (rótulo à esquerda,
 * valor à direita em DM Sans tabular). Anima a largura em `duration-slow`.
 * Quando usar: créditos usados no mês, progresso de um curso, etapas de um
 * wizard, upload. Para espera indeterminada use `Spinner`/`LovarchSymbolLoader`.
 *
 * Uso:
 *   <ProgressBar value={62} />
 *   <ProgressBar value={used / limit * 100} tone="warning"
 *     label={t("credits.used")} valueLabel={`${used} / ${limit}`} />
 */
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const trackVariants = cva("w-full overflow-hidden rounded-full bg-muted", {
  variants: {
    size: {
      sm: "h-1",
      md: "h-1.5",
      lg: "h-2.5",
    },
  },
  defaultVariants: { size: "md" },
});

const fillVariants = cva(
  "h-full rounded-full transition-[width] duration-slow ease-out",
  {
    variants: {
      tone: {
        accent: "bg-accent",
        success: "bg-success",
        warning: "bg-warning",
        danger: "bg-destructive",
        foreground: "bg-foreground",
      },
    },
    defaultVariants: { tone: "accent" },
  }
);

export interface ProgressBarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof trackVariants>,
    VariantProps<typeof fillVariants> {
  /** 0–100. Valores fora do intervalo são limitados. */
  value: number;
  /** Rótulo à esquerda, acima do trilho. Se for string, vira o `aria-label`. */
  label?: React.ReactNode;
  /** Valor à direita, acima do trilho (ex.: "62%", "1.200 / 2.000"). */
  valueLabel?: React.ReactNode;
  /** `aria-label` explícito (obrigatório quando `label` não é string). */
  ariaLabel?: string;
}

const clamp = (n: number) =>
  Number.isFinite(n) ? Math.min(100, Math.max(0, n)) : 0;

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    { className, value, size, tone, label, valueLabel, ariaLabel, ...props },
    ref
  ) => {
    const pct = clamp(value);
    const a11yLabel =
      ariaLabel ?? (typeof label === "string" ? label : undefined);
    const hasHeader = label != null || valueLabel != null;

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        {hasHeader && (
          <div className="mb-1.5 flex items-baseline justify-between gap-3">
            <span className="text-xs text-muted-foreground">{label}</span>
            {valueLabel != null && (
              <span className="font-dm-sans text-xs font-medium tabular-nums text-foreground">
                {valueLabel}
              </span>
            )}
          </div>
        )}
        <div
          role="progressbar"
          aria-label={a11yLabel}
          aria-valuenow={Math.round(pct)}
          aria-valuemin={0}
          aria-valuemax={100}
          className={trackVariants({ size })}
        >
          <div className={fillVariants({ tone })} style={{ width: `${pct}%` }} />
        </div>
      </div>
    );
  }
);
ProgressBar.displayName = "ProgressBar";

export { ProgressBar, trackVariants as progressTrackVariants, fillVariants as progressFillVariants };
