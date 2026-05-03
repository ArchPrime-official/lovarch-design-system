import { z } from "zod";

export const FooterLinkSchema = z.object({
  href: z.string().min(1),
  label: z.string().min(1).max(60),
  external: z.boolean().default(false),
});

export const FooterSchema = z.object({
  type: z.literal("footer"),
  logoUrl: z.string().url().optional(),
  logoAlt: z.string().default("Logo"),
  links: z.array(FooterLinkSchema).max(20).default([]),
  copyright: z.string().min(1).max(200),
  variant: z.enum(["light", "dark"]).default("light"),
});

export type FooterBlock = z.infer<typeof FooterSchema>;
