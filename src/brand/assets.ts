/**
 * Asset URLs — for use outside JSX (meta tags, email HTML, server-side templates).
 *
 * In a Vite consumer these resolve to fingerprinted URLs at build time.
 * For email templates that run server-side (Deno edge functions), prefer hosting
 * a stable copy on a CDN and reference via env var; these imports require a
 * bundler that can hash and serve PNGs.
 *
 * Usage:
 *   import { LOVARCH_LOGO_HORIZONTAL_URL, LOVARCH_OG_IMAGE_URL } from "@archprime/lovarch-ds/brand";
 *
 *   <link rel="canonical" href={canonicalUrl} />
 *   <meta property="og:image" content={LOVARCH_OG_IMAGE_URL} />
 */

import logoHorizontalWhiteUrl from "./assets/logo-horizontal-white.png";
import logoEmailUrl from "./assets/logo-email.png";
import ogImageUrl from "./assets/og-image.png";
import faviconUrl from "./assets/favicon.png";

/** 1920×248 transparent PNG, white wordmark — pair with dark backgrounds. */
export const LOVARCH_LOGO_HORIZONTAL_URL = logoHorizontalWhiteUrl;

/** 1536×652 transparent PNG — sized for email client rendering. */
export const LOVARCH_EMAIL_LOGO_URL = logoEmailUrl;

/** 1536×1024 — Open Graph / Twitter Card hero image. */
export const LOVARCH_OG_IMAGE_URL = ogImageUrl;

/** 819×922 PNG — high-res favicon source. Generate ICO/16/32/192/512 from this. */
export const LOVARCH_FAVICON_URL = faviconUrl;
