import { z } from "zod";

export const HeroBackgroundSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("color"), value: z.string() }),
  z.object({ type: z.literal("image"), url: z.string().url(), overlay: z.number().min(0).max(1).optional() }),
  z.object({ type: z.literal("video"), url: z.string().url(), poster: z.string().url().optional() }),
  z.object({ type: z.literal("particles") }),
]);

export const HeroSchema = z.object({
  type: z.literal("hero"),
  title: z.string().min(1).max(200),
  subtitle: z.string().max(400).optional(),
  cta: z
    .object({
      label: z.string().min(1).max(60),
      href: z.string().min(1),
      variant: z.enum(["primary", "secondary"]).default("primary"),
    })
    .optional(),
  background: HeroBackgroundSchema.default({ type: "color", value: "#FAF9F7" }),
  align: z.enum(["left", "center"]).default("center"),
  height: z.enum(["compact", "regular", "full"]).default("regular"),
});

export type HeroBlock = z.infer<typeof HeroSchema>;
