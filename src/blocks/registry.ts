import { z } from "zod";
import { Hero, HeroSchema, type HeroBlock } from "./hero";
import { Cta, CtaSchema, type CtaBlock } from "./cta";
import { FeatureGrid, FeatureGridSchema, type FeatureGridBlock } from "./feature-grid";
import { Testimonials, TestimonialsSchema, type TestimonialsBlock } from "./testimonials";
import { Pricing, PricingSchema, type PricingBlock } from "./pricing";
import { Navbar, NavbarSchema, type NavbarBlock } from "./navbar";
import { Footer, FooterSchema, type FooterBlock } from "./footer";
import { Faq, FaqSchema, type FaqBlock } from "./faq";
import {
  BeforeAfterCarousel,
  BeforeAfterCarouselSchema,
  type BeforeAfterCarouselBlock,
} from "./before-after-carousel";

export type AnyBlock =
  | HeroBlock
  | CtaBlock
  | FeatureGridBlock
  | TestimonialsBlock
  | PricingBlock
  | NavbarBlock
  | FooterBlock
  | FaqBlock
  | BeforeAfterCarouselBlock;

export const AnyBlockSchema = z.discriminatedUnion("type", [
  HeroSchema,
  CtaSchema,
  FeatureGridSchema,
  TestimonialsSchema,
  PricingSchema,
  NavbarSchema,
  FooterSchema,
  FaqSchema,
  BeforeAfterCarouselSchema,
]);

export const BLOCK_REGISTRY = {
  hero: { schema: HeroSchema, component: Hero },
  cta: { schema: CtaSchema, component: Cta },
  "feature-grid": { schema: FeatureGridSchema, component: FeatureGrid },
  testimonials: { schema: TestimonialsSchema, component: Testimonials },
  pricing: { schema: PricingSchema, component: Pricing },
  navbar: { schema: NavbarSchema, component: Navbar },
  footer: { schema: FooterSchema, component: Footer },
  faq: { schema: FaqSchema, component: Faq },
  "before-after-carousel": {
    schema: BeforeAfterCarouselSchema,
    component: BeforeAfterCarousel,
  },
} as const;

export type BlockType = keyof typeof BLOCK_REGISTRY;

export function isKnownBlockType(t: string): t is BlockType {
  return t in BLOCK_REGISTRY;
}
