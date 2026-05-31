import { motion } from "framer-motion";
import { stagger, listItem } from "../../lib/motion";
import { cn } from "../../lib/cn";
import type { StatsBlock } from "./schema";

export function Stats({ block }: { block: StatsBlock }) {
  const isDark = block.variant === "dark";
  const n = block.items.length;
  const cols =
    n >= 4 ? "sm:grid-cols-2 lg:grid-cols-4" : n === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";

  return (
    <section className={cn("w-full py-14 md:py-20 px-5 md:px-8", isDark && "bg-[#0c0c10]")}>
      <div className="max-w-6xl mx-auto">
        {(block.heading || block.subheading) && (
          <div className="text-center mb-10 md:mb-14">
            {block.heading && (
              <h2
                className={cn(
                  "text-3xl md:text-4xl font-bold",
                  isDark ? "text-white" : "text-foreground",
                )}
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {block.heading}
              </h2>
            )}
            {block.subheading && (
              <p
                className={cn(
                  "mt-4 text-base max-w-2xl mx-auto",
                  isDark ? "text-white/70" : "text-muted-foreground",
                )}
              >
                {block.subheading}
              </p>
            )}
          </div>
        )}
        <motion.div
          variants={stagger(80)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className={cn("grid grid-cols-2 gap-6 md:gap-8", cols)}
        >
          {block.items.map((it, i) => (
            <motion.div key={i} variants={listItem} className="text-center">
              <div
                className={cn(
                  "text-4xl md:text-5xl font-bold tracking-tight",
                  isDark ? "text-white" : "text-foreground",
                )}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {it.value}
              </div>
              <div
                className={cn(
                  "mt-2 text-sm md:text-base",
                  isDark ? "text-white/60" : "text-muted-foreground",
                )}
              >
                {it.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Stats;
export { StatsSchema } from "./schema";
export type { StatsBlock } from "./schema";
