import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { stagger, listItem } from "../../lib/motion";
import { cn } from "../../lib/cn";
import type { EcosystemBlock } from "./schema";

export function Ecosystem({ block }: { block: EcosystemBlock }) {
  const isDark = block.variant === "dark";
  const cols =
    block.phases.length >= 5
      ? "md:grid-cols-2 lg:grid-cols-5"
      : block.phases.length === 4
        ? "md:grid-cols-2 lg:grid-cols-4"
        : "md:grid-cols-3";

  return (
    <section
      id={block.anchorId}
      className={cn("w-full py-14 md:py-24 px-5 md:px-8", isDark && "bg-[#09090B]")}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          {block.badgeText && (
            <span className="inline-block mb-4 px-3 py-1 rounded-full text-xs font-semibold bg-accent/15 text-accent border border-accent/25">
              {block.badgeText}
            </span>
          )}
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
        </div>
        <motion.div
          variants={stagger(70)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className={cn("grid grid-cols-1 gap-5", cols)}
        >
          {block.phases.map((p, i) => {
            const Icon = p.icon
              ? (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[p.icon]
              : null;
            return (
              <motion.div
                key={i}
                variants={listItem}
                className={cn(
                  "rounded-2xl p-6 border",
                  isDark ? "bg-white/[0.03] border-white/10" : "bg-card border-border/40",
                )}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {Icon && <Icon className="w-4 h-4 text-accent" />}
                </div>
                <div
                  className={cn(
                    "text-xs font-semibold uppercase tracking-wide mb-2",
                    isDark ? "text-white/50" : "text-muted-foreground",
                  )}
                >
                  {p.label}
                </div>
                <h3
                  className={cn(
                    "text-base font-semibold mb-2",
                    isDark ? "text-white" : "text-foreground",
                  )}
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {p.title}
                </h3>
                <p
                  className={cn(
                    "text-sm mb-3",
                    isDark ? "text-white/60" : "text-muted-foreground",
                  )}
                >
                  {p.description}
                </p>
                {p.features && p.features.length > 0 && (
                  <ul className="space-y-1.5">
                    {p.features.map((f, j) => (
                      <li
                        key={j}
                        className={cn(
                          "text-xs flex gap-1.5",
                          isDark ? "text-white/55" : "text-muted-foreground",
                        )}
                      >
                        <Icons.Check className="w-3 h-3 text-accent shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default Ecosystem;
export { EcosystemSchema } from "./schema";
export type { EcosystemBlock } from "./schema";
