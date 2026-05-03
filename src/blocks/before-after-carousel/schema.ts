import { z } from "zod";

export const BeforeAfterSlideSchema = z.object({
  beforeUrl: z.string().url(),
  afterUrl: z.string().url(),
  beforeLabel: z.string().min(1).max(40),
  afterLabel: z.string().min(1).max(40),
});

export const BeforeAfterCarouselSchema = z.object({
  type: z.literal("before-after-carousel"),
  title: z.string().min(1).max(200),
  subtitle: z.string().max(500).optional(),
  badgeText: z.string().max(60).optional(),
  slides: z.array(BeforeAfterSlideSchema).min(1).max(10),
  ctaLabel: z.string().max(60).optional(),
  ctaHref: z.string().optional(),
  variant: z.enum(["light", "dark"]).default("dark"),
  anchorId: z.string().default("render"),
});

export type BeforeAfterCarouselBlock = z.infer<typeof BeforeAfterCarouselSchema>;
