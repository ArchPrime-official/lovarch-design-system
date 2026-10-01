/**
 * Badge — rótulo ESTÁTICO de status (não clicável).
 *
 * O que é: um `<span>` em pílula que carrega um estado ("Attivo", "Beta",
 * "In revisione") com tom semântico. O tamanho `sm` é o look do Badge atual
 * (10px, uppercase, eyebrow); `md` é o rótulo "normal" de 11px.
 * Quando usar: status de item em lista/card, contadores, marcadores de tipo.
 * Para algo que o usuário CLICA (filtro, seleção) use `Chip`.
 *
 * Uso:
 *   <Badge tone="success" dot>{t("status.active")}</Badge>
 *   <Badge tone="content" size="md">{t("content.type.reel")}</Badge>
 */
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const badgeVariants = cva(
  "inline-flex items-center gap-1 whitespace-nowrap rounded-full",
  {
    variants: {
      tone: {
        neutral: "bg-muted text-muted-foreground",
        accent: "bg-accent/10 text-accent",
        success: "bg-success/10 text-success",
        warning: "bg-warning/10 text-warning",
        danger: "bg-destructive/10 text-destructive",
        content: "bg-content/10 text-content",
        outline: "border border-line text-foreground",
        solid: "bg-primary text-primary-foreground",
      },
      size: {
        sm: "px-2 py-0.5 text-micro font-semibold uppercase tracking-eyebrow",
        md: "px-2.5 py-0.5 text-caption font-medium normal-case",
      },
    },
    defaultVariants: {
      tone: "neutral",
      size: "sm",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /** Bolinha de status à esquerda, na cor do texto. */
  dot?: boolean;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, tone, size, dot = false, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(badgeVariants({ tone, size }), className)}
      {...props}
    >
      {dot && (
        <span
          aria-hidden
          className="size-1.5 shrink-0 rounded-full bg-current"
        />
      )}
      {children}
    </span>
  )
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };
