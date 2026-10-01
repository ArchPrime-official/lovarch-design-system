/**
 * EmptyState / ErrorState — o "nada aqui ainda" e o "deu errado, tente de novo".
 *
 * O que é: bloco centrado com moldura tracejada, ícone em `IconBadge`, título,
 * descrição curta e até duas ações. `ErrorState` é a mesma anatomia em tom
 * `danger`, com `role="alert"` e ícone default `AlertTriangle`.
 * Quando usar: no lugar da lista/grade/tabela quando ela está vazia ou falhou
 * ao carregar. Nunca como toast, nunca para erro de campo (use `FieldError`).
 *
 * Uso:
 *   <EmptyState icon={<Inbox />} title={t("crm.empty.title")} description={t("crm.empty.body")}
 *     action={<Button variant="accent" onClick={create}>{t("crm.new")}</Button>} />
 *   <ErrorState title={t("errors.loadFailed")}
 *     retryAction={<Button variant="outline" onClick={refetch}>{t("common.retry")}</Button>} />
 */
import * as React from "react";
import { AlertTriangle } from "lucide-react";
import { cn } from "../lib/cn";
import { IconBadge } from "./icon-badge";

export type StateSize = "full" | "compact";

const frameClasses =
  "flex flex-col items-center gap-3 rounded-xl border border-dashed border-line bg-surface text-center";

const sizeClasses: Record<StateSize, string> = {
  full: "px-6 py-14",
  compact: "px-4 py-8",
};

/* ---------------------------------------------------------- base interna */

interface StateFrameProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  badge: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  primary?: React.ReactNode;
  secondary?: React.ReactNode;
  size: StateSize;
}

const StateFrame = React.forwardRef<HTMLDivElement, StateFrameProps>(
  ({ badge, title, description, primary, secondary, size, className, ...props }, ref) => (
    <div ref={ref} className={cn(frameClasses, sizeClasses[size], className)} {...props}>
      {badge}
      <div className="flex flex-col items-center gap-1">
        <p
          className={cn(
            "font-outfit font-semibold text-foreground",
            size === "compact" ? "text-sm" : "text-base"
          )}
        >
          {title}
        </p>
        {description && <p className="max-w-sm text-sm text-muted-foreground">{description}</p>}
      </div>
      {(primary || secondary) && (
        <div className="mt-1 flex w-full flex-col items-center gap-2 sm:w-auto sm:flex-row">
          {primary}
          {secondary}
        </div>
      )}
    </div>
  )
);
StateFrame.displayName = "StateFrame";

/* --------------------------------------------------------------- EmptyState */

export interface EmptyStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Ícone Lucide (sem classe de tamanho — o `IconBadge` dimensiona). */
  icon: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Ação principal — normalmente `<Button variant="accent">`. */
  action?: React.ReactNode;
  /** Ação secundária — normalmente `<Button variant="ghost">`. */
  secondaryAction?: React.ReactNode;
  /** `full` (default) para o painel inteiro; `compact` dentro de card/aba. */
  size?: StateSize;
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ icon, title, description, action, secondaryAction, size = "full", ...props }, ref) => (
    <StateFrame
      ref={ref}
      size={size}
      badge={
        <IconBadge size={size === "compact" ? "md" : "lg"} tone="accent">
          {icon}
        </IconBadge>
      }
      title={title}
      description={description}
      primary={action}
      secondary={secondaryAction}
      {...props}
    />
  )
);
EmptyState.displayName = "EmptyState";

/* --------------------------------------------------------------- ErrorState */

export interface ErrorStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Ícone Lucide; default `AlertTriangle`. */
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Ação de tentar de novo — normalmente `<Button variant="outline">`. */
  retryAction?: React.ReactNode;
  secondaryAction?: React.ReactNode;
  size?: StateSize;
}

const ErrorState = React.forwardRef<HTMLDivElement, ErrorStateProps>(
  ({ icon, title, description, retryAction, secondaryAction, size = "full", ...props }, ref) => (
    <StateFrame
      ref={ref}
      role="alert"
      size={size}
      badge={
        <IconBadge size={size === "compact" ? "md" : "lg"} tone="danger">
          {icon ?? <AlertTriangle />}
        </IconBadge>
      }
      title={title}
      description={description}
      primary={retryAction}
      secondary={secondaryAction}
      {...props}
    />
  )
);
ErrorState.displayName = "ErrorState";

export { EmptyState, ErrorState };
