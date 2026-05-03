/**
 * Templates registry — pre-populated CMS block arrays for "create page from template".
 *
 * Each template is a typed `AnyBlock[]` array passing all 9 block schemas.
 * Consumers (admin UI / "from template" endpoint) read from this registry.
 *
 * Usage:
 *   import { TEMPLATES, type CmsTemplate } from "@archprime/lovarch-ds/templates";
 *   const tpl = TEMPLATES["lp-premium"];
 *   await db.from("cms_pages").insert({ slug: "promo", target_domain: "lovarch.com", blocks: tpl.blocks, ... });
 */
import type { AnyBlock } from "../blocks";
import { LP_PREMIUM_TEMPLATE } from "./lp-premium";
import { LP_V3_TEMPLATE } from "./lp-v3";
import { LANDING_CLASSIC_TEMPLATE } from "./landing-classic";

export interface CmsTemplate {
  id: string;
  display_name: string;
  description: string;
  /** Default target domain — admin can override on create. */
  default_target_domain: "lovarch.com" | "archprime.io";
  /** Default locale — admin can override on create. */
  default_locale: "it" | "en" | "pt" | "es";
  blocks: AnyBlock[];
  /** Optional preview thumbnail URL (consumer-hosted). */
  thumbnail_url?: string;
}

export const TEMPLATES: Record<string, CmsTemplate> = {
  "lp-premium": LP_PREMIUM_TEMPLATE,
  "lp-v3": LP_V3_TEMPLATE,
  "landing-classic": LANDING_CLASSIC_TEMPLATE,
};

export function getTemplate(id: string): CmsTemplate | null {
  return TEMPLATES[id] ?? null;
}

export function listTemplates(): CmsTemplate[] {
  return Object.values(TEMPLATES);
}

export { LP_PREMIUM_TEMPLATE, LP_V3_TEMPLATE, LANDING_CLASSIC_TEMPLATE };
