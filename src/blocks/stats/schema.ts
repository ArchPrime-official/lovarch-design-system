import { z } from "zod";

export const StatsSchema = z.object({
  type: z.literal("stats"),
  heading: z.string().max(140).optional(),
  subheading: z.string().max(280).optional(),
  items: z
    .array(
      z.object({
        value: z.string().min(1).max(20),
        label: z.string().min(1).max(80),
      }),
    )
    .min(1)
    .max(6),
  variant: z.enum(["light", "dark"]).default("dark"),
});

export type StatsBlock = z.infer<typeof StatsSchema>;
