/**
 * Skeleton — placeholder pulsante que reserva o espaço do conteúdo que vai chegar.
 *
 * O que é: bloco `bg-muted/60` com `animate-pulse`, sem semântica (`aria-hidden`).
 * `SkeletonText` empilha N linhas (a última mais curta) para simular parágrafo.
 * Quando usar: primeira carga de LISTAS e CARDS, quando já se sabe o formato do
 * conteúdo. Para espera sem formato conhecido (geração de IA, painel inteiro)
 * use `LovarchSymbolLoader`; para ação curta em botão use `Spinner`.
 *
 * Uso:
 *   <Skeleton className="h-40 w-full rounded-xl" />
 *   <Skeleton className="size-9 rounded-full" />
 *   <SkeletonText lines={2} />
 */
import * as React from "react";
import { cn } from "../lib/cn";

/** Sem props próprias: a forma vem toda pelo `className`. */
export type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      aria-hidden
      className={cn("animate-pulse rounded-md bg-muted/60", className)}
      {...props}
    />
  )
);
Skeleton.displayName = "Skeleton";

export interface SkeletonTextProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Número de linhas. A última fica com 2/3 da largura. Default 3. */
  lines?: number;
}

const SkeletonText = React.forwardRef<HTMLDivElement, SkeletonTextProps>(
  ({ className, lines = 3, ...props }, ref) => {
    const count = Math.max(1, Math.floor(lines));
    return (
      <div
        ref={ref}
        aria-hidden
        className={cn("space-y-2", className)}
        {...props}
      >
        {Array.from({ length: count }, (_, i) => (
          <Skeleton
            key={i}
            className={cn("h-3", i === count - 1 ? "w-2/3" : "w-full")}
          />
        ))}
      </div>
    );
  }
);
SkeletonText.displayName = "SkeletonText";

export { Skeleton, SkeletonText };
