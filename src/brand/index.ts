/**
 * Brand subpath — official Lovarch logos, symbol and brand assets.
 *
 * Usage:
 *   import { LovarchLogo, LovarchSymbol, PoweredByLovarch } from "@archprime/lovarch-ds/brand";
 *   import { LOVARCH_OG_IMAGE_URL, LOVARCH_EMAIL_LOGO_DARK_URL } from "@archprime/lovarch-ds/brand";
 *
 * Animated mark (login/splash hero): `LovarchMark3D` — exported here.
 * For the animated symbol as LOADING state, import from `/feedback`:
 *   import { LovarchSymbolLoader } from "@archprime/lovarch-ds/feedback";
 *
 * Brand spec (variants, theme, clear space, minimum sizes, don'ts): `docs/brand.md`.
 */
export {
  LovarchLogo,
  useLovarchTheme,
  type LovarchLogoProps,
  type LovarchLogoVariant,
  type LovarchLogoTheme,
  type LovarchLogoSize,
} from "./LovarchLogo";
export { LovarchSymbol } from "./LovarchSymbol";
export { LovarchMark3D, type LovarchMark3DProps } from "./LovarchMark3D";
export { PoweredByLovarch, type PoweredByLovarchProps } from "./PoweredByLovarch";
export {
  LOVARCH_TAGLINE,
  LOVARCH_LOGO_HORIZONTAL_DARK_URL,
  LOVARCH_LOGO_HORIZONTAL_WHITE_URL,
  LOVARCH_LOGO_HORIZONTAL_URL,
  LOVARCH_ICON_DARK_URL,
  LOVARCH_ICON_WHITE_URL,
  LOVARCH_LOGO_VERTICAL_DARK_URL,
  LOVARCH_LOGO_VERTICAL_WHITE_URL,
  LOVARCH_LOGO_SLOGAN_URL,
  LOVARCH_LOGO_SLOGAN_WHITE_URL,
  LOVARCH_EMAIL_LOGO_DARK_URL,
  LOVARCH_EMAIL_LOGO_URL,
  LOVARCH_OG_IMAGE_URL,
  LOVARCH_FAVICON_URL,
  LOVARCH_LOGO_ASSETS,
  LOVARCH_EMAIL_ANIMATIONS,
  type LovarchBrandAsset,
  type LovarchRasterVariant,
} from "./assets";
