import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { stagger, listItem } from "../../lib/motion";
import { cn } from "../../lib/cn";
import type { FeatureGridBlock } from "./schema";

const COLS_CLASS: Record<2 | 3 | 4, string> = {
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
};

export function FeatureGrid({ block }: { block: FeatureGridBlock }) {
  const isLeft = block.variant === "icons-left";

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
          className={cn("grid gap-6 md:gap-8", COLS_CLASS[block.columns])}
        >
          {block.items.map((item, i) => {
            const IconComp = (Icons as unknown as Record<string, React.ComponentType<{ className?: string; size?: number }>>)[item.icon];
            return (
              <motion.div
                key={i}
                variants={listItem}
                className={cn(
                  "rounded-xl border border-border/40 bg-card p-6 md:p-7 hover:border-border/60 hover:shadow-md transition-all",
                  isLeft && "flex gap-4",
                )}
              >
                <div
                  className={cn(
                    "flex items-center justify-center rounded-xl shrink-0",
                    "bg-accent/10 text-accent",
                    isLeft ? "w-11 h-11" : "w-12 h-12 mb-4",
                  )}
                >
                  {IconComp ? <IconComp className="w-5 h-5" /> : null}
                </div>
                <div className="flex-1">
                  <h3
                    className="text-base md:text-lg font-semibold text-foreground"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm md:text-[15px] text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default FeatureGrid;
export { FeatureGridSchema } from "./schema";
export type { FeatureGridBlock } from "./schema";
