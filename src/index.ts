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
 *   import { BlockRenderer, AnyBlockSchema } from "@archprime/lovarch-ds/blocks";
 */

export * from "./blocks";
export * from "./lib/motion";
export { cn } from "./lib/cn";
export { ICON_ALLOWLIST, isAllowedIcon, type AllowedIcon } from "./lib/icon-allowlist";
