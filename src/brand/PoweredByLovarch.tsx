/**
 * PoweredByLovarch — attribution lockup for white-label surfaces (client portal,
 * published sites, proposals, PDFs). A micro label + the horizontal logo at 14px,
 * linking to lovarch.com in a new tab.
 *
 * The label is NOT translated here: the consumer passes it already localised
 * (e.g. `t("portal.public.powered_by")`), because the DS has no i18n runtime.
 *
 * Usage:
 *   <PoweredByLovarch label={t("portal.public.powered_by")} />
 *   <PoweredByLovarch label="Powered by" align="center" className="mt-8" />
 *   // Over a dark hero photo: force white artwork and a light label
 *   <PoweredByLovarch label="Powered by" theme="dark" labelClassName="text-white/70" />
 */
import { cn } from "../lib/cn";
import { LovarchLogo, type LovarchLogoTheme } from "./LovarchLogo";

export interface PoweredByLovarchProps {
  /** Localised attribution text ("Powered by", "Realizzato con", …). Required. */
  label: string;
  /** Defaults to https://lovarch.com */
  href?: string;
  /** `auto` follows the `dark` class on `<html>`; `light`/`dark` force the artwork. */
  theme?: LovarchLogoTheme;
  className?: string;
  /** Override the label colour/size (default `text-muted-foreground`). */
  labelClassName?: string;
  /**
   * When set, the lockup takes the full row width and aligns inside it
   * (footers). When omitted it is an inline-flex element.
   */
  align?: "left" | "center" | "right";
}

const ALIGN_CLASS: Record<NonNullable<PoweredByLovarchProps["align"]>, string> = {
  left: "flex w-full justify-start",
  center: "flex w-full justify-center",
  right: "flex w-full justify-end",
};

export function PoweredByLovarch({
  label,
  href = "https://lovarch.com",
  theme = "auto",
  className,
  labelClassName,
  align,
}: PoweredByLovarchProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} Lovarch`}
      className={cn(
        "items-center gap-1.5 no-underline opacity-80 transition-opacity hover:opacity-100",
        align ? ALIGN_CLASS[align] : "inline-flex",
        className,
      )}
    >
      <span
        className={cn(
          "text-micro font-medium leading-none uppercase tracking-[0.14em] text-muted-foreground",
          labelClassName,
        )}
      >
        {label}
      </span>
      <LovarchLogo variant="horizontal" height={14} theme={theme} alt="Lovarch" />
    </a>
  );
}
