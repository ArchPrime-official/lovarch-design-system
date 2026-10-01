/**
 * Divider — linha separadora horizontal ou vertical, com rótulo opcional.
 *
 * O que é: um `role="separator"` com a borda do token escolhido. Com `label`,
 * o texto fica centrado em eyebrow (10px, uppercase) e as linhas dos dois lados.
 * Quando usar: separar grupos dentro de um card/painel, "ou" entre opções de
 * login, cortar seções de um formulário. Para separar itens de LISTA prefira
 * `divide-y divide-line-soft` no container.
 *
 * Uso:
 *   <Divider />
 *   <Divider label={t("auth.or")} tone="default" />
 *   <Divider orientation="vertical" className="h-6" />
 */
import * as React from "react";
import { cn } from "../lib/cn";

const TONE = {
  soft: "border-line-soft",
  default: "border-line",
  strong: "border-line-strong",
} as const;

export interface DividerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  orientation?: "horizontal" | "vertical";
  /** Só no horizontal. Texto centrado entre as duas linhas. */
  label?: React.ReactNode;
  tone?: keyof typeof TONE;
}

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  (
    { className, orientation = "horizontal", label, tone = "soft", ...props },
    ref
  ) => {
    const line = TONE[tone];

    if (orientation === "vertical") {
      return (
        <div
          ref={ref}
          role="separator"
          aria-orientation="vertical"
          className={cn("self-stretch border-l", line, className)}
          {...props}
        />
      );
    }

    if (label == null) {
      return (
        <div
          ref={ref}
          role="separator"
          className={cn("w-full border-t", line, className)}
          {...props}
        />
      );
    }

    return (
      <div
        ref={ref}
        role="separator"
        className={cn("flex w-full items-center gap-3", className)}
        {...props}
      >
        <span aria-hidden className={cn("flex-1 border-t", line)} />
        <span className="shrink-0 text-micro font-medium uppercase tracking-eyebrow text-muted-foreground">
          {label}
        </span>
        <span aria-hidden className={cn("flex-1 border-t", line)} />
      </div>
    );
  }
);
Divider.displayName = "Divider";

export { Divider };
