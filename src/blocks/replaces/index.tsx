import { motion } from "framer-motion";
import { stagger, listItem } from "../../lib/motion";
import { cn } from "../../lib/cn";
import type { ReplacesBlock } from "./schema";

export function Replaces({ block }: { block: ReplacesBlock }) {
  const isDark = block.variant === "dark";

  return (
    <section className={cn("w-full py-14 md:py-24 px-5 md:px-8", isDark && "bg-[#0c0c10]")}>
      <div className="max-w-5xl mx-auto text-center">
        <h2
          className={cn(
            "text-3xl md:text-4xl font-bold",
            isDark ? "text-white" : "text-foreground",
          )}
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          {block.title}
        </h2>
        {block.subtitle && (
          <p
            className={cn(
              "mt-4 text-base max-w-2xl mx-auto",
              isDark ? "text-white/70" : "text-muted-foreground",
            )}
          >
            {block.subtitle}
          </p>
        )}
        <motion.div
          variants={stagger(25)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-10 flex flex-wrap justify-center gap-2.5"
        >
          {block.tools.map((t, i) => (
            <motion.span
              key={i}
              variants={listItem}
              className={cn(
                "px-3.5 py-1.5 rounded-lg text-sm line-through decoration-accent/50",
                isDark
                  ? "bg-white/[0.04] text-white/45 border border-white/10"
                  : "bg-muted/40 text-muted-foreground border border-border/40",
              )}
            >
              {t}
            </motion.span>
          ))}
        </motion.div>
        {block.footerText && (
          <p
            className={cn(
              "mt-10 text-base md:text-lg font-semibold",
              isDark ? "text-white" : "text-foreground",
            )}
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {block.footerText}
          </p>
        )}
      </div>
    </section>
  );
}

export default Replaces;
export { ReplacesSchema } from "./schema";
export type { ReplacesBlock } from "./schema";
