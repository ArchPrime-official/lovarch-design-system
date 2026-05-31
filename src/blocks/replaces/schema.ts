import { z } from "zod";

export const ReplacesSchema = z.object({
  type: z.literal("replaces"),
  title: z.string().min(1).max(200),
  subtitle: z.string().max(400).optional(),
  tools: z.array(z.string().min(1).max(40)).min(1).max(60),
  footerText: z.string().max(160).optional(),
  variant: z.enum(["light", "dark"]).default("dark"),
});

export type ReplacesBlock = z.infer<typeof ReplacesSchema>;
