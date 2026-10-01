/**
 * IconButton — botão só-ícone que EXIGE um `label` acessível.
 *
 * O que é: `buttonVariants` nos tamanhos quadrados, com `label` obrigatório
 * (vira `aria-label` e `title`): um ícone sem nome é invisível para leitor de
 * tela e não tem tooltip no desktop. `type="button"` por default (não submete
 * formulário por acidente).
 * Quando usar: fechar, editar, apagar, copiar, mais opções. Em telas touch
 * prefira `size="lg"` (44px). Para ícone + texto use `Button`.
 *
 * Uso:
 *   <IconButton label={t("common.close")} onClick={onClose}><X /></IconButton>
 *   <IconButton label={t("common.delete")} variant="outline" size="lg"><Trash2 /></IconButton>
 */
import * as React from "react";
import { cn } from "../lib/cn";
import { buttonVariants } from "./button";
import { Spinner } from "./spinner";

const SIZE_TO_BUTTON = {
  sm: "icon-sm",
  md: "icon",
  lg: "icon-xl",
} as const;

export interface IconButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "children" | "aria-label"
  > {
  /** Nome da ação. Obrigatório: vira `aria-label` e `title`. */
  label: string;
  size?: keyof typeof SIZE_TO_BUTTON;
  variant?: "ghost" | "outline" | "accent" | "default";
  /** Troca o ícone pelo `Spinner`, desabilita e seta `aria-busy`. */
  loading?: boolean;
  /** O ícone (Lucide). */
  children: React.ReactNode;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      label,
      size = "md",
      variant = "ghost",
      loading = false,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => (
    <button
      ref={ref}
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(
        buttonVariants({ variant, size: SIZE_TO_BUTTON[size] }),
        className
      )}
      {...props}
    >
      {loading ? <Spinner size={size === "sm" ? 14 : 16} /> : children}
    </button>
  )
);
IconButton.displayName = "IconButton";

export { IconButton };
