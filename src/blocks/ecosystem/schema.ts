import { z } from "zod";
import { ICON_ALLOWLIST } from "../../lib/icon-allowlist";

const allowed = ICON_ALLOWLIST as unknown as [string, ...string[]];

export const EcosystemSchema = z.object({
  type: z.literal("ecosystem"),
  badgeText: z.string().max(60).optional(),
  title: z.string().min(1).max(200),
  subtitle: z.string().max(400).optional(),
  phases: z
    .array(
      z.object({
        label: z.string().min(1).max(40),
        title: z.string().min(1).max(120),
        description: z.string().min(1).max(300),
        features: z.array(z.string().min(1).max(120)).max(5).optional(),
        icon: z.enum(allowed).optional(),
      }),
    )
    .min(1)
    .max(6),
  variant: z.enum(["light", "dark"]).default("dark"),
  anchorId: z.string().default("ecosystem"),
});

export type EcosystemBlock = z.infer<typeof EcosystemSchema>;
