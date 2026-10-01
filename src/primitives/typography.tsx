/**
 * Typography — Heading, Text, Eyebrow, PanelTitle, SectionLabel, Kpi, Mono.
 *
 * O que é: os primitivos de texto do DS V8. Cada um encapsula a escolha de
 * fonte (Outfit para títulos, Playfair só em hero, DM Sans em números, Inter
 * no corpo) — substituem os `style={{ fontFamily }}` inline espalhados no app.
 * Quando usar: todo texto com papel semântico. Título de painel → `PanelTitle`;
 * título de bloco dentro do painel → `SectionLabel`; número de KPI → `Kpi`;
 * rótulo pequeno em caixa alta → `Eyebrow`; corpo/legenda → `Text`.
 *
 * Uso:
 *   <PanelTitle title={t("crm.title")} description={t("crm.subtitle")} icon={<Users />} />
 *   <Heading level={1} display size="hero">{t("landing.hero")}</Heading>
 *   <Text tone="muted">{t("common.hint")}</Text>
 *   <Kpi tone="success" suffix="%">42</Kpi>
 */
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";
import { IconBadge } from "./icon-badge";

/* ------------------------------------------------------------------ Heading */

export type HeadingLevel = 1 | 2 | 3 | 4;

const headingSizes = {
  hero: "text-hero",
  "hero-lg": "text-hero-lg",
  "4xl": "text-4xl",
  "3xl": "text-3xl",
  "2xl": "text-2xl",
  xl: "text-xl",
  lg: "text-lg",
  base: "text-base",
} as const;

export type HeadingSize = keyof typeof headingSizes;

const headingLevelSizes: Record<HeadingLevel, string> = {
  1: "text-2xl sm:text-3xl",
  2: "text-xl sm:text-2xl",
  3: "text-lg",
  4: "text-base",
};

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** Tag semântica renderizada (h1–h4) e tamanho default. */
  level: HeadingLevel;
  /** Só para hero: Playfair Display, peso normal. */
  display?: boolean;
  /** Destaca o tamanho do level (ex.: h2 visualmente `4xl`). */
  size?: HeadingSize;
  /** Sobrescreve a tag sem mudar o estilo. */
  as?: React.ElementType;
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ level, display = false, size, as, className, ...props }, ref) => {
    const Tag: React.ElementType = as ?? `h${level}`;
    return (
      <Tag
        ref={ref}
        className={cn(
          "text-foreground",
          display ? "font-playfair font-normal" : "font-outfit font-semibold tracking-tight",
          size ? headingSizes[size] : headingLevelSizes[level],
          className
        )}
        {...props}
      />
    );
  }
);
Heading.displayName = "Heading";

/* --------------------------------------------------------------------- Text */

const textVariants = cva("", {
  variants: {
    size: { xs: "text-xs", sm: "text-sm", base: "text-base", lg: "text-lg" },
    tone: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      dim: "text-muted-foreground/70",
      accent: "text-accent",
      danger: "text-destructive",
    },
    weight: { normal: "font-normal", medium: "font-medium", semibold: "font-semibold" },
  },
  defaultVariants: { size: "sm", tone: "default", weight: "normal" },
});

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  /** Tag renderizada (default `p`). */
  as?: React.ElementType;
}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ as, size, tone, weight, className, ...props }, ref) => {
    const Tag: React.ElementType = as ?? "p";
    return <Tag ref={ref} className={cn(textVariants({ size, tone, weight }), className)} {...props} />;
  }
);
Text.displayName = "Text";

/* ------------------------------------------------------------------ Eyebrow */

const eyebrowVariants = cva("font-outfit text-micro font-semibold uppercase tracking-eyebrow", {
  variants: {
    tone: { muted: "text-muted-foreground", accent: "text-accent", foreground: "text-foreground" },
  },
  defaultVariants: { tone: "muted" },
});

export interface EyebrowProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof eyebrowVariants> {
  as?: React.ElementType;
}

const Eyebrow = React.forwardRef<HTMLParagraphElement, EyebrowProps>(
  ({ as, tone, className, ...props }, ref) => {
    const Tag: React.ElementType = as ?? "p";
    return <Tag ref={ref} className={cn(eyebrowVariants({ tone }), className)} {...props} />;
  }
);
Eyebrow.displayName = "Eyebrow";

/* --------------------------------------------------------------- PanelTitle */

export interface PanelTitleProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Slot à direita (botões, filtros). */
  actions?: React.ReactNode;
  /** String vira `<Eyebrow>`; um ReactNode é renderizado como veio. */
  eyebrow?: React.ReactNode;
  /** Ícone Lucide, renderizado dentro de `<IconBadge size="sm">`. */
  icon?: React.ReactNode;
  /** Tag do título (default `h2`). */
  as?: "h1" | "h2" | "h3" | "h4";
}

const PanelTitle = React.forwardRef<HTMLDivElement, PanelTitleProps>(
  ({ title, description, actions, eyebrow, icon, as: Tag = "h2", className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-start justify-between gap-3", className)} {...props}>
      <div className="flex min-w-0 items-start gap-3">
        {icon && <IconBadge size="sm">{icon}</IconBadge>}
        <div className="min-w-0">
          {typeof eyebrow === "string" ? <Eyebrow className="mb-1">{eyebrow}</Eyebrow> : eyebrow}
          <Tag className="font-outfit text-base font-semibold leading-tight text-foreground">{title}</Tag>
          {description && (
            <Text size="xs" tone="muted" className="mt-1">
              {description}
            </Text>
          )}
        </div>
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  )
);
PanelTitle.displayName = "PanelTitle";

/* ------------------------------------------------------------- SectionLabel */

export interface SectionLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Contagem ao lado do título (ex.: itens da lista). */
  count?: number;
  actions?: React.ReactNode;
  /** Tag do título (default `h3`). */
  as?: "h2" | "h3" | "h4";
}

const SectionLabel = React.forwardRef<HTMLDivElement, SectionLabelProps>(
  ({ count, actions, as: Tag = "h3", className, children, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center justify-between gap-3", className)} {...props}>
      <Tag className="flex min-w-0 items-baseline gap-2 font-outfit text-sm font-semibold text-foreground">
        <span className="truncate">{children}</span>
        {typeof count === "number" && (
          <span className="text-caption font-normal tabular-nums text-muted-foreground">{count}</span>
        )}
      </Tag>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  )
);
SectionLabel.displayName = "SectionLabel";

/* ---------------------------------------------------------------------- Kpi */

const kpiVariants = cva("inline-flex items-baseline gap-1 font-dm-sans font-bold leading-none tabular-nums", {
  variants: {
    size: { sm: "text-lg", md: "text-2xl", lg: "text-4xl" },
    tone: {
      default: "text-foreground",
      accent: "text-accent",
      success: "text-success",
      danger: "text-destructive",
    },
  },
  defaultVariants: { size: "md", tone: "default" },
});

export interface KpiProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "prefix">,
    VariantProps<typeof kpiVariants> {
  /** Unidade antes do número (ex.: moeda). */
  prefix?: React.ReactNode;
  /** Unidade depois do número (ex.: `%`). */
  suffix?: React.ReactNode;
  as?: React.ElementType;
}

const kpiUnitClass = "text-[0.6em] font-medium text-muted-foreground";

const Kpi = React.forwardRef<HTMLSpanElement, KpiProps>(
  ({ size, tone, prefix, suffix, as, className, children, ...props }, ref) => {
    const Tag: React.ElementType = as ?? "span";
    return (
      <Tag ref={ref} className={cn(kpiVariants({ size, tone }), className)} {...props}>
        {prefix != null && <span className={kpiUnitClass}>{prefix}</span>}
        {children}
        {suffix != null && <span className={kpiUnitClass}>{suffix}</span>}
      </Tag>
    );
  }
);
Kpi.displayName = "Kpi";

/* --------------------------------------------------------------------- Mono */

export type MonoProps = React.HTMLAttributes<HTMLElement>;

const Mono = React.forwardRef<HTMLElement, MonoProps>(({ className, ...props }, ref) => (
  <code ref={ref} className={cn("rounded bg-muted/60 px-1 py-0.5 font-mono text-dense", className)} {...props} />
));
Mono.displayName = "Mono";

export {
  Heading,
  Text,
  Eyebrow,
  PanelTitle,
  SectionLabel,
  Kpi,
  Mono,
  headingSizes,
  textVariants,
  eyebrowVariants,
  kpiVariants,
};
