import { z } from "zod";
import { Hero, HeroSchema, type HeroBlock } from "./hero";
import { Cta, CtaSchema, type CtaBlock } from "./cta";
import { FeatureGrid, FeatureGridSchema, type FeatureGridBlock } from "./feature-grid";
import { Testimonials, TestimonialsSchema, type TestimonialsBlock } from "./testimonials";
import { Pricing, PricingSchema, type PricingBlock } from "./pricing";

export type AnyBlock =
  | HeroBlock
  | CtaBlock
  | FeatureGridBlock
  | TestimonialsBlock
  | PricingBlock;

export const AnyBlockSchema = z.discriminatedUnion("type", [
  HeroSchema,
  CtaSchema,
  FeatureGridSchema,
  TestimonialsSchema,
  PricingSchema,
]);

export const BLOCK_REGISTRY = {
  hero: { schema: HeroSchema, component: Hero },
  cta: { schema: CtaSchema, component: Cta },
  "feature-grid": { schema: FeatureGridSchema, component: FeatureGrid },
  testimonials: { schema: TestimonialsSchema, component: Testimonials },
  pricing: { schema: PricingSchema, component: Pricing },
} as const;

export type BlockType = keyof typeof BLOCK_REGISTRY;

export function isKnownBlockType(t: string): t is BlockType {
  return t in BLOCK_REGISTRY;
}
