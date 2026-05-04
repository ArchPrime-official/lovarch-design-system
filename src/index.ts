/**
 * Lovarch Design System V8 — main entry
 *
 * Subpath imports (preferred):
 *   import preset from "@archprime/lovarch-ds/tailwind-preset";
 *   import "@archprime/lovarch-ds/tokens/css";
 *   import "@archprime/lovarch-ds/tokens/fonts";
 *   import "@archprime/lovarch-ds/tokens/globals";
 *   import { fadeInUp } from "@archprime/lovarch-ds/motion";
 *   import { cn } from "@archprime/lovarch-ds/cn";
 *
 *   // CMS blocks (Zod schemas + renderer)
 *   import { BlockRenderer, AnyBlockSchema } from "@archprime/lovarch-ds/blocks";
 *
 *   // v0.2.0 components
 *   import { LovarchSymbolLoader, GlassCard, LovarchAlert } from "@archprime/lovarch-ds/feedback";
 *   import { LovarchBarList, LovarchProgressCircle, LovarchTracker } from "@archprime/lovarch-ds/charts";
 *   import { NumberTicker, AnimatedList, ShimmerButton, DotPattern, GridPattern } from "@archprime/lovarch-ds/animated";
 *   import { ConstellationParticles, AmbientGlow, BackgroundEffects } from "@archprime/lovarch-ds/effects";
 *
 *   // Landing-page composite blocks (v0.2.0)
 *   import { Navbar, Footer, Faq, BeforeAfterCarousel, EmailModal, EnterpriseModal } from "@archprime/lovarch-ds/lp-blocks";
 *
 *   // Brand assets (v0.4.0)
 *   import { LovarchLogo, LovarchSymbol, LOVARCH_OG_IMAGE_URL } from "@archprime/lovarch-ds/brand";
 */

// CMS blocks (Zod-schema + BlockRenderer)
export * from "./blocks";

// Foundation
export * from "./lib/motion";
export { cn } from "./lib/cn";
export { ICON_ALLOWLIST, isAllowedIcon, type AllowedIcon } from "./lib/icon-allowlist";

// v0.2.0 component subpaths (also reachable via root for convenience)
export * from "./feedback";
export * from "./charts";
export * from "./animated";
export * from "./effects";
export * from "./lp-blocks";

// v0.3.0 templates registry
export * from "./templates";

// v0.4.0 brand assets (logos + symbol + asset URLs)
export * from "./brand";
