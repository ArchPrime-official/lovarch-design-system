import { z } from "zod";

export const TestimonialsSchema = z.object({
  type: z.literal("testimonials"),
  heading: z.string().max(140).optional(),
  items: z
    .array(
      z.object({
        quote: z.string().min(1).max(600),
        author: z.string().min(1).max(100),
        role: z.string().max(100).optional(),
        avatar: z.string().url().optional(),
        company_logo: z.string().url().optional(),
        rating: z.number().int().min(1).max(5).optional(),
      }),
    )
    .min(1)
    .max(12),
  variant: z.enum(["cards", "carousel", "masonry"]).default("cards"),
});

export type TestimonialsBlock = z.infer<typeof TestimonialsSchema>;
