/**
 * Card — Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter.
 *
 * O que é: a superfície de agrupamento do DS V8. Mesmos nomes e classes
 * internas do `card.tsx` do shadcn (re-export compatível), mais `variant`
 * (card/surface/glass/selected/ghost), `padding` e `interactive`.
 * Quando usar: agrupar conteúdo relacionado com borda. Sub-componentes já têm
 * padding (`p-5`) — por isso `padding` default é `none`; use `padding="md"`
 * quando o conteúdo é cru (sem CardHeader/CardContent).
 *
 * Uso:
 *   <Card><CardHeader><CardTitle>{t("kpi.title")}</CardTitle></CardHeader><CardContent>…</CardContent></Card>
 *   <Card variant="surface" padding="md" interactive onClick={open}>…</Card>
 *   <Card variant={selected ? "selected" : "card"} padding="sm">…</Card>
 */
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const cardVariants = cva("", {
  variants: {
    variant: {
      card: "rounded-xl border border-line bg-card text-card-foreground",
      surface: "rounded-xl border border-line bg-surface",
      glass: "rounded-xl border border-line bg-card/80 backdrop-blur-md",
      selected: "rounded-xl border border-accent/30 bg-accent/5",
      ghost: "",
    },
    padding: {
      none: "",
      sm: "p-3",
      md: "p-4",
      lg: "p-5",
    },
    interactive: {
      true: "cursor-pointer ring-offset-background transition-[border-color,box-shadow] duration-base hover:border-line-strong hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      false: "",
    },
  },
  defaultVariants: { variant: "card", padding: "none", interactive: false },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  /** Tag renderizada (ex.: `article`, `li`, `button`). */
  as?: React.ElementType;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ as, variant, padding, interactive, className, ...props }, ref) => {
    const Tag: React.ElementType = as ?? "div";
    return (
      <Tag
        ref={ref}
        className={cn(cardVariants({ variant, padding, interactive }), className)}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-5", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("font-dm-sans text-lg font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  )
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("p-5 pt-0", className)} {...props} />
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-5 pt-0", className)} {...props} />
  )
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, cardVariants };
