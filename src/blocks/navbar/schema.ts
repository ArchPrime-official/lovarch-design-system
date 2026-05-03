import { z } from "zod";

export const NavbarLinkSchema = z.object({
  label: z.string().min(1).max(60),
  /** anchor id (e.g. "features") → href becomes "#features", or full URL */
  href: z.string().min(1),
  showMobile: z.boolean().default(true),
});

export const NavbarSchema = z.object({
  type: z.literal("navbar"),
  logoUrl: z.string().url(),
  logoAlt: z.string().default("Logo"),
  navLinks: z.array(NavbarLinkSchema).max(8).default([]),
  loginLabel: z.string().min(1).max(40).default("Log in"),
  loginHref: z.string().default("/login"),
  ctaLabel: z.string().min(1).max(40).default("Get Started"),
  ctaShortLabel: z.string().max(40).optional(),
  ctaHref: z.string().default("#pricing"),
  variant: z.enum(["light", "dark"]).default("light"),
});

export type NavbarBlock = z.infer<typeof NavbarSchema>;
