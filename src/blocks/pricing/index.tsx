import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { stagger, listItem, scaleOnTap } from "../../lib/motion";
import { cn } from "../../lib/cn";
import type { PricingBlock } from "./schema";

const COLS_CLASS: Record<number, string> = {
  1: "grid-cols-1 max-w-md mx-auto",
  2: "grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto",
  3: "grid-cols-1 md:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
};

export function Pricing({ block }: { block: PricingBlock }) {
  const cols = block.tiers.length as 1 | 2 | 3 | 4;

  return (
    <section className="w-full py-14 md:py-24 px-5 md:px-8">
      <div className="max-w-6xl mx-auto">
        {(block.heading || block.subheading) && (
          <div className="text-center mb-12 md:mb-16">
            {block.heading && (
              <h2
                className="text-3xl md:text-4xl font-bold text-foreground"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {block.heading}
              </h2>
            )}
            {block.subheading && (
              <p className="mt-4 text-base text-muted-foreground max-w-2xl mx-auto">
                {block.subheading}
              </p>
            )}
          </div>
        )}
        <motion.div
          variants={stagger(80)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className={cn("grid gap-6 md:gap-8", COLS_CLASS[cols])}
        >
          {block.tiers.map((tier, i) => (
            <motion.div
              key={i}
              variants={listItem}
              className={cn(
                "relative rounded-2xl border bg-card p-7 md:p-8 flex flex-col",
                tier.highlighted
                  ? "border-accent/60 shadow-xl ring-2 ring-accent/40 -translate-y-1"
                  : "border-foreground/10 ring-1 ring-foreground/5 shadow-sm hover:border-foreground/20 hover:shadow-md hover:-translate-y-0.5 transition-all",
              )}
            >
              {tier.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold shadow-md">
                  {tier.badge}
                </div>
              )}
              <h3
                className="text-lg font-semibold text-foreground"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {tier.name}
              </h3>
              <div className="mt-4 flex items-baseline gap-2">
                <span
                  className="text-4xl md:text-5xl font-bold text-foreground tabular-nums"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {tier.price}
                </span>
                {tier.period && (
                  <span className="text-sm text-muted-foreground">{tier.period}</span>
                )}
              </div>
              <ul className="mt-6 space-y-3 flex-1">
                {tier.features.map((f, fi) => (
                  <li key={fi} className="flex gap-3 text-sm text-foreground/85">
                    <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="leading-snug">{f}</span>
                  </li>
                ))}
              </ul>
              <motion.a
                href={tier.cta.href}
                {...scaleOnTap}
                className={cn(
                  "mt-7 inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-sm shadow-md transition-shadow hover:shadow-lg min-h-[44px] w-full",
                  tier.highlighted
                    ? "bg-accent text-accent-foreground"
                    : "bg-foreground/5 text-foreground border border-border/50",
                )}
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {tier.cta.label}
              </motion.a>
            </motion.div>
          ))}
        </motion.div>
        {block.note && (
          <p className="mt-10 text-center text-xs text-muted-foreground max-w-2xl mx-auto">
            {block.note}
          </p>
        )}
      </div>
    </section>
  );
}

export default Pricing;
export { PricingSchema } from "./schema";
export type { PricingBlock } from "./schema";
