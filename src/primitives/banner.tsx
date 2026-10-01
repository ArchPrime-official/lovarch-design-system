/**
 * Banner — aviso persistente no topo do painel (não é toast).
 *
 * O que é: barra com ícone, título opcional, texto, uma ação à direita e um X
 * para dispensar. Fica na tela até o usuário agir ou a condição sumir.
 * Quando usar: limite de créditos, conta em trial, integração desconectada,
 * novidade do módulo. Para feedback efêmero de uma ação use toast; para erro
 * de carregamento use `ErrorState`.
 *
 * Uso:
 *   <Banner tone="warning" title={t("credits.low.title")} action={<Button size="sm">{t("credits.buy")}</Button>}
 *     onDismiss={hide} dismissLabel={t("common.dismiss")}>
 *     {t("credits.low.body")}
 *   </Banner>
 */
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { AlertTriangle, CheckCircle2, Info, Sparkles, X } from "lucide-react";
import { cn } from "../lib/cn";

const bannerVariants = cva("flex items-start gap-3 rounded-xl border px-3 py-2.5 text-sm text-foreground", {
  variants: {
    tone: {
      neutral: "border-line bg-muted/40",
      accent: "border-accent/20 bg-accent/10",
      success: "border-success/30 bg-success/10",
      warning: "border-warning/30 bg-warning/10",
      danger: "border-destructive/30 bg-destructive/10",
    },
  },
  defaultVariants: { tone: "neutral" },
});

export type BannerTone = NonNullable<VariantProps<typeof bannerVariants>["tone"]>;

const toneIcon: Record<BannerTone, React.ComponentType<{ className?: string }>> = {
  neutral: Info,
  accent: Sparkles,
  success: CheckCircle2,
  warning: AlertTriangle,
  danger: AlertTriangle,
};

const toneIconClass: Record<BannerTone, string> = {
  neutral: "text-muted-foreground",
  accent: "text-accent",
  success: "text-success",
  warning: "text-warning",
  danger: "text-destructive",
};

export interface BannerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "role">,
    VariantProps<typeof bannerVariants> {
  /** Substitui o ícone default do tom. */
  icon?: React.ReactNode;
  title?: React.ReactNode;
  /** Slot à direita (botão pequeno, link). */
  action?: React.ReactNode;
  /** Mostra o X. Exige `dismissLabel` (aria-label do botão). */
  onDismiss?: () => void;
  dismissLabel?: string;
  /** Default `status`; `danger` vira `alert` automaticamente. */
  role?: "status" | "alert";
}

const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  (
    { tone = "neutral", icon, title, action, onDismiss, dismissLabel, role, className, children, ...props },
    ref
  ) => {
    const resolvedTone: BannerTone = tone ?? "neutral";
    const DefaultIcon = toneIcon[resolvedTone];

    React.useEffect(() => {
      if (onDismiss && !dismissLabel) {
        console.warn("[lovarch-ds] Banner: `onDismiss` sem `dismissLabel` — o botão X fica sem aria-label.");
      }
    }, [onDismiss, dismissLabel]);

    return (
      <div
        ref={ref}
        role={role ?? (resolvedTone === "danger" ? "alert" : "status")}
        className={cn(bannerVariants({ tone: resolvedTone }), className)}
        {...props}
      >
        <span className={cn("mt-0.5 shrink-0 [&_svg]:size-4", toneIconClass[resolvedTone])} aria-hidden>
          {icon ?? <DefaultIcon className="size-4" />}
        </span>

        <div className="min-w-0 flex-1">
          {title && <p className="font-semibold">{title}</p>}
          {children && <div className={cn(title && "mt-0.5")}>{children}</div>}
        </div>

        {action && <div className="flex shrink-0 items-center self-center">{action}</div>}

        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            aria-label={dismissLabel}
            className="-my-1 -mr-1 inline-flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground ring-offset-background transition-colors duration-fast hover:bg-muted/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <X className="size-4" />
          </button>
        )}
      </div>
    );
  }
);
Banner.displayName = "Banner";

export { Banner, bannerVariants };
