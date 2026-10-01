/**
 * Button — o botão do DS V8 (pílula, Inter semibold).
 *
 * O que é: superset da API do shadcn `Button` (mesmos `variant`/`size` + os
 * novos `accent`, `xl`, `icon-sm`, `icon-xl`) com `loading`, `leftIcon` e
 * `rightIcon`. `accent` (dourado) é o CTA principal; `default` (quase preto) é
 * a ação primária neutra; `outline`/`ghost` são secundárias.
 * Quando usar: qualquer ação. Só-ícone → `IconButton`. Filtro/seleção → `Chip`.
 * Com `asChild` (Slot) os filhos vão como estão e `loading`/`leftIcon`/
 * `rightIcon` são ignorados — o Slot aceita um único filho.
 *
 * Uso:
 *   <Button variant="accent" size="xl" leftIcon={<Sparkles />}>{t("cta.generate")}</Button>
 *   <Button variant="outline" loading={isPending}>{t("common.save")}</Button>
 *   <Button asChild variant="link"><a href="/docs">{t("common.learnMore")}</a></Button>
 */
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";
import { Spinner } from "./spinner";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-colors duration-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:opacity-90",
        accent: "bg-accent text-accent-foreground shadow-sm hover:bg-accent/90",
        outline:
          "border border-line bg-transparent text-foreground hover:border-line-strong hover:bg-muted/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-muted/50 hover:text-foreground",
        link: "text-accent underline-offset-4 hover:underline",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      size: {
        sm: "h-8 px-3 text-xs [&_svg]:size-3.5",
        default: "h-9 px-4 text-sm",
        lg: "h-10 px-6 text-sm",
        xl: "h-11 min-h-[44px] px-6 text-sm",
        icon: "h-9 w-9",
        "icon-sm": "h-8 w-8",
        "icon-xl": "h-11 w-11 min-h-[44px] min-w-[44px]",
      },
    },
    compoundVariants: [
      // `link` é texto puro: sem padding nem altura fixa.
      { variant: "link", className: "h-auto px-0" },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Renderiza o filho (ex.: `<a>`) com as classes do botão, via Radix Slot. */
  asChild?: boolean;
  /** Mostra o `Spinner` no lugar do ícone esquerdo, desabilita e seta `aria-busy`. */
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const spinnerSize = size === "sm" || size === "icon-sm" ? 14 : 16;

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <>
            {loading ? <Spinner size={spinnerSize} /> : leftIcon}
            {children}
            {rightIcon}
          </>
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
