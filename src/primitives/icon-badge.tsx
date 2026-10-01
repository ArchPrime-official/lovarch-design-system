/**
 * IconBadge — ícone dentro de uma caixa colorida (quadrado arredondado ou círculo).
 *
 * O que é: o padrão "ícone em caixa" das listas de features, cards de KPI,
 * cabeçalhos de seção e estados vazios. O tamanho do ícone é aplicado aqui
 * (`[&_svg]:size-*`), então passe o Lucide sem classe de tamanho.
 * Quando usar: sempre que um ícone precisa de peso visual próprio ao lado de
 * um texto. Para ícone solto em linha use o Lucide direto.
 *
 * Uso:
 *   <IconBadge><Sparkles /></IconBadge>
 *   <IconBadge size="lg" tone="success" shape="circle"><Check /></IconBadge>
 */
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const iconBadgeVariants = cva(
  "inline-flex shrink-0 items-center justify-center [&_svg]:shrink-0",
  {
    variants: {
      size: {
        sm: "size-7 rounded-lg [&_svg]:size-3.5",
        md: "size-10 rounded-xl [&_svg]:size-[18px]",
        lg: "size-14 rounded-2xl [&_svg]:size-6",
      },
      tone: {
        accent: "bg-accent/10 text-accent",
        muted: "bg-muted text-muted-foreground",
        success: "bg-success/10 text-success",
        warning: "bg-warning/10 text-warning",
        danger: "bg-destructive/10 text-destructive",
        content: "bg-content/10 text-content",
        solid: "bg-accent text-accent-foreground",
      },
      shape: {
        square: "",
        circle: "rounded-full",
      },
    },
    defaultVariants: {
      size: "md",
      tone: "accent",
      shape: "square",
    },
  }
);

export type IconBadgeTone = NonNullable<
  VariantProps<typeof iconBadgeVariants>["tone"]
>;

export interface IconBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof iconBadgeVariants> {
  /** O ícone (Lucide). O tamanho vem do `size` do badge. */
  children: React.ReactNode;
}

const IconBadge = React.forwardRef<HTMLSpanElement, IconBadgeProps>(
  ({ className, size, tone, shape, children, ...props }, ref) => (
    <span
      ref={ref}
      aria-hidden={props["aria-label"] ? undefined : true}
      className={cn(iconBadgeVariants({ size, tone, shape }), className)}
      {...props}
    >
      {children}
    </span>
  )
);
IconBadge.displayName = "IconBadge";

export { IconBadge, iconBadgeVariants };
