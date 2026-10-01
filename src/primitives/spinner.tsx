/**
 * Spinner — indicador de carregamento INLINE (símbolo Lovarch pulsando).
 *
 * O que é: o símbolo neural estático (`LovarchSymbol`) com `animate-pulse`, no
 * tamanho do texto ao redor. Não é um arco girando: o DS V8 proíbe spinners
 * rotativos e o ícone de loader do Lucide.
 * Quando usar: dentro de botões, chips, linhas de lista ou ao lado de um texto
 * enquanto uma ação CURTA roda. Para painel/página inteira use o
 * `LovarchSymbolLoader` de `../feedback`.
 *
 * Uso:
 *   <Spinner />
 *   <Spinner size={20} label={t("common.loading")} />
 */
import * as React from "react";
import { LovarchSymbol } from "../brand/LovarchSymbol";
import { cn } from "../lib/cn";

export interface SpinnerProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  /** Lado do símbolo em px. Default 16 (casa com `[&_svg]:size-4` do Button). */
  size?: 14 | 16 | 20 | 24;
  /** Texto de acessibilidade. Sem ele o spinner é decorativo (`aria-hidden`). */
  label?: string;
}

const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ size = 16, label, className, ...props }, ref) => (
    <span
      ref={ref}
      role="status"
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className="inline-flex shrink-0 items-center justify-center leading-none"
      {...props}
    >
      <LovarchSymbol
        size={size}
        className={cn("animate-pulse text-current", className)}
      />
    </span>
  )
);
Spinner.displayName = "Spinner";

export { Spinner };
