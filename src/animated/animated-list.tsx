/**
 * AnimatedList — Items animate in from bottom with stagger (inspired by Magic UI)
 * DS V8: uses Framer Motion AnimatePresence
 *
 * Usage:
 *   <AnimatedList delay={1500}>
 *     {items.map(item => <div key={item.id}>{item.name}</div>)}
 *   </AnimatedList>
 */
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../lib/cn";

interface AnimatedListProps {
  children: React.ReactNode[];
  delay?: number; // ms between each item reveal
  className?: string;
  initialCount?: number; // how many to show initially
}

export function AnimatedList({ children, delay = 1000, className, initialCount = 0 }: AnimatedListProps) {
  const [index, setIndex] = useState(initialCount);
  const childrenArray = useMemo(() => children.flat().filter(Boolean), [children]);

  useEffect(() => {
    if (index >= childrenArray.length) return;
    const timer = setInterval(() => {
      setIndex((prev) => Math.min(prev + 1, childrenArray.length));
    }, delay);
    return () => clearInterval(timer);
  }, [index, childrenArray.length, delay]);

  const visibleItems = childrenArray.slice(0, index);

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <AnimatePresence mode="popLayout">
        {visibleItems.map((child, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            layout
          >
            {child}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/**
 * AnimatedListItem — Static version for already-loaded lists with stagger
 * Wraps children with fade-in-up animation on mount
 */
export function AnimatedListItem({ children, index = 0, className }: { children: React.ReactNode; index?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
