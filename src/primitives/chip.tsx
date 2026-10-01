/**
 * Chip — pílula INTERATIVA: filtro, chip de módulo, opção de quiz/fluxo guiado.
 *
 * O que é: `<button type="button">` (ou `<span>` com `as="span"`) em pílula,
 * com estado `selected` (dourado sólido) e tom `suggested` (sugestão de IA:
 * dourado translúcido + `Sparkles`). `onRemove` adiciona o X à direita e exige
 * `removeLabel` (texto acessível vindo do i18n).
 * Quando usar: qualquer lista de opções clicáveis em linha. Status estático
 * (não clicável) → `Badge`. Ação principal → `Button`.
 *
 * Uso:
 *   <Chip selected={active === id} onClick={() => setActive(id)} icon={<Film />}>{label}</Chip>
 *   <Chip suggested size="lg">{suggestion}</Chip>
 *   <Chip onRemove={clear} removeLabel={t("common.remove")}>{tag}</Chip>
 */
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Sparkles, X } from "lucide-react";
import { cn } from "../lib/cn";

const chipVariants = cva(
  "inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border font-medium transition-all duration-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 active:scale-[0.97]",
  {
    variants: {
      size: {
        sm: "min-h-[28px] px-2.5 py-1 text-caption",
        md: "min-h-[36px] px-3 py-1.5 text-xs",
        lg: "min-h-[44px] px-3 py-2 text-xs",
      },
      selected: {
        true: "border-transparent bg-accent text-accent-foreground shadow-sm hover:bg-accent/90",
        false: "border-transparent bg-muted/40 text-foreground/80 hover:bg-muted/70",
      },
      suggested: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        selected: false,
        suggested: true,
        className: "border-accent/20 bg-accent/5 text-accent hover:bg-accent/10",
      },
    ],
    defaultVariants: {
      size: "md",
      selected: false,
      suggested: false,
    },
  }
);

export interface ChipProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "children">,
    Omit<VariantProps<typeof chipVariants>, "selected" | "suggested"> {
  /** `button` (default) é clicável; `span` é só visual (ex.: tag dentro de um input). */
  as?: "button" | "span";
  selected?: boolean;
  /** Tom de sugestão de IA. Mostra `Sparkles` se não houver `icon`. */
  suggested?: boolean;
  /** Ícone à esquerda (Lucide). É dimensionado em 14px aqui. */
  icon?: React.ReactNode;
  /** Mostra o X à direita. Exige `removeLabel`. */
  onRemove?: () => void;
  /** Texto acessível do X (i18n). */
  removeLabel?: string;
  disabled?: boolean;
  children: React.ReactNode;
}

const Chip = React.forwardRef<HTMLElement, ChipProps>(
  (
    {
      as = "button",
      size,
      selected,
      suggested = false,
      icon,
      onRemove,
      removeLabel,
      disabled = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    if (onRemove && !removeLabel) {
      console.warn("[lovarch-ds] Chip: `onRemove` exige `removeLabel` (texto acessível do X).");
    }
    const isSelected = Boolean(selected);
    const classes = cn(
      chipVariants({ size, selected: isSelected, suggested }),
      className
    );
    const leading =
      icon != null ? (
        <span aria-hidden className="inline-flex shrink-0 [&>svg]:size-3.5">{icon}</span>
      ) : suggested ? (
        <Sparkles aria-hidden className="size-3 shrink-0" />
      ) : null;

    const handleRemove = (e: React.SyntheticEvent) => {
      e.stopPropagation();
      e.preventDefault();
      if (!disabled) onRemove?.();
    };

    // O X é `role="button"` (não `<button>`): um botão dentro de outro é HTML inválido.
    const trailing = onRemove ? (
      <span
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label={removeLabel}
        onClick={handleRemove}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleRemove(e);
        }}
        className="-mr-1 inline-flex size-5 shrink-0 items-center justify-center rounded-full opacity-70 transition-opacity duration-fast hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <X aria-hidden className="size-3.5" />
      </span>
    ) : null;

    if (as === "span") {
      return (
        <span
          ref={ref as React.Ref<HTMLSpanElement>}
          aria-disabled={disabled || undefined}
          className={classes}
          {...props}
        >
          {leading}
          {children}
          {trailing}
        </span>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        disabled={disabled}
        aria-pressed={selected === undefined ? undefined : isSelected}
        className={classes}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {leading}
        {children}
        {trailing}
      </button>
    );
  }
);
Chip.displayName = "Chip";

export { Chip, chipVariants };
