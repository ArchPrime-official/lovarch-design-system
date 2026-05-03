import { z } from "zod";

export const FaqItemSchema = z.object({
  question: z.string().min(1).max(300),
  answer: z.string().min(1).max(2000),
});

export const FaqSchema = z.object({
  type: z.literal("faq"),
  title: z.string().min(1).max(200),
  items: z.array(FaqItemSchema).min(1).max(20),
  variant: z.enum(["light", "dark"]).default("light"),
  /** HTML id for anchor links (e.g. nav scrolls to "#faq"). */
  anchorId: z.string().default("faq"),
});

export type FaqBlock = z.infer<typeof FaqSchema>;
