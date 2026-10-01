/**
 * LovarchLogo — the official Lovarch mark, theme-aware and proportion-safe.
 *
 * ── Brand rules (binding) ────────────────────────────────────────────────────
 *  • Light background → BLACK artwork · Dark background → WHITE artwork. Nothing else.
 *  • Never: drop shadow, gradient, outline, recolour (no gold, no grey), rotation,
 *    stretching, cropping the symbol away from the wordmark, placing on busy photos
 *    without a scrim.
 *  • Clear space: at least the height of the "O" of the wordmark on all four sides
 *    (≈ 0.8 × rendered logo height for `horizontal`, ≈ the symbol width for `icon`).
 *  • Minimum sizes: `icon` ≥ 24 px tall · `horizontal` ≥ 96 px wide (≈ `xs`, h-6)
 *    · `vertical`/`slogan` ≥ 160 px wide (tagline must stay legible).
 *  • Lockup order of preference: `vertical` (with tagline) → `horizontal` (headers)
 *    → `icon` (favicon/avatar only). Tagline: "AI GROWTH SYSTEM FOR ARCHITECTS & DESIGNERS".
 *  Full spec: `docs/brand.md`.
 *
 * ── Variants ──────────────────────────────────────────────────────────────────
 *  horizontal (default) · icon · vertical · slogan · email (PNG, theme-aware)
 *  symbol — inline SVG `<LovarchSymbol />` in `currentColor` (watermarks, badges).
 *
 * ── Theme ─────────────────────────────────────────────────────────────────────
 *  auto (default) — follows the `dark` class on `<html>` (MutationObserver, SSR-safe)
 *  light — forces BLACK artwork · dark — forces WHITE artwork
 *
 * Usage:
 *   <LovarchLogo size="sm" />                                   // top nav
 *   <LovarchLogo variant="vertical" size="3xl" priority />      // login
 *   <LovarchLogo variant="icon" height={24} theme="dark" />     // on a dark card
 *   <LovarchLogo variant="symbol" size="md" className="text-foreground" />
 */
import { useEffect, useState, type CSSProperties } from "react";
import { cn } from "../lib/cn";
import { LovarchSymbol } from "./LovarchSymbol";
import { LOVARCH_LOGO_ASSETS, type LovarchRasterVariant } from "./assets";

export type LovarchLogoVariant = LovarchRasterVariant | "symbol";
export type LovarchLogoTheme = "auto" | "light" | "dark";
export type LovarchLogoSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";

/** Height classes — identical to the app's legacy `ThemeAwareLogo` table. */
const SIZE_CLASS: Record<LovarchLogoSize, string> = {
  xs: "h-6", // 24px — compact chips, plugin headers
  sm: "h-8", // 32px — top nav
  md: "h-10", // 40px — default header
  lg: "h-12", // 48px — desktop header
  xl: "h-16", // 64px — medium highlight
  "2xl": "h-20", // 80px — large highlight
  "3xl": "h-24", // 96px — hero / auth
  "4xl": "h-32", // 128px — login page
};

const SIZE_PX: Record<LovarchLogoSize, number> = {
  xs: 24, sm: 32, md: 40, lg: 48, xl: 64, "2xl": 80, "3xl": 96, "4xl": 128,
};

const readDocumentIsDark = (): boolean =>
  typeof document !== "undefined" && document.documentElement.classList.contains("dark");

/**
 * useLovarchTheme — resolves whether WHITE artwork should be used.
 * `auto` observes the `dark` class on `<html>` (same mechanism the app's theme
 * toggle writes); `light`/`dark` force the answer without touching the DOM.
 */
export function useLovarchTheme(theme: LovarchLogoTheme = "auto"): boolean {
  const [isDark, setIsDark] = useState<boolean>(() => (theme === "auto" ? readDocumentIsDark() : theme === "dark"));

  useEffect(() => {
    if (theme !== "auto" || typeof document === "undefined") return;
    const check = () => setIsDark(readDocumentIsDark());
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, [theme]);

  if (theme === "dark") return true;
  if (theme === "light") return false;
  return isDark;
}

export interface LovarchLogoProps {
  variant?: LovarchLogoVariant;
  theme?: LovarchLogoTheme;
  /** Preset height (Tailwind `h-*`). Ignored when `height` is given. */
  size?: LovarchLogoSize;
  /** Explicit height in px — alternative to `size`. Width always follows the real aspect ratio. */
  height?: number;
  className?: string;
  alt?: string;
  /** Above-the-fold logo (nav, login): loads eagerly. Default lazy. */
  priority?: boolean;
  /** Merged last — escape hatch for layout-specific overrides. */
  style?: CSSProperties;
}

export function LovarchLogo({
  variant = "horizontal",
  theme = "auto",
  size,
  height,
  className,
  alt = "Lovarch",
  priority = false,
  style,
}: LovarchLogoProps) {
  const isDark = useLovarchTheme(theme);

  if (variant === "symbol") {
    const px = height ?? (size ? SIZE_PX[size] : 32);
    return (
      <LovarchSymbol size={px} className={cn("shrink-0 select-none", className)} title={alt} />
    );
  }

  const asset = LOVARCH_LOGO_ASSETS[variant][isDark ? "dark" : "light"];
  const heightClass = height == null && size ? SIZE_CLASS[size] : undefined;

  // Real aspect ratio of the PNG actually rendered — the box can never squash the mark.
  const protectedStyle: CSSProperties = {
    aspectRatio: `${asset.width} / ${asset.height}`,
    objectFit: "contain",
    ...(height != null ? { height } : null),
    ...style,
  };

  return (
    <img
      src={asset.src}
      alt={alt}
      width={asset.width}
      height={asset.height}
      draggable={false}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={cn("object-contain w-auto shrink-0 select-none", heightClass, className)}
      style={protectedStyle}
    />
  );
}
