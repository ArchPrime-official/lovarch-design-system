/**
 * LovarchLogo — official Lovarch wordmark + symbol.
 *
 * Variants:
 *   - "horizontal" — full wordmark "LOVARCH" with symbol on the left (1920×248 PNG, white).
 *     Best on dark backgrounds. For light backgrounds use the SVG `<LovarchSymbol />`
 *     paired with text styled in your app's foreground color.
 *   - "symbol"     — geometric mark only (rendered as inline SVG via `<LovarchSymbol />`).
 *     Theme-aware via `currentColor`. Use this for favicons, watermarks, badges.
 *   - "email"      — high-res PNG optimized for email clients (1536×652, transparent bg).
 *
 * Usage:
 *   import { LovarchLogo } from "@archprime/lovarch-ds/brand";
 *
 *   // Horizontal logo on dark navbar
 *   <LovarchLogo variant="horizontal" className="h-10" />
 *
 *   // Symbol in light/dark mode (uses currentColor)
 *   <LovarchLogo variant="symbol" size={32} className="text-foreground" />
 *
 *   // Email-ready PNG (use the URL directly in <img src=...>)
 *   import { LOVARCH_EMAIL_LOGO_URL } from "@archprime/lovarch-ds/brand";
 */
import { LovarchSymbol } from "./LovarchSymbol";
import logoHorizontalWhiteUrl from "./assets/logo-horizontal-white.png";
import logoEmailUrl from "./assets/logo-email.png";

export type LovarchLogoVariant = "horizontal" | "symbol" | "email";

interface LovarchLogoProps {
  variant?: LovarchLogoVariant;
  /** Height in px (or any CSS height value). Width auto-scales. */
  size?: number;
  /** Tailwind/className for sizing or color (symbol only). */
  className?: string;
  alt?: string;
}

export function LovarchLogo({
  variant = "horizontal",
  size,
  className,
  alt = "Lovarch",
}: LovarchLogoProps) {
  if (variant === "symbol") {
    return <LovarchSymbol size={size ?? 32} className={className} title={alt} />;
  }

  const src = variant === "email" ? logoEmailUrl : logoHorizontalWhiteUrl;
  const style = size ? { height: size, width: "auto" } : undefined;

  return <img src={src} alt={alt} className={className} style={style} />;
}
