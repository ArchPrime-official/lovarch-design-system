import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { stagger, listItem } from "../../lib/motion";
import { cn } from "../../lib/cn";
import type { TestimonialsBlock } from "./schema";

export function Testimonials({ block }: { block: TestimonialsBlock }) {
  return (
    <section className="w-full py-14 md:py-24 px-5 md:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        {block.heading && (
          <h2
            className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12 md:mb-16"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {block.heading}
          </h2>
        )}
        <motion.div
          variants={stagger(80)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className={cn(
            "grid gap-6 md:gap-8",
            block.variant === "masonry"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
          )}
        >
          {block.items.map((item, i) => (
            <motion.figure
              key={i}
              variants={listItem}
              className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-md p-6 md:p-7 shadow-sm hover:shadow-md transition-shadow"
            >
              {item.rating && (
                <div className="flex gap-0.5 mb-3" aria-label={`${item.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className={cn(
                        "w-4 h-4",
                        idx < item.rating! ? "fill-accent text-accent" : "text-muted-foreground/30",
                      )}
                    />
                  ))}
                </div>
              )}
              <blockquote
                className="text-foreground/90 text-[15px] md:text-base leading-relaxed italic"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                "{item.quote}"
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                {item.avatar && (
                  <img
                    src={item.avatar}
                    alt={item.author}
                    className="w-10 h-10 rounded-full object-cover shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-foreground truncate">{item.author}</div>
                  {item.role && (
                    <div className="text-xs text-muted-foreground truncate">{item.role}</div>
                  )}
                </div>
                {item.company_logo && (
                  <img src={item.company_logo} alt="" className="h-6 w-auto opacity-60" />
                )}
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Testimonials;
export { TestimonialsSchema } from "./schema";
export type { TestimonialsBlock } from "./schema";
