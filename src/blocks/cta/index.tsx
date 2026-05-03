import { motion } from "framer-motion";
import { fadeInUp, scaleOnTap } from "../../lib/motion";
import { cn } from "../../lib/cn";
import type { CtaBlock } from "./schema";

export function Cta({ block }: { block: CtaBlock }) {
  const isCenter = block.align === "center";
  const isBanner = block.variant === "banner";

  return (
    <section className={cn("w-full py-12 md:py-20 px-5 md:px-8", isBanner && "bg-gradient-to-br from-accent to-accent-light")}>
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className={cn(
          "max-w-4xl mx-auto",
          !isBanner && "rounded-2xl border border-border/40 bg-card p-8 md:p-12 shadow-md",
          isCenter ? "text-center" : "text-left",
        )}
      >
        <h2
          className={cn(
            "text-2xl md:text-4xl font-bold leading-tight",
            isBanner ? "text-white" : "text-foreground",
          )}
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          {block.title}
        </h2>
        {block.body && (
          <p
            className={cn(
              "mt-4 text-sm md:text-base max-w-2xl",
              isCenter && "mx-auto",
              isBanner ? "text-white/85" : "text-muted-foreground",
            )}
          >
            {block.body}
          </p>
        )}
        <div className={cn("mt-7", isCenter && "flex justify-center")}>
          <motion.a
            href={block.button.href}
            {...scaleOnTap}
            className={cn(
              "inline-flex items-center justify-center px-7 py-3 rounded-xl font-semibold text-sm md:text-base shadow-lg transition-shadow hover:shadow-xl min-h-[44px]",
              isBanner ? "bg-white text-accent" : "bg-accent text-accent-foreground",
            )}
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {block.button.label}
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}

export default Cta;
export { CtaSchema } from "./schema";
export type { CtaBlock } from "./schema";
