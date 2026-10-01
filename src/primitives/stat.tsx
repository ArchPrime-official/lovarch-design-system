/**
 * Stat + StatGrid — card de KPI (rótulo, número grande, variação, dica).
 *
 * O que é: card `bg-surface` com o rótulo em 11px, o valor em DM Sans bold
 * tabular, um `delta` opcional (seta + cor semântica) e uma `hint` abaixo.
 * `StatGrid` é a grade responsiva padrão para alinhar vários (2 col no mobile).
 * Quando usar: dashboards, cabeçalho de painéis (créditos, leads, gerações),
 * resultado de simulações. Para séries temporais use `charts`.
 *
 * Uso:
 *   <StatGrid columns={4}>
 *     <Stat label={t("kpi.leads")} value={128} icon={<Users />}
 *       delta={{ value: "+12%", direction: "up" }} hint={t("kpi.vsLastMonth")} />
 *   </StatGrid>
 */
import * as React from "react";
import { Minus, TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "../lib/cn";
import { IconBadge, type IconBadgeTone } from "./icon-badge";

export interface StatDelta {
  value: React.ReactNode;
  direction: "up" | "down" | "flat";
}

const DELTA = {
  up: { Icon: TrendingUp, className: "text-success" },
  down: { Icon: TrendingDown, className: "text-destructive" },
  flat: { Icon: Minus, className: "text-muted-foreground" },
} as const;

export interface StatProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  label: React.ReactNode;
  value: React.ReactNode;
  /** Linha pequena abaixo do valor (contexto, período, unidade). */
  hint?: React.ReactNode;
  /** Ícone (Lucide) no canto superior direito, dentro de um `IconBadge` sm. */
  icon?: React.ReactNode;
  /** Tom do `IconBadge`. */
  tone?: IconBadgeTone;
  /** Variação com seta: up = success, down = destructive, flat = muted. */
  delta?: StatDelta;
  size?: "sm" | "md";
}

const Stat = React.forwardRef<HTMLDivElement, StatProps>(
  (
    { className, label, value, hint, icon, tone, delta, size = "md", ...props },
    ref
  ) => {
    const d = delta ? DELTA[delta.direction] : null;
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col gap-1.5 rounded-xl border border-line bg-surface",
          size === "sm" ? "p-3" : "p-4",
          className
        )}
        {...props}
      >
        <div className="flex items-start justify-between gap-2">
          <span className="text-caption font-medium text-muted-foreground">
            {label}
          </span>
          {icon != null && (
            <IconBadge size="sm" tone={tone}>
              {icon}
            </IconBadge>
          )}
        </div>
        <div
          className={cn(
            "font-dm-sans font-bold leading-tight tabular-nums text-foreground",
            size === "sm" ? "text-xl" : "text-2xl"
          )}
        >
          {value}
        </div>
        {(d || hint != null) && (
          <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-caption">
            {d && delta && (
              <span
                className={cn(
                  "inline-flex items-center gap-0.5 font-dm-sans font-medium tabular-nums",
                  d.className
                )}
              >
                <d.Icon aria-hidden className="size-3 shrink-0" />
                {delta.value}
              </span>
            )}
            {hint != null && (
              <span className="text-muted-foreground">{hint}</span>
            )}
          </div>
        )}
      </div>
    );
  }
);
Stat.displayName = "Stat";

const GRID_COLUMNS = {
  2: "grid-cols-2",
  3: "grid-cols-2 sm:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
  6: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6",
} as const;

export interface StatGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Colunas no breakpoint `lg`. Mobile é sempre 2; `sm` é 3 (salvo `columns={2}`). */
  columns?: keyof typeof GRID_COLUMNS;
}

const StatGrid = React.forwardRef<HTMLDivElement, StatGridProps>(
  ({ className, columns = 4, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("grid gap-2", GRID_COLUMNS[columns], className)}
      {...props}
    />
  )
);
StatGrid.displayName = "StatGrid";

export { Stat, StatGrid };
