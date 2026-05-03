import { z } from "zod";
import { ICON_ALLOWLIST } from "../../lib/icon-allowlist";

const allowed = ICON_ALLOWLIST as unknown as [string, ...string[]];

export const FeatureGridSchema = z.object({
  type: z.literal("feature-grid"),
  heading: z.string().max(140).optional(),
  subheading: z.string().max(280).optional(),
  items: z
    .array(
      z.object({
        icon: z.enum(allowed),
        title: z.string().min(1).max(100),
        description: z.string().min(1).max(280),
      }),
    )
    .min(1)
    .max(12),
  columns: z.union([z.literal(2), z.literal(3), z.literal(4)]).default(3),
  variant: z.enum(["icons-top", "icons-left"]).default("icons-top"),
});

export type FeatureGridBlock = z.infer<typeof FeatureGridSchema>;
