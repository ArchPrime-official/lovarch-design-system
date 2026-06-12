/**
 * Faq — accordion FAQ section with stagger reveal.
 *
 * Content-agnostic: items provided via props (consumer i18n).
 *
 * Usage:
 *   <Faq
 *     title="Domande frequenti"
 *     items={[
 *       { question: "Quanto tempo per i risultati?", answer: "Tipicamente entro 30 giorni." },
 *       ...
 *     ]}
 *   />
 */
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/cn";

export interface FaqItem {
  question: string;
  answer: React.ReactNode;
}

export interface FaqProps {
  title: string;
  items: FaqItem[];
  variant?: "light" | "dark";
  className?: string;
  /** HTML id for anchor scroll. Default "faq". */
  id?: string;
}

export function Faq({
  title,
  items,
  variant = "light",
  className,
  id = "faq",
}: FaqProps) {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const isDark = variant === "dark";

  return (
    <section
      id={id}
      className={cn(
        "py-16 md:py-24",
        isDark ? "bg-[#09090B]" : "bg-neutral-50",
        className
      )}
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2
            className={cn(
              "text-2xl md:text-4xl font-bold mb-3",
              isDark ? "text-white" : "text-black"
            )}
          >
            {title}
          </h2>
        </motion.div>

        <div className="max-w-2xl mx-auto space-y-3">
          {items.map((item, idx) => {
            const isExpanded = expandedIdx === idx;
            return (
              <motion.div
                key={idx}
                className={cn(
                  "rounded-xl overflow-hidden border",
                  isDark
                    ? "bg-neutral-900 border-white/10"
                    : "bg-white border-black/10"
                )}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <button
                  type="button"
                  className={cn(
                    "w-full flex items-center justify-between p-5 text-left transition-colors",
                    isDark ? "hover:bg-neutral-800/50" : "hover:bg-neutral-50"
                  )}
                  onClick={() => setExpandedIdx(isExpanded ? null : idx)}
                  aria-expanded={isExpanded}
                >
                  <span
                    className={cn(
                      "font-medium pr-4",
                      isDark ? "text-white" : "text-black"
                    )}
                  >
                    {item.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 flex-shrink-0 transition-transform",
                      isDark ? "text-white/60" : "text-black/60",
                      isExpanded && "rotate-180"
                    )}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div
                        className={cn(
                          "px-5 pb-5",
                          isDark ? "text-white/70" : "text-black/70"
                        )}
                      >
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
