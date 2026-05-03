import { z } from "zod";

export const PricingSchema = z.object({
  type: z.literal("pricing"),
  heading: z.string().max(140).optional(),
  subheading: z.string().max(280).optional(),
  billing_toggle: z
    .object({
      monthly_label: z.string().max(40).default("Mensile"),
      yearly_label: z.string().max(40).default("Annuale"),
    })
    .optional(),
  tiers: z
    .array(
      z.object({
        name: z.string().min(1).max(60),
        price: z.string().min(1).max(40),
        period: z.string().max(40).optional(),
        features: z.array(z.string().min(1).max(160)).min(1).max(20),
        cta: z.object({
          label: z.string().min(1).max(60),
          href: z.string().min(1),
        }),
        highlighted: z.boolean().default(false),
        badge: z.string().max(40).optional(),
      }),
    )
    .min(1)
    .max(4),
  note: z.string().max(280).optional(),
});

export type PricingBlock = z.infer<typeof PricingSchema>;
