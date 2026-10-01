/**
 * Asset URLs — for use outside JSX (meta tags, email HTML, server-side templates)
 * and the single source of truth for the real pixel dimensions of every brand PNG
 * (`LovarchLogo` derives its `aspect-ratio` protection from this table).
 *
 * Naming: the suffix is the INK colour of the artwork, not the theme —
 *   `*-dark.png`  = black wordmark/symbol → use on LIGHT backgrounds (#FAF9F7)
 *   `*-white.png` = white wordmark/symbol → use on DARK backgrounds (#09090B)
 *
 * In a Vite consumer these resolve to fingerprinted URLs at build time.
 * For email templates that run server-side (Deno edge functions), prefer hosting
 * a stable copy on a CDN and reference via env var; these imports require a
 * bundler that can hash and serve PNGs.
 *
 * Usage:
 *   import { LOVARCH_LOGO_HORIZONTAL_DARK_URL, LOVARCH_OG_IMAGE_URL } from "@archprime/lovarch-ds/brand";
 *
 *   <meta property="og:image" content={LOVARCH_OG_IMAGE_URL} />
 *
 * Full spec (variants, clear space, minimum sizes, don'ts): `docs/brand.md`.
 */

import logoHorizontalDarkUrl from "./assets/logo-horizontal-dark.png";
import logoHorizontalWhiteUrl from "./assets/logo-horizontal-white.png";
import iconDarkUrl from "./assets/icon-dark.png";
import iconWhiteUrl from "./assets/icon-white.png";
import logoVerticalDarkUrl from "./assets/logo-vertical-dark.png";
import logoVerticalWhiteUrl from "./assets/logo-vertical-white.png";
import logoSloganUrl from "./assets/logo-slogan.png";
import logoSloganWhiteUrl from "./assets/logo-slogan-white.png";
import logoEmailDarkUrl from "./assets/logo-email-dark.png";
import logoEmailUrl from "./assets/logo-email.png";
import ogImageUrl from "./assets/og-image.png";
import faviconUrl from "./assets/favicon.png";

/** Official tagline — always uppercase, always this exact wording. */
export const LOVARCH_TAGLINE = "AI GROWTH SYSTEM FOR ARCHITECTS & DESIGNERS";

// ── Horizontal (symbol + wordmark) — headers, top nav, public pages, PDF ──────

/** 1920×229 transparent PNG, BLACK symbol + wordmark — pair with light backgrounds. */
export const LOVARCH_LOGO_HORIZONTAL_DARK_URL = logoHorizontalDarkUrl;

/** 1920×248 transparent PNG, WHITE symbol + wordmark — pair with dark backgrounds. */
export const LOVARCH_LOGO_HORIZONTAL_WHITE_URL = logoHorizontalWhiteUrl;

/** @deprecated Legacy alias of `LOVARCH_LOGO_HORIZONTAL_WHITE_URL` (white artwork). */
export const LOVARCH_LOGO_HORIZONTAL_URL = logoHorizontalWhiteUrl;

// ── Icon (symbol only) — favicon, avatar, compact nav, app icon ───────────────

/** 560×631 transparent PNG, BLACK symbol — light backgrounds. Min render size 24px. */
export const LOVARCH_ICON_DARK_URL = iconDarkUrl;

/** 560×631 transparent PNG, WHITE symbol — dark backgrounds. Min render size 24px. */
export const LOVARCH_ICON_WHITE_URL = iconWhiteUrl;

// ── Vertical (symbol over wordmark + tagline) — preferred lockup: login, hero ─

/** 1920×583 transparent PNG, BLACK, with tagline — light backgrounds. */
export const LOVARCH_LOGO_VERTICAL_DARK_URL = logoVerticalDarkUrl;

/** 1536×652 transparent PNG, WHITE, with tagline — dark backgrounds. */
export const LOVARCH_LOGO_VERTICAL_WHITE_URL = logoVerticalWhiteUrl;

// ── Slogan (horizontal + tagline underneath) — presentations, covers ──────────

/** 1920×279 transparent PNG, BLACK horizontal lockup + tagline — light backgrounds. */
export const LOVARCH_LOGO_SLOGAN_URL = logoSloganUrl;

/** 1920×279 transparent PNG, WHITE — derived from the black master (same alpha mask). */
export const LOVARCH_LOGO_SLOGAN_WHITE_URL = logoSloganWhiteUrl;

// ── Email (vertical lockup sized for mail clients, retina-safe) ───────────────

/**
 * 1024×434 transparent PNG, BLACK — the one the email kit uses (`_shared/email-template.ts`
 * renders on #FAF9F7 with `color-scheme: light only`). Render at 140–160px wide.
 */
export const LOVARCH_EMAIL_LOGO_DARK_URL = logoEmailDarkUrl;

/** 1024×434 transparent PNG, WHITE — only for dark email headers (legacy `logo-email-v2`). */
export const LOVARCH_EMAIL_LOGO_URL = logoEmailUrl;

// ── Meta ──────────────────────────────────────────────────────────────────────

/** 1200×800 — Open Graph / Twitter Card hero image. */
export const LOVARCH_OG_IMAGE_URL = ogImageUrl;

/** 455×512 PNG, black symbol — high-res favicon source. Generate ICO/16/32/192/512 from this. */
export const LOVARCH_FAVICON_URL = faviconUrl;

// ── Dimension table (measured with Pillow, 2026-10-01) ────────────────────────

export interface LovarchBrandAsset {
  src: string;
  /** Intrinsic pixel width of the PNG. */
  width: number;
  /** Intrinsic pixel height of the PNG. */
  height: number;
}

export type LovarchRasterVariant = "horizontal" | "icon" | "vertical" | "slogan" | "email";

/**
 * Per variant: `light` = artwork for LIGHT backgrounds (black ink),
 * `dark` = artwork for DARK backgrounds (white ink). Dimensions are real —
 * the two themes of a variant do not always share a canvas, so never hardcode a ratio.
 */
export const LOVARCH_LOGO_ASSETS: Record<
  LovarchRasterVariant,
  { light: LovarchBrandAsset; dark: LovarchBrandAsset }
> = {
  horizontal: {
    light: { src: logoHorizontalDarkUrl, width: 1920, height: 229 },
    dark: { src: logoHorizontalWhiteUrl, width: 1920, height: 248 },
  },
  icon: {
    light: { src: iconDarkUrl, width: 560, height: 631 },
    dark: { src: iconWhiteUrl, width: 560, height: 631 },
  },
  vertical: {
    light: { src: logoVerticalDarkUrl, width: 1920, height: 583 },
    dark: { src: logoVerticalWhiteUrl, width: 1536, height: 652 },
  },
  slogan: {
    light: { src: logoSloganUrl, width: 1920, height: 279 },
    dark: { src: logoSloganWhiteUrl, width: 1920, height: 279 },
  },
  email: {
    light: { src: logoEmailDarkUrl, width: 1024, height: 434 },
    dark: { src: logoEmailUrl, width: 1024, height: 434 },
  },
};
