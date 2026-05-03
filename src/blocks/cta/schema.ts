import { z } from "zod";

export const CtaSchema = z.object({
  type: z.literal("cta"),
  title: z.string().min(1).max(140),
  body: z.string().max(300).optional(),
  button: z.object({
    label: z.string().min(1).max(60),
    href: z.string().min(1),
  }),
  variant: z.enum(["card", "banner"]).default("card"),
  align: z.enum(["left", "center"]).default("center"),
});

export type CtaBlock = z.infer<typeof CtaSchema>;
